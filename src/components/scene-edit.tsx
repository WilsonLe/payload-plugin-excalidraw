import type { DocumentViewServerPropsOnly } from "payload";

import { type FC } from "react";

import { DynamicExcalidrawWrapper } from "./dynamic-excalidraw-wrapper.js";

export const SceneEdit: FC<DocumentViewServerPropsOnly> = async ({
  doc,
  initPageResult,
  payload,
}) => {
  const sceneSlug = initPageResult.collectionConfig?.slug;
  const clientWebSocketAddress =
    initPageResult.collectionConfig?.custom?.payloadPluginExcalidraw
      ?.clientPluginOptions?.collaborations?.clientWebSocketAddress;

  if (!sceneSlug) {
    return <p>Scene slug not found.</p>;
  }
  const scene = await payload.findByID({
    id: doc.id,
    collection: sceneSlug,
    draft: true,
  });
  if (!scene) {
    return <p>No scenes found.</p>;
  }
  let dataState = null;
  try {
    dataState = JSON.parse(scene.dataState);
  } catch {
    return <p>Error parsing data.</p>;
  }
  return (
    <DynamicExcalidrawWrapper
      dataState={dataState}
      id={scene.id}
      sceneSlug={sceneSlug}
      webSocketAddress={clientWebSocketAddress}
    />
  );
};
