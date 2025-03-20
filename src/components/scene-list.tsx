import type { ListComponentServerProps } from "@payloadcms/ui";
import type { FC } from "react";

import { CreateSceneCard } from "./create-scene-card.js";

export const SceneList: FC<ListComponentServerProps> = () => {
  return (
    <div>
      <CreateSceneCard />
    </div>
  );
};
