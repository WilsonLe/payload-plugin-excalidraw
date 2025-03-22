"use client";
import type { ExcalidrawProps } from "@excalidraw/excalidraw/types";

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export const ExcalidrawWrapper: React.FC<ExcalidrawProps> = (props) => {
  return <Excalidraw {...props} />;
};
