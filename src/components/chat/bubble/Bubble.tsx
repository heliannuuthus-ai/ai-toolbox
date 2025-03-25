import { createStyles } from "antd-style";
import { ChatMessage, FeedbackType, ChatRole } from "@/apis/types";
import { Flex, Typography } from "antd";
import { Bubble as AntdBubble, BubbleProps } from "@ant-design/x";
import { Buttons } from "@/components/chat/bubble/buttons";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const remarkRender = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);

const renderMarkdown: BubbleProps["messageRender"] = (content) => (
  <Typography>
    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
    <div
      dangerouslySetInnerHTML={{
        __html: String(remarkRender.processSync(content)),
      }}
    />
  </Typography>
);

// 定义样式
const useStyle = createStyles(({ css, token, cx }) => {
  const buttons = cx(css`
    opacity: 0;
  `);

  return {
    container: css`
      padding: 20px;
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

  return (
    <Flex vertical className={styles.container}>
      <AntdBubble.List
        items={messages.map((message) => {
          const isAi = message.role === ChatRole.ASSISTANT;
          return {
            className: styles.bubble,
            placement: isAi ? "start" : "end",
            role: message.role,
            key: message.messageId,
            content: message.content,
            shape: "corner",
            variant: isAi ? "outlined" : "shadow",
            loading: message.loading,
            typing: isAi
              ? {
                  step: 60,
                  interval: 100,
                  suffix: <>💗</>,
                }
              : undefined,
            styles: {
              content: {
                maxWidth: "75%",
                borderRadius: "1.5rem",
                borderBottomRightRadius: isAi ? "1.5rem" : "0",
                borderBottomLeftRadius: isAi ? "0" : "1.5rem",
              },
            },
            footer: (
              <Buttons
                className={styles.buttons}
                message={message}
                onFeedback={onFeedback}
              />
            ),
            messageRender: renderMarkdown,
          };
        })}
      />
    </Flex>
  );
};

export default Bubble;
