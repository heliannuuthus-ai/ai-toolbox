export type IterationDurationMap = Record<string, number>;
export type LoopDurationMap = Record<string, number>;

export enum ErrorHandleTypeEnum {
  none = "none",
  failBranch = "fail-branch",
  defaultValue = "default-value",
}

export enum TransferMethod {
  all = "all",
  local_file = "local_file",
  remote_url = "remote_url",
}

export enum BlockEnum {
  Start = "start",
  End = "end",
  Answer = "answer",
  LLM = "llm",
  KnowledgeRetrieval = "knowledge-retrieval",
  QuestionClassifier = "question-classifier",
  IfElse = "if-else",
  Code = "code",
  TemplateTransform = "template-transform",
  HttpRequest = "http-request",
  VariableAssigner = "variable-assigner",
  VariableAggregator = "variable-aggregator",
  Tool = "tool",
  ParameterExtractor = "parameter-extractor",
  Iteration = "iteration",
  DocExtractor = "document-extractor",
  ListFilter = "list-operator",
  IterationStart = "iteration-start",
  Assigner = "assigner", // is now named as VariableAssigner
  Agent = "agent",
  Loop = "loop",
  LoopStart = "loop-start",
}

export type FileResponse = {
  related_id: string;
  extension: string;
  filename: string;
  size: number;
  mime_type: string;
  transfer_method: TransferMethod;
  type: string;
  url: string;
};

export interface Usage {
  total_tokens: number;
  total_price: string;
  currency: string;
  latency: number;
}
