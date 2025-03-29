import { Flex, Layout, Menu } from "antd";
import { createStyles } from "antd-style";
import Logo from "@/assets/images/logo.svg?react";
import Name from "@/assets/images/name.svg?react";
import Glossary from "@/assets/images/layout/glossary.svg?react";
import Icon from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
  logoContainer: css`
    flex: 1 0 58px;
    margin: 10px 0 0 10px;
    padding: 30px 20px 30px 10px;
    font-size: 16px;
    border-right: 1px solid var(--divider-color);
    cursor: pointer;
  `,
  logoVisible: css`
    width: 48px;
    height: 27px;
    font-size: 48px;
    transition:
      width 0.3s ease-in-out,
      font-size 0.3s ease-in-out;
  `,
  logoCollapsed: css`
    width: 56px;
    height: 27px;
    font-size: 56px;
    transition:
      width 0.3s ease-in-out,
      font-size 0.3s ease-in-out;
  `,
  nameVisible: css`
    width: 120px;
    height: 27px;
    margin-inline-start: 10px;
    font-size: 120px;
    transition:
      margin-inline-start 0.3s ease-in-out,
      width 0.3s ease-in-out;
  `,
  nameCollapsed: css`
    width: 0px;
    height: 27px;
    font-size: 120px;
    transition:
      width 0.3s ease-in-out,
      font-size 0.3s ease-in-out;
  `,
}));

const { Sider: AntdSider } = Layout;

const Sider = ({
  openSider,
  setOpenSider,
}: {
  openSider: boolean;
  setOpenSider: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    console.log(location.pathname.substring(1));
    setSelectedKeys([location.pathname.substring(1)]);
  }, [location.pathname]);

  return (
    <AntdSider
      className={styles.container}
      width={"var(--sidebar-width)"}
      breakpoint="md"
      onBreakpoint={(broken) => {
        setOpenSider(!broken);
      }}
      collapsible
      trigger={null}
      collapsed={!openSider}
      onCollapse={() => setOpenSider(!openSider)}
      collapsedWidth={"var(--sidebar-width-collapsed)"}
    >
      <div className={styles.logoContainer} onClick={() => navigate("/")}>
        <Flex
          style={{
            height: "27px",
            justifyContent: "space-between",
          }}
        >
          <Icon
            className={openSider ? styles.logoVisible : styles.logoCollapsed}
            component={Logo}
          />
          <Icon
            className={openSider ? styles.nameVisible : styles.nameCollapsed}
            component={Name}
          />
        </Flex>
      </div>
      <Menu
        selectedKeys={selectedKeys}
        mode="inline"
        style={{
          backgroundColor: "var(--background-color)",
          height: "100%",
        }}
        items={[
          {
            key: "glossary",
            label: "词条助手(Glossary Assistant)",
            icon: <Glossary />,
            onClick: () => {
              setSelectedKeys(["glossary"]);
              navigate("/glossary");
            },
          },
        ]}
      />
    </AntdSider>
  );
};

export default Sider;
