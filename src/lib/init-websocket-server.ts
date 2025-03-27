import type { AuthStrategyResult, Payload } from "payload";
import type { PluginOptions } from "src/index.js";

import { jwtVerify } from "jose";
import { WebSocketServer } from "ws";

const verifyToken = async (
  token: string,
  strategyName: string,
  payload: Payload,
): Promise<{ user: AuthStrategyResult["user"] }> => {
  const secretKey = new TextEncoder().encode(payload.secret);
  const { payload: decodedPayload } = await jwtVerify<{
    collection: string;
    id: string;
  }>(token, secretKey);
  const collection = payload.collections[decodedPayload.collection];
  const user = (await payload.findByID({
    id: decodedPayload.id,
    collection: decodedPayload.collection,
    depth: collection.config.auth.depth,
  })) as AuthStrategyResult["user"];
  if (user && (!collection.config.auth.verify || user._verified)) {
    user.collection = collection.config.slug;
    user._strategy = strategyName;
    return {
      user,
    };
  } else {
    return { user: null };
  }
};

const authenticate = async (
  message: string,
  authTimeout: NodeJS.Timeout,
  payload: Payload,
): Promise<AuthStrategyResult["user"] | null> => {
  let user: AuthStrategyResult["user"] | null = null;
  try {
    const { strategyName, token } = JSON.parse(message);
    const { user: verifiedUser } = await verifyToken(
      token,
      strategyName,
      payload,
    );
    if (verifiedUser) {
      user = verifiedUser;
    } else {
      payload.logger.error(`Authentication failed for token: ${message}`);
      user = null;
    }
  } catch (e) {
    payload.logger.error(e);
  } finally {
    clearTimeout(authTimeout);
  }
  return user;
};

export const initWebsocketServer = (
  pluginOptions: PluginOptions,
  payload: Payload,
) => {
  if (!pluginOptions.collaboration) {
    return;
  }
  const wss = new WebSocketServer({
    port: pluginOptions.collaboration.serverWebSocketPort,
  });
  wss.on("connection", (socket) => {
    let user: AuthStrategyResult["user"] | null = null;

    const authTimeout = setTimeout(() => {
      if (!user) {
        payload.logger.info(
          "No authentication message received. Closing connection.",
        );
        socket.close();
      }
    }, 5000);
    const messageHandler = async (message: string) => {
      if (!user) {
        user = await authenticate(message, authTimeout, payload);
        if (!user) {
          socket.close();
        }
        return;
      }
      const msg = JSON.parse(message);
      if (msg.messageType === "pointer-update") {
        wss.clients.forEach((client) => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                messageType: "pointer-update",
                payload: msg.payload,
              }),
            );
          }
        });
      }
    };

    socket.on("message", messageHandler);
    socket.on("close", () => {
      payload.logger.info("WebSocket client disconnected.");
    });
    socket.on("open", () => {
      payload.logger.info("WebSocket client openned.");
    });
  });

  return wss;
};
