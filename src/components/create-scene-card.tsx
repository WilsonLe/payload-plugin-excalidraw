"use client";

import type { FC } from "react";

import { toast } from "@payloadcms/ui";
import { usePathname, useRouter } from "next/navigation.js";
import { useTransition } from "react";

export const CreateSceneCard: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const createScene = async (): Promise<null | string> => {
    const response = await fetch("/api/excalidraw-scenes", {
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
    <button disabled={isPending} onClick={handleClick} type="button">
      {isPending ? "Processing..." : "Create & Go"}
    </button>
  );
};
