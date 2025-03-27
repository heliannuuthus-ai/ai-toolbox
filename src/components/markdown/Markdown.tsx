import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import CodeBlock from "./CodeBlock";
import ThinkBlock from "./ThinkBlock";
import { flow } from "lodash-es";
import { preprocessThinkTag, preprocessLaTeX } from "@/utils/markdown";
interface MarkdownProps {
  content: string;
  customDisallowedElements?: string[];
}

const Markdown = ({ content, customDisallowedElements }: MarkdownProps) => {
  const latexContent = flow([preprocessThinkTag, preprocessLaTeX])(content);

  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        [remarkMath, { singleDollarTextMath: true }],
        remarkBreaks,
      ]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      disallowedElements={[
        "iframe",
        "head",
        "html",
        "meta",
        "style",
        "body",
        ...(customDisallowedElements || []),
      ]}
      components={{
        code: CodeBlock,
        details: ThinkBlock,
      }}
    >
      {latexContent}
    </ReactMarkdown>
  );
};

export default Markdown;
