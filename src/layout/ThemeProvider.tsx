import { theme } from "antd";
import { ThemeProvider as AntdStyleThemeProvider } from "antd-style";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { useState } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useState<"dark" | "light">("light");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const getTheme = async () => {
      const theme = await getCurrentWindow().theme();
      setColorMode(theme === "dark" ? "dark" : "light");
      setDark(theme === "dark");
    };
    getTheme();
  }, []);

  return (
    <AntdStyleThemeProvider
      appearance={colorMode}
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorLink: dark ? "#7d8187" : "#7d8187",
          colorText: dark ? "rgb(128, 128, 128)" : "rgb(100, 102, 104)",
          colorTextLightSolid: dark
            ? "rgb(178, 178, 178)"
            : "rgb(100, 102, 104)",
          colorPrimary: dark ? "#7d8187" : "#7d8187",
          colorPrimaryHover: dark ? "#7d8187" : "#7d8187",
          colorPrimaryActive: dark ? "#7d8187" : "#7d8187",
          colorTextDescription: dark
            ? "rgb(128, 128, 128)"
            : "rgb(100, 102, 104)",
          colorBgLayout: dark ? "rgb(25, 25, 25)" : "rgb(240, 240, 240)",
          colorBgContainer: dark ? "rgb(30, 30, 30)" : "rgb(255, 255, 255)",
          colorBgElevated: dark ? "rgb(35, 35, 35)" : "rgb(248, 248, 248)",
          colorBgSpotlight: dark ? "rgb(35, 35, 35)" : "rgb(248, 248, 248)",
          fontSize: 14,
          fontSizeHeading1: 38,
          fontSizeHeading2: 30,
          fontSizeHeading3: 24,
          fontSizeHeading4: 20,
          fontSizeHeading5: 16,
          fontFamily:
            "Noto Sans Mono, Noto Sans SC, PingFang SC, Microsoft YaHei, monospace",
        },
        components: {
          Steps: {},
          Table: {},
          Layout: {
            headerBg: dark ? "rgb(30, 30, 30)" : "rgb(240, 240, 240)",
          },
          Statistic: {
            contentFontSize: 14,
          },
        },
      }}
    >
      {children}
    </AntdStyleThemeProvider>
  );
};

export default ThemeProvider;
