import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { downloadReportWithImages } from "./utils/downloadUtils";
import { ReportDeleteDialog } from "./components/ReportDeleteDialog";
import { ReportActions } from "./components/ReportActions";

interface ReportListItemProps {
  report: {
    id: string;
    created_at: string;
    report_text: string;
    detailed_description: string;
    event_duration: string;
    attendees_count: string;
    event_objectives: string;
    impact_on_participants: string;
    photos: string[];
    event_id: string;
    report_name: string;
    profiles?: {
      id: string;
      email: string;
    } | null;
  };
  eventTitle?: string;
}

export const ReportListItem = ({
  report,
  eventTitle,
}: ReportListItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log('Attempting to delete report:', report.id);
      
      const { error } = await supabase
        .from('event_reports')
        .delete()
        .eq('id', report.id);

      if (error) {
        console.error('Error deleting report:', error);
        toast.error('حدث خطأ أثناء حذف التقرير');
        return;
      }

      console.log('Report deleted successfully');
      await queryClient.invalidateQueries({
        queryKey: ['event-reports', report.event_id]
      });
      toast.success('تم حذف التقرير بنجاح');
    } catch (error) {
      console.error('Error in delete handler:', error);
      toast.error('حدث خطأ أثناء حذف التقرير');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleDownload = async () => {
    try {
      toast.info('جاري تحضير الملف...');
      const success = await downloadReportWithImages(report, eventTitle);
      if (success) {
        toast.success('تم تحميل التقرير بنجاح');
      } else {
        toast.error('حدث خطأ أثناء تحميل التقرير');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('حدث خطأ أثناء تحميل التقرير');
    }
  };

  return (
    <>
      <TableRow>
        <TableCell className="text-right">{report.report_name || eventTitle}</TableCell>
        <TableCell className="text-right">{report.profiles?.email || 'غير معروف'}</TableCell>
        <TableCell className="text-right">{new Date(report.created_at).toLocaleDateString('ar')}</TableCell>
        <TableCell className="text-center">
          <ReportActions
            onDownload={handleDownload}
            onDelete={() => setShowDeleteDialog(true)}
            isDeleting={isDeleting}
          />
        </TableCell>
      </TableRow>
      
      <ReportDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </>
  );
};