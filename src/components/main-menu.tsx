"use client";

import type { FC } from "react";

import { MainMenu } from "@excalidraw/excalidraw";
import { useTheme } from "@payloadcms/ui";
// @ts-expect-error - TODO: need to fix types
import Link from "next/link";

interface Props {
  sceneSlug: string;
}
export const CustomMainMenu: FC<Props> = ({ sceneSlug }) => {
  const { setTheme, theme } = useTheme();
  return (
    <MainMenu>
      <MainMenu.ItemCustom>
        <Link href={`/admin/collections/${sceneSlug}`}>Close</Link>
      </MainMenu.ItemCustom>
      <MainMenu.DefaultItems.LoadScene />
      <MainMenu.DefaultItems.SaveToActiveFile />
      <MainMenu.DefaultItems.Export />
      <MainMenu.DefaultItems.SaveAsImage />
      <MainMenu.DefaultItems.CommandPalette className="highlighted" />
      <MainMenu.DefaultItems.SearchMenu />
      <MainMenu.DefaultItems.Help />
      <MainMenu.DefaultItems.ClearCanvas />

      <MainMenu.Separator />
      <MainMenu.DefaultItems.ToggleTheme
        allowSystemTheme
        onSelect={setTheme}
        theme={theme}
      />
      <MainMenu.DefaultItems.ChangeCanvasBackground />
    </MainMenu>
  );
};
