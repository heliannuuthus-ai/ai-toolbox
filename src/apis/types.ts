export interface FileMeta {
  id: string;
  name: string;
  size: number;
  extension: string;
  mime_type: string;
  created_by: string;
  created_at: string;
}

export enum Feedback {
  LIKE = "like",
  DISLIKE = "dislike",
  CANCEL = "cancel",
}
