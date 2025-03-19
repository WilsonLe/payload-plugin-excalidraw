import type { CollectionConfig } from "payload";

import type { PluginOptions } from "./index.js";

export const createScenes = (
  pluginOptions: PluginOptions,
): CollectionConfig => {
  return {
    slug: pluginOptions.sceneSlug || "excalidraw-scenes",
    fields: [
      { name: "name", type: "text", defaultValue: "Untitled" },
      { name: "sceneData", type: "json" },
    ],
    timestamps: true,
    versions: { drafts: true, maxPerDoc: 0 },
  };
};
