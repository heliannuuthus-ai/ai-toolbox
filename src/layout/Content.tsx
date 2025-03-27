import { createStyles } from "antd-style";
import { Layout } from "antd";
import Glossary from "@/pages/Glossary";
const { Content: AntContent } = Layout;

const useStyles = createStyles(({ css }) => ({
  content: css`
    height: "100dhv";
    display: "flex";
    flex-direction: "column";
    overflow: "hidden";
    background-color: var(--background-color);
    width: "100%";
  `,
}));

const Content = () => {
  const { styles } = useStyles();
  return (
    <AntContent className={styles.content}>
      <Glossary />
    </AntContent>
  );
};

export default Content;
