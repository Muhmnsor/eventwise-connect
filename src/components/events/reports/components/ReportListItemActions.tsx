import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { Download, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { EditReportDialog } from "./EditReportDialog";
import { Report } from "@/types/report";

interface ReportListItemActionsProps {
  report: Report;
  onDownload: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export const ReportListItemActions = ({
  report,
  onDownload,
  onDelete,
  isDeleting
}: ReportListItemActionsProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <TableCell className="text-center">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
          title="تعديل التقرير"
        >
          <Pencil className="h-4 w-4" />
        </Button>
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

      <EditReportDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        report={report}
      />
    </TableCell>
  );
};