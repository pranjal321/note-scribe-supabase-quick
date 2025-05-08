
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  onCreateNote: () => void;
}

const EmptyState = ({ onCreateNote }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6 bg-muted/20 rounded-lg border border-dashed border-muted">
      <h3 className="text-lg font-medium mb-3">No notes yet</h3>
      <p className="text-muted-foreground text-center mb-6">
        Get started by creating your first note
      </p>
      <Button onClick={onCreateNote}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create note
      </Button>
    </div>
  );
};

export default EmptyState;
