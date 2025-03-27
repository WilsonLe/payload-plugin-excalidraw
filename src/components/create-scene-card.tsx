"use client";

import type { FC } from "react";

import { toast } from "@payloadcms/ui";
import { usePathname, useRouter } from "next/navigation.js";
import { useTransition } from "react";

interface Props {
  sceneSlug: string;
}
export const CreateSceneCard: FC<Props> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const createScene = async (): Promise<null | string> => {
    const response = await fetch(`/api/${props.sceneSlug}`, {
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const responseBody = await response.json();
    if (
      typeof responseBody?.doc?.id === "string" ||
      typeof responseBody?.doc?.id === "number"
    ) {
      return typeof responseBody.doc.id === "string"
        ? responseBody.doc.id
        : responseBody.doc.id.toString();
    }
    return null;
  };

  const handleClick = () => {
    startTransition(async () => {
      const id = await createScene();
      if (id === null) {
        toast.error("Failed to create scene");
        return;
      }
      router.push(`${pathname}/${id}`);
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      style={{
        border: "1px solid #ddd", // toned down border
        borderRadius: "4px", // less pronounced rounded corners
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        padding: "16px",
        textDecoration: "none",
        transition: "transform 0.2s, box-shadow 0.2s",
        width: "16rem",
      }}
      type="button"
    >
      {isPending ? "Processing..." : "New scene"}
    </button>
  );
};
