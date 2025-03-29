import { createStyles } from "antd-style";
import { Layout } from "antd";
import Glossary from "@/pages/glossary";
import { Suspense } from "react";
import { useRoutes } from "react-router";
import Home from "@/pages/index";

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

const mainRoutes = [
  { path: "/", element: <Home /> },
  { path: "/glossary", element: <Glossary /> },
];

const Content = () => {
  const { styles } = useStyles();
  return (
    <AntContent className={styles.content}>
      <Suspense fallback={<div>Loading...</div>}>
        {useRoutes(mainRoutes)}
      </Suspense>
    </AntContent>
  );
};

export default Content;
