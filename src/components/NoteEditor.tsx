
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Note, UpdateNoteRequest } from "@/types/note";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: UpdateNoteRequest) => void;
}

const NoteEditor = ({ note, onSave }: NoteEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSave = () => {
    if (!note) return;

    onSave({
      id: note.id,
      title,
      content,
    });

    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };

  if (!note) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a note or create a new one</p>
      </div>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="text-xl font-semibold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className="editor-content border-none resize-none h-full focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Button onClick={handleSave} className="ml-auto">
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteEditor;
