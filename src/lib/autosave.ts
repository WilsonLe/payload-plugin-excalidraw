import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";

import { serializeAsJSON } from "@excalidraw/excalidraw";

export const autosave = async (
  sceneSlug: string,
  id: number | string,
  elements?: readonly serializeAsJSON[],
  appState?: AppState,
  files?: BinaryFiles,
) => {
  const dataState = await serializeAsJSON(
    elements ?? {},
    appState ?? {},
    files ?? {},
    "local",
  );
  await fetch(`/api/${sceneSlug}/${id}?autosave=true`, {
    body: JSON.stringify({ dataState }),
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  });
};
