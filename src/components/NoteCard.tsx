
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { Note } from "@/types/note";
import { Button } from "@/components/ui/button";

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onClick, onDelete }: NoteCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  return (
    <Card
      className="note-card cursor-pointer mb-4"
      onClick={() => onClick(note)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg line-clamp-1">{note.title || "Untitled Note"}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">
          {note.content || "No content"}
        </p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
