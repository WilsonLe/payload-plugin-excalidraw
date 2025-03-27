import type { ListViewServerPropsOnly } from "payload";
import type { FC } from "react";

import { CreateSceneCard } from "./create-scene-card.js";
import { SceneCards } from "./scene-cards.js";

export const SceneList: FC<ListViewServerPropsOnly> = ({
  collectionConfig,
  data,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "16px",
      }}
    >
      <CreateSceneCard sceneSlug={collectionConfig.slug} />
      <SceneCards data={data} sceneSlug={collectionConfig.slug} />
    </div>
  );
};
