import * as migration_20250320_042522 from "./20250320_042522.js";

export const migrations = [
  {
    name: "20250320_042522",
    down: migration_20250320_042522.down,
    up: migration_20250320_042522.up,
  },
];
