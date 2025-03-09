import { Layout } from "antd";
import Sider from "@/layout/Sider";
import Header from "@/layout/Header";
import Content from "@/layout/Content";
import ThemeProvider from "@/layout/ThemeProvider";

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  height: "100vh",
};

const App = () => {
  return (
    <ThemeProvider>
      <Layout style={layoutStyle}>
        <Sider />
        <Layout>
          <Header />
          <Content />
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
