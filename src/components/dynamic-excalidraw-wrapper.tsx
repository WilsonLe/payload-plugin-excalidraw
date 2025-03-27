"use client";

import type { ImportedDataState } from "@excalidraw/excalidraw/data/types";
// @ts-expect-error - TODO: need to fix types
import dynamic from "next/dynamic";

interface Props {
  dataState?: ImportedDataState;
  id: number | string;
  sceneSlug: string;
  webSocketAddress?: string;
}

export const DynamicExcalidrawWrapper = dynamic<Props>(
  () => import("./excalidraw-wrapper.js").then((mod) => mod.ExcalidrawWrapper),
  { ssr: false },
);
