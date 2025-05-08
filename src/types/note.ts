
export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type CreateNoteRequest = {
  title: string;
  content: string;
};

export type UpdateNoteRequest = {
  id: string;
  title?: string;
  content?: string;
};
