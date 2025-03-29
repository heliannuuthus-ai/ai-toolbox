import { Button, Tooltip } from "antd";
import History from "@/assets/images/button/history.svg?react";
import { useEffect, useState } from "react";
import Icon from "@ant-design/icons";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const Conversation = () => {
  const [conversationWebview, setConversationWebview] =
    useState<WebviewWindow | null>(null);

  const createConversationWebview = async () => {
    try {
      const webview = new WebviewWindow("conversation", {
        url: "/_conversation",
        title: "对话历史",
        decorations: false,
        titleBarStyle: "overlay",
        hiddenTitle: true,
        width: 800,
        height: 600,
        center: true,
        resizable: true,
        fullscreen: false,
        shadow: true,
        minWidth: 400,
        minHeight: 300,
      });

      webview.once("tauri://created", function () {
        setConversationWebview(webview);
        webview.listen("change-conversation", function (event) {
          console.log("change-conversation", event);
        });
      });

      webview.once("tauri://error", function (e) {});

      webview.once("tauri://destroyed", function () {
        setConversationWebview(null);
      });
    } catch (error) {
      console.error("Failed to create webview:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (conversationWebview) {
        (async () => {
          await conversationWebview.destroy();
          console.log("conversation window destroyed");
        })();
      }
    };
  }, []);

  return (
    <>
      <Tooltip title="历史会话记录">
        <Button
          type="text"
          onClick={async () => {
            if (conversationWebview) {
              await conversationWebview.setAlwaysOnTop(true);
              await conversationWebview.setAlwaysOnTop(false);
            } else {
              await createConversationWebview();
            }
          }}
          icon={<Icon component={History} />}
        />
      </Tooltip>
    </>
  );
};

export default Conversation;
