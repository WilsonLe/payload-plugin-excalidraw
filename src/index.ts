import type { CollectionConfig, Config } from "payload";

import { WebSocketServer } from "ws";

import { initWebsocketServer } from "./lib/init-websocket-server.js";
import { createScenes } from "./scene.js";

type IncomingPluginOptions = {
  /**
   * Configure multi-user support for scene collaborations
   * @default false
   */
  collaboration?:
    | {
        /**
         * The address for the WebSocket server the client
         * will attempt to connect to.
         *
         * This should be the address of the server on the client side.
         * e.g. `ws://your.domain.com:3001`, `ws://localhost:3001`
         * @default "ws://localhost:3001"
         */
        clientWebSocketAddress?: string;

        /**
         * The port for the WebSocket server
         * @default 3001
         */
        serverWebSocketPort?: number;
      }
    | false;

  disabled?: boolean;

  /**
   * Labels for the scenes collection
   * @default { plural: "Excalidraw Scenes", singular: "Excalidraw Scene" }
   */
  sceneLabels?: CollectionConfig["labels"];

  /**
   * The slug for the scenes collection
   * @default "excalidraw-scenes"
   */
  sceneSlug?: string;
};

export type PluginOptions = {
  collaboration:
    | { clientWebSocketAddress: string; serverWebSocketPort: number }
    | false;
  disabled: boolean;
  sceneLabels: CollectionConfig["labels"];
  sceneSlug: string;
};

const parsePluginOptions = (incomingPluginOptions: IncomingPluginOptions) => {
  const pluginOptions: PluginOptions = {
    collaboration: incomingPluginOptions.collaboration
      ? {
          clientWebSocketAddress:
            incomingPluginOptions.collaboration.clientWebSocketAddress ||
            "ws://localhost:3001",
          serverWebSocketPort:
            incomingPluginOptions.collaboration.serverWebSocketPort || 3001,
          ...incomingPluginOptions.collaboration,
        }
      : false,
    disabled: incomingPluginOptions.disabled || false,
    sceneLabels: incomingPluginOptions.sceneLabels || {
      plural: "Excalidraw Scenes",
      singular: "Excalidraw Scene",
    },
    sceneSlug: incomingPluginOptions.sceneSlug || "excalidraw-scenes",
  };
  return pluginOptions;
};

export const excalidrawPlugin =
  (incomingPluginOptions: IncomingPluginOptions) =>
  (config: Config): Config => {
    const pluginOptions = parsePluginOptions(incomingPluginOptions);

    /**
     * If the plugin is disabled, we still want to keep added collections/fields so the database schema is consistent which is important for migrations.
     * If your plugin heavily modifies the database schema, you may want to remove this property.
     */
    if (pluginOptions.disabled) {
      return config;
    }

    config.collections = [
      ...(config.collections || []),
      createScenes(pluginOptions),
    ];

    config.admin = {
      ...config.admin,
    };

    config.endpoints = [...(config.endpoints || [])];

    const incomingOnInit = config.onInit;

    config.onInit = async (payload) => {
      // Ensure we are executing any existing onInit functions before running our own.
      if (incomingOnInit) {
        await incomingOnInit(payload);
      }
      if (pluginOptions.collaboration) {
        if (!(payload.wss instanceof WebSocketServer)) {
          payload.wss = initWebsocketServer(pluginOptions, payload);
          payload.logger.info(
            `WebSocket server running on port ${pluginOptions.collaboration.serverWebSocketPort}`,
          );
        }
      }
    };
    return config;
  };
