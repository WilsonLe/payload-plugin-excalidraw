import type { Config } from "payload";

import { createScenes } from "./scene.js";

export type PluginOptions = {
  disabled?: boolean;
  sceneSlug?: string;
  sceneUploadSlug?: string;
};

export const excalidrawPlugin =
  (pluginOptions: PluginOptions) =>
  (config: Config): Config => {
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
    };

    return config;
  };
