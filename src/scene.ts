import type { CollectionConfig } from "payload";

import type { PluginOptions } from "./index.js";

export const createScenes = (
  pluginOptions: PluginOptions,
): CollectionConfig => {
  return {
    slug: pluginOptions.sceneSlug,
    admin: {
      components: {
        views: {
          edit: {
            root: {
              Component: { path: "payload-plugin-excalidraw/rsc#SceneEdit" },
            },
          },
          list: {
            Component: { path: "payload-plugin-excalidraw/rsc#SceneList" },
          },
        },
      },
      useAsTitle: "name",
    },
    custom: {
      payloadPluginExcalidraw: {
        clientPluginOptions: {
          collaborations: {
            clientWebSocketAddress: pluginOptions.collaboration
              ? pluginOptions.collaboration.clientWebSocketAddress
              : null,
          },
        },
      },
    },
    fields: [
      { name: "name", type: "text" },
      { name: "dataState", type: "json" },
    ],
    labels: pluginOptions.sceneLabels,
    timestamps: true,
    versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: 0 },
  };
};
