
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, PlusCircle } from "lucide-react";
import NoteCard from "@/components/NoteCard";
import NoteEditor from "@/components/NoteEditor";
import EmptyState from "@/components/EmptyState";
import { Note, UpdateNoteRequest } from "@/types/note";
import { createNote, deleteNote, getNotes, updateNote } from "@/services/noteService";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      toast({
        title: "Error",
        description: "Failed to load notes. Please try again later.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote({
        title: "Untitled Note",
        content: "",
      });
      
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      
      toast({
        title: "Note created",
        description: "Your new note has been created.",
      });
    } catch (error) {
      console.error("Failed to create note:", error);
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleSaveNote = async (updatedNote: UpdateNoteRequest) => {
    try {
      const updated = await updateNote(updatedNote);
      setNotes(notes.map(note => note.id === updated.id ? updated : note));
      setSelectedNote(updated);
    } catch (error) {
      console.error("Failed to update note:", error);
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      
      if (selectedNote?.id === id) {
        setSelectedNote(updatedNotes[0] || null);
      }
      
      toast({
        title: "Note deleted",
        description: "Your note has been deleted.",
      });
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-80 p-4 border-r bg-muted/10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notes</h1>
          <Button onClick={handleCreateNote} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : notes.length === 0 ? (
          <EmptyState onCreateNote={handleCreateNote} />
        ) : (
          <div className="note-list">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={handleSelectNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 h-full">
        <NoteEditor note={selectedNote} onSave={handleSaveNote} />
      </div>
    </div>
  );
};

export default Index;
