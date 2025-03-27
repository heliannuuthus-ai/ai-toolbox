import { Layout } from "antd";
import { createStyles } from "antd-style";
import { Header as Glossary } from "@/pages/glossary";

const useStyles = createStyles(({ css }) => ({
  header: css`
    text-align: center;
    color: var(--text-primary);
    height: 97px;
    padding-inline: 48px;
    line-height: 72px;
    background-color: var(--background-color);
    border-bottom: 1px solid var(--divider-color);
  `,
}));

const { Header: AntdHeader } = Layout;

const Header = () => {
  const { styles } = useStyles();
  return (
    <AntdHeader data-tauri-drag-region className={styles.header}>
      <Glossary />
    </AntdHeader>
  );
};

export default Header;
