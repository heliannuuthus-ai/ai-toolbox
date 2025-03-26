import { useTheme } from "antd-style";
import { memo, useMemo, useState } from "react";
import { getCorrectCapitalizationLanguageName } from "@/utils/markdown";
import Mermaid from "./Mermaid";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import ReactEcharts from "echarts-for-react";
import SvgGallery from "./SvgGallery";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atelierHeathDark,
  atelierHeathLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { THEME } from "@/commands/common";
import { property } from "lodash-es";
// children is string or react node
const CodeBlock = memo(({ inline, className, children, ...props }: any) => {
  const theme = useTheme();
  const [isSvg, setIsSvg] = useState(true);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const languageName = getCorrectCapitalizationLanguageName(language);

  const chartData = useMemo(() => {
    // if echarts, parse the children as json
    if (language === "echarts") {
      try {
        return JSON.parse(String(children).replace(/\n$/, ""));
      } catch (error) {}
    }
    return JSON.parse(
      '{"title":{"text":"ECharts error - Wrong JSON format."}}',
    );
  }, [language, children]);

  const renderCodeContent = useMemo(() => {
    console.log("language", language, children);
    const content = String(children).replace(/\n$/, "");
    if (language === "mermaid" && isSvg) {
      return <Mermaid primitiveCode={content} />;
    } else if (language == "echarts") {
      return (
        <div
          style={{ minHeight: "350px", minWidth: "100%", overflowX: "scroll" }}
        >
          <ErrorBoundary>
            <ReactEcharts option={chartData} style={{ minWidth: "700px" }} />
          </ErrorBoundary>
        </div>
      );
    } else if (language === "svg" && isSvg) {
      return (
        <ErrorBoundary>
          <SvgGallery content={content} />
        </ErrorBoundary>
      );
    } else {
      return (
        <SyntaxHighlighter
          {...props}
          style={
            theme.appearance === "dark" ? atelierHeathDark : atelierHeathLight
          }
          customStyle={{
            paddingLeft: 12,
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            backgroundColor: `${theme.colorBgContainer}`,
          }}
          language={match?.[1]}
          showLineNumbers
          PreTag="div"
        >
          {content}
        </SyntaxHighlighter>
      );
    }
  }, [language, children, match, props, children, chartData, isSvg]);

  if (inline || !match) {
    return (
      <code {...props} className={className}>
        {children}
      </code>
    );
  }
  return <div>{renderCodeContent}</div>;
});

export default CodeBlock;
