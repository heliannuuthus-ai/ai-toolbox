import { Flex, Layout, Typography } from "antd";
import { createStyles } from "antd-style";
import { Sider } from "@/components/buttons";
import Usage from "@/layout/Header/Usage";
import { useEffect } from "react";
import { useAppContext } from "@/App";
import { useLocation } from "react-router";
import Conversation from "@/layout/Header/Conversation";
const { Title } = Typography;

const useStyles = createStyles(({ css }) => ({
  container: css`
    text-align: center;
    color: var(--text-primary);
    height: 97px;
    padding-inline: 48px;
    line-height: 72px;
    background-color: var(--background-color);
    border-bottom: 1px solid var(--divider-color);
  `,
  header: css`
    height: 100%;
  `,
}));

const { Header: AntdHeader } = Layout;

const Header = ({
  title,
  openSider,
  setOpenSider,
}: {
  title: string | null;
  openSider: boolean;
  setOpenSider: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { styles } = useStyles();
  const { changeTitle } = useAppContext();
  const location = useLocation();
  useEffect(() => {
    changeTitle(location.pathname.split("/").pop() ?? null);
  }, [location.pathname]);

  return (
    <AntdHeader data-tauri-drag-region className={styles.container}>
      <Flex align="center" justify="space-between" className={styles.header}>
        <Flex gap={24} align="center" justify="flex-start">
          {location.pathname != "/" && <Usage />}
        </Flex>
        <Flex align="center" justify="center">
          <Title style={{ whiteSpace: "nowrap", margin: 0 }} level={4}>
            {title}
          </Title>
        </Flex>
        <Flex align="center" justify="flex-end">
          <Conversation />
          <Sider value={openSider} onChange={setOpenSider} />
        </Flex>
      </Flex>
    </AntdHeader>
  );
};

export default Header;
