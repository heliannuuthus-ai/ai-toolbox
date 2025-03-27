import { flow } from "lodash-es";

const capitalizationLanguageNameMap: Record<string, string> = {
  sql: "SQL",
  javascript: "JavaScript",
  java: "Java",
  typescript: "TypeScript",
  vbscript: "VBScript",
  css: "CSS",
  html: "HTML",
  xml: "XML",
  php: "PHP",
  python: "Python",
  yaml: "Yaml",
  mermaid: "Mermaid",
  markdown: "MarkDown",
  makefile: "MakeFile",
  echarts: "ECharts",
  shell: "Shell",
  powershell: "PowerShell",
  json: "JSON",
  latex: "Latex",
  svg: "SVG",
};

export const getCorrectCapitalizationLanguageName = (language: string) => {
  if (!language) return "Plain";

  if (language in capitalizationLanguageNameMap)
    return capitalizationLanguageNameMap[language];

  return language.charAt(0).toUpperCase() + language.substring(1);
};

export const preprocessLaTeX = (content: string) => {
  if (typeof content !== "string") return content;

  return flow([
    (str: string) =>
      str.replace(/\\\[(.*?)\\\]/g, (_, equation) => `$$${equation}$$`),
    (str: string) =>
      str.replace(/\\\[(.*?)\\\]/gs, (_, equation) => `$$${equation}$$`),
    (str: string) =>
      str.replace(/\\\((.*?)\\\)/g, (_, equation) => `$$${equation}$$`),
    (str: string) =>
      str.replace(
        /(^|[^\\])\$(.+?)\$/g,
        (_, prefix, equation) => `${prefix}$${equation}$`,
      ),
  ])(content);
};

export const preprocessThinkTag = (content: string) => {
  return flow([
    (str: string) => str.replace("<think>\n", "<details data-think=true>\n"),
    (str: string) => str.replace("\n</think>", "\n[ENDTHINKFLAG]</details>"),
  ])(content);
};

export const svgToBase64 = (svg: string): Promise<string> => {
  const bytes = new TextEncoder().encode(svg);

  const blob = new Blob([bytes], { type: "image/svg+xml;charset=utf-8" });

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
