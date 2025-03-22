"use client";

import type { ListComponentServerProps } from "@payloadcms/ui";
import type { FC } from "react";

import { useTheme } from "@payloadcms/ui";
import { createPortal } from "react-dom";

import { ExcalidrawWrapper } from "./excalidraw-wrapper.js";

export const SceneEdit: FC<ListComponentServerProps> = () => {
  const { theme } = useTheme();

  return createPortal(
    <div
      style={{
        bottom: 0,
        left: 0,
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 9999,
      }}
    >
      <ExcalidrawWrapper theme={theme} />
    </div>,
    document.body,
  );
};
