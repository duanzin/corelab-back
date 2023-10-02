export type NoteParams = {
  id: number;
  title: string;
  text: string;
  favorite: boolean;
  color: string;
};

export type CreateNoteParams = Omit<NoteParams, "id" | "favorite" | "color">;
