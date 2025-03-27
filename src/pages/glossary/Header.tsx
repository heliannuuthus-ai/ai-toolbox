import { Usage } from "@/types/common";
import { UnlistenFn } from "@tauri-apps/api/event";
import { LazyStore } from "@tauri-apps/plugin-store";
import { Statistic, StatisticProps } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
const store = new LazyStore("glossary");

const useStyles = createStyles(({ css }) => ({
  header: css`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: var(--text-primary);
    padding-inline: 48px;
    height: 100%;
    width: 100%;
    background-color: var(--background-color);
    border-bottom: 1px solid var(--divider-color);
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
      {({ countUpRef }) => (
        <span style={{ fontWeight: "bold" }} ref={countUpRef} />
      )}
    </CountUp>
  );
};

const Header = () => {
  const { styles } = useStyles();
  const [usage, setUsage] = useState<Usage>();

  useEffect(() => {
    let unsubscribe: UnlistenFn = () => {};
    (async () => {
      const value = await store.get<Usage>("usage");
      value && setUsage(value);
      unsubscribe = await store.onKeyChange<Usage>(
        "usage",
        (value: Usage | undefined) => {
          value && setUsage(value);
        },
      );
    })();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.header}>
      <Statistic
        prefix={"您已花费"}
        value={Number(usage?.total_price)}
        formatter={(value) =>
          formatter(value, {
            precision: 6,
          })
        }
        suffix={usage?.currency}
      />
      <Statistic
        prefix={"您已消耗"}
        value={usage?.total_tokens}
        formatter={(value) =>
          formatter(value, {
            precision: 0,
          })
        }
        suffix={"tokens"}
      />
      <Statistic
        prefix={"平均响应时间"}
        value={usage?.latency}
        precision={6}
        formatter={(value) =>
          formatter(value, {
            precision: 6,
          })
        }
        suffix={"秒"}
      />
    </div>
  );
};

export default Header;
