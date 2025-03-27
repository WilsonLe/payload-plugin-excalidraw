"use client";

import type { Data } from "payload";

import { useTheme } from "@payloadcms/ui";
// @ts-expect-error - TODO: need to fix types
import Link from "next/link";
import { type FC, useState } from "react";

interface Props {
  data: Data;
  sceneSlug: string;
}
export const SceneCards: FC<Props> = ({ data, sceneSlug }) => {
  const { theme } = useTheme();
  const [hoveredId, setHoveredId] = useState<null | string>(null);

  return (
    <>
      {Array.isArray(data.docs) &&
        data.docs.map((scene) => (
          <Link
            href={`/admin/collections/${sceneSlug}/${scene.id}`}
            key={scene.id}
            onMouseEnter={() => setHoveredId(scene.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              backgroundColor:
                hoveredId === scene.id
                  ? theme === "dark"
                    ? "#2e2e2e"
                    : "#f5f5f5"
                  : "inherit",
              border: "1px solid #ddd",
              boxShadow:
                hoveredId === scene.id
                  ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                  : "0 2px 4px rgba(0, 0, 0, 0.1)",
              color: "inherit",
              display: "block",
              padding: "16px",
              textDecoration: "none",
              transition: "box-shadow 0.2s, background-color 0.2s",
              width: "16rem",
            }}
          >
            <p>{scene.name ?? "Untitled scene"}</p>
          </Link>
        ))}
    </>
  );
};
