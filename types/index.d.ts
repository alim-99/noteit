export interface Note {
      id: string;
      title: string;
      content: string;
      tags: string[];
      category: string;
      summary?: string;
      created_at?: string;
      updated_at?: string;
}

export interface PageProps {
      params: {
            id: string;
      };
}

export interface UpdateNoteParams {
      noteId: string;
      updates: {
            title: string;
            content: string;
            tags: string[];
            category: string;
            summary: string | undefined;
      };
}

export type NotesCardProps = {
      id: string
      title: string
      content: string
      tags: string[]
      category: string
      summary?: string
      createdAt?: string | Date
      className?: string
}

export interface CreateNoteParams {
      title: string;
      content: string;
      tags: Array<string>;
      category: string;
      summary?: string;
}

export interface PageProps {
      params: { id: string }
}