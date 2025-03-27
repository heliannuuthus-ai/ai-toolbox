import { invoke } from "@tauri-apps/api/core";

export enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

export const guessMimeType = async (path: string): Promise<string> => {
  return await invoke<string>("guess_mime_type", { path });
};

export const setTheme = async (theme: THEME): Promise<void> => {
  return await invoke<void>("set_theme", { theme });
};
