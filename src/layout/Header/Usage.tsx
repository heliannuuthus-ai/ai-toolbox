import { Usage as UsageType } from "@/types/common";
import {
  ClockCircleOutlined,
  DollarOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import { UnlistenFn } from "@tauri-apps/api/event";
import { LazyStore } from "@tauri-apps/plugin-store";
import {
  Button,
  Card,
  Flex,
  List,
  Menu,
  Statistic,
  StatisticProps,
  Tooltip,
  Typography,
} from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
const store = new LazyStore("glossary");

const { Text, Paragraph } = Typography;

const useStyles = createStyles(({ css }) => ({
  header: css`
    color: var(--text-primary);
    width: 100%;
    background-color: var(--background-color);
    text-align: center;
  `,
  statistic: css`
    font-weight: bold;
  `,
  menu: css`
    min-width: 271px;
    .ant-menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
}));

const formatter: StatisticProps["formatter"] = (value, config) => {
  return (
    <CountUp
      end={value as number}
      redraw={true}
      separator={config?.groupSeparator || ","}
      decimal={config?.decimalSeparator || "."}
      decimals={config?.precision}
    >
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  );
};

const Usage = () => {
  const { styles } = useStyles();
  const [usage, setUsage] = useState<UsageType>();

  useEffect(() => {
    let unsubscribe: UnlistenFn = () => {};
    (async () => {
      const value = await store.get<UsageType>("usage");
      value && setUsage(value);
      unsubscribe = await store.onKeyChange<UsageType>(
        "usage",
        (value: UsageType | undefined) => {
          value && setUsage(value);
        },
      );
    })();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Flex
      gap={24}
      align="center"
      justify="space-around"
      className={styles.header}
    >
      <Tooltip
        styles={{
          body: {
            padding: 0,
            borderRadius: 8,
          },
        }}
        title={
          <Menu
            className={styles.menu}
            style={{
              borderRadius: 8,
            }}
            selectable={false}
            items={[
              {
                icon: (
                  <Flex align="center" justify="flex-start">
                    <SketchOutlined />
                    <Text>token</Text>
                  </Flex>
                ),
                label: (
                  <Text className={styles.statistic}>
                    {formatter(usage?.total_tokens || 0, {
                      precision: 0,
                    })}
                  </Text>
                ),
                key: "total_tokens",
              },
              {
                icon: (
                  <Flex align="center" justify="flex-start">
                    <DollarOutlined />
                    <Text>price</Text>
                  </Flex>
                ),
                label: (
                  <Text className={styles.statistic}>
                    {formatter(usage?.total_price || 0, {
                      precision: 6,
                    })}{" "}
                    {usage?.currency}
                  </Text>
                ),
                key: "total_price",
              },
              {
                icon: (
                  <Flex align="center" justify="flex-start">
                    <ClockCircleOutlined />
                    <Text>latency</Text>
                  </Flex>
                ),
                label: (
                  <Text className={styles.statistic}>
                    {formatter(usage?.latency || 0, {
                      precision: 6,
                    })}{" "}
                    秒
                  </Text>
                ),
                key: "latency",
              },
            ]}
          />
        }
      >
        <Button type="text">
          累计
          <Text className={styles.statistic}>
            {formatter(usage?.total_tokens || 0, {
              precision: 0,
            })}
          </Text>
          token
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default Usage;
