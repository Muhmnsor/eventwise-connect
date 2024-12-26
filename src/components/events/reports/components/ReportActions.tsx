import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

interface ReportActionsProps {
  onDownload: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export const ReportActions = ({ onDownload, onDelete, isDeleting }: ReportActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDownload}
        title="تحميل التقرير"
      >
        <Download className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={isDeleting}
        title="حذف التقرير"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};