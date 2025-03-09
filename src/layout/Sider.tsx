import { Layout, Menu } from "antd";
import { createStyles } from "antd-style";
import Logo from "@/assets/images/logo48.svg?react";
import Name from "@/assets/images/name.svg?react";
import Wikipedia from "@/assets/images/layout/wikipedia.svg?react";
const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 120px;
    background-color: var(--background-color);
  `,
  logoVertical: css`
    flex: 1 0 58px;
    margin: 10px 0 0 10px;
    padding: 30px 20px 30px 10px;
    font-size: 16px;
    border-right: 1px solid var(--divider-color);
  `,
}));

const { Sider: AntdSider } = Layout;

const Sider = () => {
  const { styles } = useStyles();
  return (
    <AntdSider width={"var(--sidebar-width)"} className={styles.container}>
      <div className={styles.logoVertical}>
        <div
          style={{
            display: "flex",
            height: "27px",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          <Name />
        </div>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["wikipedia"]}
        style={{
          backgroundColor: "var(--background-color)",
          height: "100%",
        }}
        items={[
          {
            key: "wikipedia",
            label: "维基百科 Markdown",
            icon: <Wikipedia />,
          },
        ]}
      />
    </AntdSider>
  );
};

export default Sider;
