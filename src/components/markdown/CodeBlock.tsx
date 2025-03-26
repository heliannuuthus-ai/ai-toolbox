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
import { Copy, Wrap, Expand, Svg } from "@/components/buttons";
import { Card, Flex, Space } from "antd";
// children is string or react node
const CodeBlock = memo(({ inline, className, children, ...props }: any) => {
  const theme = useTheme();
  const [isSvg, setIsSvg] = useState(true);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const languageName = getCorrectCapitalizationLanguageName(language);
  const [wrapped, setWrapped] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const linesCount = (str: string) => str.split("\n").length;

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
        <>
          <div
            style={{
              overflow: expanded ? "visible" : "hidden",
              height: expanded ? "auto" : "0",
            }}
          >
            <SyntaxHighlighter
              {...props}
              style={
                theme.appearance === "dark"
                  ? atelierHeathDark
                  : atelierHeathLight
              }
              customStyle={{
                paddingLeft: 12,
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                backgroundColor: `${theme.colorBgContainer}`,
                whiteSpace: wrapped ? "pre-wrap" : "pre",
                wordWrap: wrapped ? "break-word" : "normal",
                maxHeight: expanded ? "400px" : "0px",
                overflow: "auto",
              }}
              language={match?.[1]}
              showLineNumbers
              PreTag="div"
              codeTagProps={{
                style: {
                  whiteSpace: wrapped ? "pre-wrap" : "pre",
                  wordWrap: wrapped ? "break-word" : "normal",
                  maxHeight: expanded ? "400px" : "0px",
                  overflow: "auto",
                },
              }}
            >
              {content}
            </SyntaxHighlighter>
          </div>
          {expanded ? null : (
            <div
              style={{
                textAlign: "center",
                padding: "8px",
                backgroundColor: theme.colorBgContainer,
                color: theme.colorTextSecondary,
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              已折叠 {linesCount(content)} 行代码
            </div>
          )}
        </>
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
  return (
    <div style={{ position: "relative" }}>
      <Flex align="center" justify="space-between">
        <Card
          hoverable
          title={languageName}
          variant="borderless"
          style={{
            width: "100%",
            minWidth: "400px",
          }}
          extra={
            <Space size={1}>
              {["mermaid", "echarts", "svg"].includes(language) ? (
                <Svg value={isSvg} onChange={setIsSvg} />
              ) : (
                <>
                  <Expand
                    shape="round"
                    value={expanded}
                    children={expanded ? "收起" : "展开"}
                    onChange={setExpanded}
                  />
                  <Wrap
                    shape="round"
                    value={wrapped}
                    children={wrapped ? "取消换行" : "自动换行"}
                    onChange={setWrapped}
                  />
                </>
              )}
              <Copy
                shape="round"
                content={String(children).replace(/\n$/, "")}
                children={"复制"}
              />
            </Space>
          }
        >
          {renderCodeContent}
        </Card>
      </Flex>
    </div>
  );
});

export default CodeBlock;
