import { Layout } from "antd";
import Sider from "@/layout/Sider";
import Header from "@/layout/Header";
import ThemeProvider from "@/layout/ThemeProvider";

const { Content, Footer } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "var(--text-primary)",
  backgroundColor: "var(--background-color)",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "var(--text-primary)",
  backgroundColor: "var(--background-color)",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  maxWidth: "100%",
};

const App = () => {
  return (
    <ThemeProvider>
      <Layout style={layoutStyle}>
        <Sider />
        <Layout>
          <Header />
          <Content style={contentStyle}>Content</Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
