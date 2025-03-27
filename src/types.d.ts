import type {
  BasePayload as OriginalBasePayload,
  RequestContext as OriginalRequestContext,
} from "payload";
import type { WebSocketServer } from "ws";

declare module "payload" {
  export interface BasePayload extends OriginalBasePayload {
    wss?: WebSocketServer;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface RequestContext extends OriginalRequestContext {}
}
