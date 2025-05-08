
import { CreateNoteRequest, Note, UpdateNoteRequest } from "@/types/note";

// Mock data for development
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Welcome to Notes",
    content: "This is a simple note-taking application built with React and TypeScript.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "user-1",
  },
  {
    id: "2",
    title: "Shopping List",
    content: "- Milk\n- Eggs\n- Bread\n- Coffee\n- Chocolate",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    user_id: "user-1",
  },
  {
    id: "3",
    title: "Project Ideas",
    content: "1. Build a personal website\n2. Create a budget tracker\n3. Learn a new programming language",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    user_id: "user-1",
  },
];

// In a real application, these functions would interact with Supabase edge functions
export const getNotes = async (): Promise<Note[]> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNotes);
    }, 500);
  });
};

export const createNote = async (note: CreateNoteRequest): Promise<Note> => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNote: Note = {
        id: Date.now().toString(),
        title: note.title,
        content: note.content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: "user-1",
      };
      
      mockNotes.unshift(newNote);
      resolve(newNote);
    }, 500);
  });
};

export const updateNote = async (note: UpdateNoteRequest): Promise<Note> => {
  // Simulating API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockNotes.findIndex((n) => n.id === note.id);
      
      if (index === -1) {
        reject(new Error("Note not found"));
        return;
      }
      
      const updatedNote = {
        ...mockNotes[index],
        title: note.title ?? mockNotes[index].title,
        content: note.content ?? mockNotes[index].content,
        updated_at: new Date().toISOString(),
      };
      
      mockNotes[index] = updatedNote;
      resolve(updatedNote);
    }, 500);
  });
};

export const deleteNote = async (id: string): Promise<void> => {
  // Simulating API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockNotes.findIndex((n) => n.id === id);
      
      if (index === -1) {
        reject(new Error("Note not found"));
        return;
      }
      
      mockNotes.splice(index, 1);
      resolve();
    }, 500);
  });
};
