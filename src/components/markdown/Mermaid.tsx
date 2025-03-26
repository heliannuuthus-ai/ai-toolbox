import { useCallback, useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "antd-style";
import { svgToBase64 } from "@/utils/markdown";
import { usePrevious } from "ahooks";
import { Image, Result, Spin, Tabs } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Mermaid = ({
  ref,
  primitiveCode,
}: {
  ref?: React.RefObject<HTMLDivElement>;
  primitiveCode: string;
}) => {
  const [look, setLook] = useState<"classic" | "handDrawn">("classic");
  const [loading, setLoading] = useState(false);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const prevPrimitiveCode = usePrevious(primitiveCode);
  const interval = useRef<number>(0);
  const theme = useTheme();

  const render = useCallback(
    async (code: string) => {
      setSvg("");
      setLoading(true);

      try {
        const graph = await mermaid.render("mermaid-container", code);
        setSvg(await svgToBase64(graph.svg));
      } catch (error) {
        if (prevPrimitiveCode !== primitiveCode) {
          console.error("Error rendering mermaid", error);
          setError(error as string);
        }
      } finally {
        setLoading(false);
      }
    },
    [primitiveCode],
  );

  useEffect(() => {
    console.log("mermaid theme", theme.appearance);

    mermaid.initialize({
      startOnLoad: true,
      theme: theme.appearance === "dark" ? "dark" : "neutral",
      look,
      flowchart: {
        htmlLabels: true,
        useMaxWidth: true,
      },
    });

    render(primitiveCode);
  }, [look]);

  useEffect(() => {
    if (interval.current) window.clearTimeout(interval.current);

    interval.current = window.setTimeout(() => {
      console.log("mermaid theme", theme.appearance);
      render(primitiveCode);
    }, 300);
  }, [primitiveCode]);

  return (
    <div ref={ref}>
      <Tabs
        activeKey={look}
        onChange={(key) => setLook(key as "classic" | "handDrawn")}
        centered
        items={[
          {
            key: "classic",
            label: "Classic",
            children: <Body svg={svg} loading={loading} error={error} />,
          },
          {
            key: "handDrawn",
            label: "Hand Drawn",
            children: <Body svg={svg} loading={loading} error={error} />,
          },
        ]}
      />
    </div>
  );
};

const Body = ({
  svg,
  loading,
  error,
}: {
  svg: string;
  loading: boolean;
  error: string | null;
}) => {
  console.log("svg", svg, "loading", loading, "error", error);
  return svg ? (
    <Image
      preview={{
        src: svg,
      }}
      src={svg}
      alt="mermaid"
    />
  ) : loading ? (
    <Spin indicator={<LoadingOutlined />} />
  ) : error ? (
    <Result status="error" title="Error" subTitle={error} />
  ) : null;
};

export default Mermaid;
