import type { CollectionConfig } from "payload";

import type { PluginOptions } from "./index.js";

export const createScenes = (
  pluginOptions: PluginOptions,
): CollectionConfig => {
  return {
    slug: "excalidraw-scenes",
    admin: {
      components: {
        views: {
          edit: {
            root: {
              actions: [],
              Component: {
                path: "payload-plugin-excalidraw/rsc#SceneEdit",
              },
            },
          },
          list: {
            Component: { path: "payload-plugin-excalidraw/rsc#SceneList" },
          },
        },
      },
    },
    fields: [
      { name: "name", type: "text" },
      { name: "sceneData", type: "json" },
    ],
    timestamps: true,
    versions: { drafts: true, maxPerDoc: 0 },
  };
};
