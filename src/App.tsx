import { Layout } from "antd";
import Sider from "@/layout/Sider";
import Header from "@/layout/Header";
import Content from "@/layout/Content";
import ThemeProvider from "@/layout/ThemeProvider";
import { createContext, useContext, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { independentRoutes } from "@/routes/independent";

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  height: "100vh",
};

export interface AppContextType {
  isSiderOpen: boolean;
  changeTitle: (title: string | null) => void;
}

export const useAppContext = () => useContext(AppContext);

const AppContext = createContext<AppContextType>({
  isSiderOpen: true,
  changeTitle: () => {},
});

const App = () => {
  const [isSiderOpen, setSiderOpen] = useState(true);
  const [title, setTitle] = useState<string | null>(null);
  const location = useLocation();
  const isIndependentRoute = location.pathname.startsWith("/_");
  return (
    <ThemeProvider>
      <AppContext.Provider
        value={{ isSiderOpen: isSiderOpen, changeTitle: setTitle }}
      >
        {isIndependentRoute ? (
          useRoutes(independentRoutes)
        ) : (
          <Layout style={layoutStyle}>
            <Sider openSider={isSiderOpen} setOpenSider={setSiderOpen} />
            <Layout>
              {location.pathname !== "/" ? (
                <Header
                  title={title}
                  openSider={isSiderOpen}
                  setOpenSider={setSiderOpen}
                />
              ) : null}
              <Content />
            </Layout>
          </Layout>
        )}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
