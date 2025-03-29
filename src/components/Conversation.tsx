import { Divider, Flex, GetProp, Spin, Typography, Button } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";
import { fetchConversations, fetchMessages } from "@/apis/glossary";
import {
  Bubble,
  BubbleProps,
  Conversations,
  ConversationsProps,
} from "@ant-design/x";
import { getDateGroup, getHoursPassed, sortDateGroups } from "@/utils/date";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  DeleteOutlined,
  EditOutlined,
  RedoOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { BubbleListProps } from "@ant-design/x/es/bubble/BubbleList";
import { ChatRole } from "@/apis/types";
import Markdown from "@/components/markdown/Markdown";

const { Text } = Typography;

const renderMarkdown: BubbleProps["messageRender"] = (content) => (
  <Markdown content={content} />
);
const useStyles = createStyles(({ css, token }) => ({
  container: css`
    height: 100vh;
    background-color: var(--background-color);
  `,
  conversations: css`
    height: 100%;
    width: 300px;
    border-radius: ${token.borderRadius}px;
    background-color: var(--background-color);
    padding: 10px;
    .ant-conversations-list {
      padding: 0;
    }
  `,
  bubbleList: css`
    flex: 1;
    overflow: auto;
    padding: 0px 20px;
  `,
}));

const Conversation = () => {
  const { styles } = useStyles();
  const [conversations, setConversations] = useState<
    ConversationsProps["items"]
  >([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState<string | undefined>(undefined);
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<BubbleListProps["items"]>([]);
  const menuConfig: ConversationsProps["menu"] = (conversation) => ({
    trigger: () => {
      const passedHours =
        conversation.timestamp && getHoursPassed(conversation.timestamp);
      return activeKey === conversation.key ? (
        <Button type="text" icon={<EllipsisOutlined />} />
      ) : passedHours && passedHours < 24 ? (
        <Text>{passedHours}小时前</Text>
      ) : null;
    },
    items: [
      {
        label: "编辑",
        key: "edit",
        icon: <EditOutlined />,
      },
      {
        label: "删除",
        key: "delete",
        icon: <DeleteOutlined />,
        danger: true,
      },
    ],
    onClick: (menuInfo) => {
      menuInfo.domEvent.stopPropagation();
    },
  });

  const getConversations = async () => {
    if (loading) return;
    setLoading(true);
    await fetchConversations(lastId)
      .then((res) => {
        setHasMore(res.data.has_more);
        setLastId(res.data.data[res.data.data.length - 1].id);
        const conversations = res.data.data.map((conversation) => {
          const groupTimestamp = getDateGroup(conversation.created_at * 1000);
          return {
            key: conversation.id,
            label: (
              <Text strong ellipsis={true} style={{ fontSize: 14 }}>
                {conversation.name}
              </Text>
            ),
            timestamp: conversation.created_at,
            group: groupTimestamp,
          };
        });
        setConversations((prev) => {
          if (!prev) return conversations;
          return [...prev, ...conversations];
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onConversationClick = async (key: string) => {
    setActiveKey(key);

    await fetchMessages(key)
      .then((res) => {
        const messages = res.data.data.flatMap((message) => {
          return [
            {
              placement: "end",
              role: ChatRole.USER,
              key: `user-${message.id}`,
              content: message.query,
              shape: "corner",
              variant: "shadow",
              loading: false,
              typing: undefined,
              styles: {
                content: {
                  maxWidth: "75%",
                  borderRadius: "1.5rem",
                  borderBottomRightRadius: "0",
                  borderBottomLeftRadius: "1.5rem",
                },
              },
              messageRender: renderMarkdown,
            } as BubbleProps,
            {
              placement: "start",
              role: ChatRole.ASSISTANT,
              key: `assistant-${message.id}`,
              content: message.answer,
              shape: "corner",
              variant: "borderless",
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
              messageRender: renderMarkdown,
            } as BubbleProps,
          ];
        });
        setMessages(messages);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const groupable: GetProp<typeof Conversations, "groupable"> = {
    sort: sortDateGroups,
    title: (group, { components: { GroupTitle } }) => {
      if (!group) return <GroupTitle />;

      return (
        <>
          <span>{group}</span>
          <Divider style={{ margin: "10px 0" }} />
        </>
      );
    },
  };

  useEffect(() => {
    getConversations();
    return () => {};
  }, []);

  return (
    <Flex className={styles.container}>
      <div id="conversation-list" style={{ height: "100%", overflow: "auto" }}>
        <InfiniteScroll
          dataLength={conversations?.length || 0}
          next={getConversations}
          hasMore={hasMore}
          loader={
            <div style={{ textAlign: "center" }}>
              <Spin indicator={<RedoOutlined spin />} size="small" />
            </div>
          }
          endMessage={<Divider>已经到底啦~</Divider>}
          scrollableTarget="conversation-list"
          style={{ overflow: "hidden" }}
        >
          <Conversations
            activeKey={activeKey}
            onActiveChange={onConversationClick}
            styles={{
              item: {},
            }}
            className={styles.conversations}
            groupable={groupable}
            items={conversations}
            menu={menuConfig}
          />
        </InfiniteScroll>
      </div>
      <div className={styles.bubbleList}>
        <Bubble.List items={messages} />
      </div>
    </Flex>
  );
};

export default Conversation;
