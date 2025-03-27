import { FileResponse } from "./common";

export type Metadata = {
  retriever_resources?: CitationItem[];
  annotation_reply: {
    id: string;
    account: {
      id: string;
      name: string;
    };
  };
};

export type MessageEnd = {
  id: string;
  metadata: Metadata;
  files?: FileResponse[];
};

export type MessageReplace = {
  id: string;
  task_id: string;
  answer: string;
  conversation_id: string;
};

export type AnnotationReply = {
  id: string;
  task_id: string;
  answer: string;
  conversation_id: string;
  annotation_id: string;
  annotation_author_name: string;
};

export type CitationItem = {
  content: string;
  data_source_type: string;
  dataset_name: string;
  dataset_id: string;
  document_id: string;
  document_name: string;
  hit_count: number;
  index_node_hash: string;
  segment_id: string;
  segment_position: number;
  score: number;
  word_count: number;
};
