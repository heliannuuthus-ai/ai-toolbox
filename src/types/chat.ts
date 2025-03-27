import { FileResponse, Usage } from "./common";

export type Metadata = {
  retriever_resources?: CitationItem[];
  usage?: Usage;
  annotation_reply: {
    id: string;
    account: {
      id: string;
      name: string;
    };
  };
};

export type MessageEnd = {
  message_id: string;
  metadata: Metadata;
  files?: FileResponse[];
};

export type Message = {
  message_id: string;
  task_id: string;
  answer: string;
  conversation_id: string;
  created_at: number;
};

export type MessageReplace = {
  message_id: string;
  task_id: string;
  answer: string;
  conversation_id: string;
  created_at: number;
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
