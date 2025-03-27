import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { excalidrawPlugin } from "../src/index.js";
import { devUser } from "./helpers/credentials.js";
import { testEmailAdapter } from "./helpers/testEmailAdapter.js";
import { migrations } from "./migrations/index.js";
import { seed } from "./seed.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname;
}

export default buildConfig({
  admin: {
    autoLogin: { ...devUser, prefillOnly: true },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [],
    },
  ],
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || "file:./.store/db.sql" },
    migrationDir: path.resolve(dirname, "migrations"),
    prodMigrations: migrations,
  }),
  editor: lexicalEditor(),
  email: testEmailAdapter,
  onInit: async (payload) => {
    await seed(payload);
  },
  plugins: [
    excalidrawPlugin({
      collaboration: {
        clientWebSocketAddress: "ws://localhost:3001",
        serverWebSocketPort: 3001,
      },
      sceneSlug: "foobar",
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "test-secret_key",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
