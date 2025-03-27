import { createStyles } from "antd-style";
import { ChatMessage, FeedbackType, ChatRole } from "@/apis/types";
import { Flex } from "antd";
import { Bubble as AntdBubble, BubbleProps } from "@ant-design/x";
import Buttons from "./Buttons";
import Markdown from "@/components/markdown/Markdown";
import { useEffect, useRef, useState } from "react";

const renderMarkdown: BubbleProps["messageRender"] = (content) => (
  <Markdown content={content} />
);

// 定义样式
const useStyle = createStyles(({ css, token, cx }) => {
  const buttons = cx(css`
    opacity: 0;
  `);

  return {
    container: css`
      overflow-y: auto;
      width: 100%;
    `,
    bubbleContainer: css`
      padding: 20px;
      width: 100%;
      max-width: 50rem;
      background: ${token.colorBgContainer};
      p {
        margin: 0;
      }
    `,
    buttons,
    bubble: css`
      &:hover {
        .${buttons} {
          opacity: 1;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    `,
  };
});

const Bubble = ({
  messages,
  onFeedback,
}: {
  messages: ChatMessage[];
  onFeedback: (messageId: string, feedbackType: FeedbackType) => void;
}) => {
  const { styles } = useStyle();

  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    if (!bubbleContainerRef.current) return;

    const container = containerRef.current;

    // 监听滚动事件
    const handleScroll = () => {
      if (!container) return;

      // 判断是否滚动到底部附近（允许有一点误差）
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        10;
      setShouldAutoScroll(isNearBottom);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (container && shouldAutoScroll) {
        container.scrollTop = container.scrollHeight;
      }
    });

    container?.addEventListener("scroll", handleScroll);
    resizeObserver.observe(bubbleContainerRef.current);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [shouldAutoScroll]);

  // 监听消息变化
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 检查是否是新消息（消息数量增加）
    if (messages.length > prevMessagesLength.current) {
      // 用户发送了新消息，重置自动滚动
      setShouldAutoScroll(true);
      container.scrollTop = container.scrollHeight;
    } else if (shouldAutoScroll) {
      // 如果是 AI 回复更新且 shouldAutoScroll 为 true，则滚动到底部
      container.scrollTop = container.scrollHeight;
    }

    prevMessagesLength.current = messages.length;
  }, [messages, shouldAutoScroll]);

  return (
    <>
      <Flex ref={containerRef} className={styles.container} justify="center">
        <Flex
          ref={bubbleContainerRef}
          vertical
          className={styles.bubbleContainer}
        >
          <AntdBubble.List
            autoScroll={false}
            style={{ height: "auto", overflow: "visible" }}
            items={messages.flatMap((message) => {
              return [
                {
                  className: styles.bubble,
                  placement: "end",
                  role: ChatRole.USER,
                  key: `user-${message.id}`,
                  content: message.query,
                  shape: "corner",
                  variant: "outlined",
                  loading: false,
                  typing: undefined,
                  styles: {
                    content: {
                      maxWidth: "75%",
                      borderRadius: "1.5rem",
                      borderBottomRightRadius: "1.5rem",
                      borderBottomLeftRadius: "0",
                    },
                  },
                  footer: (
                    <Buttons
                      className={styles.buttons}
                      isAi={false}
                      message={message}
                      onFeedback={onFeedback}
                    />
                  ),
                  messageRender: renderMarkdown,
                },
                {
                  className: styles.bubble,
                  placement: "start",
                  role: ChatRole.ASSISTANT,
                  key: `assistant-${message.id}`,
                  content: message.answer,
                  shape: "corner",
                  variant: "outlined",
                  loading: message.loading,
                  typing: {
                    step: 60,
                    interval: 100,
                  },
                  styles: {
                    content: {
                      maxWidth: "75%",
                      borderRadius: "1.5rem",
                      borderBottomRightRadius: "1.5rem",
                      borderBottomLeftRadius: "0",
                    },
                  },
                  footer: (
                    <Buttons
                      className={styles.buttons}
                      isAi={true}
                      message={message}
                      onFeedback={onFeedback}
                    />
                  ),
                  messageRender: renderMarkdown,
                },
              ];
            })}
          />
          <div style={{ paddingBottom: "168px" }}></div>
        </Flex>
      </Flex>
    </>
  );
};

export default Bubble;
