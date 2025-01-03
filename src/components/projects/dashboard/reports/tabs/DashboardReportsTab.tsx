import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReportForm } from "../ReportForm";
import { ProjectReportDeleteDialog } from "../components/ProjectReportDeleteDialog";
import { downloadProjectReport } from "@/utils/reports/downloadProjectReport";
import { useToast } from "@/hooks/use-toast";
import { ReportsHeader } from "../components/ReportsHeader";
import { ReportsTable } from "../components/ReportsTable";

interface DashboardReportsTabProps {
  projectId: string;
}

export const DashboardReportsTab = ({ projectId }: DashboardReportsTabProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const { data: reports = [], isLoading, refetch } = useQuery({
    queryKey: ['project-reports', projectId],
    queryFn: async () => {
      console.log("Fetching reports for project:", projectId);
      const { data, error } = await supabase
        .from('project_activity_reports')
        .select(`
          *,
          events:activity_id (
            title
          )
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching reports:", error);
        throw error;
      }

      console.log("Fetched reports:", data);
      return data || [];
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = async () => {
    if (!selectedReport) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('project_activity_reports')
        .delete()
        .eq('id', selectedReport.id);

      if (error) throw error;

      toast({
        title: "تم حذف التقرير بنجاح",
        variant: "default",
      });
      
      refetch();
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: "حدث خطأ أثناء حذف التقرير",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setSelectedReport(null);
    }
  };

  const handleDownload = async (report: any) => {
    try {
      await downloadProjectReport(report);
      toast({
        title: "تم تحميل التقرير بنجاح",
        variant: "default",
      });
    } catch (error) {
      console.error('Error downloading report:', error);
      toast({
        title: "حدث خطأ أثناء تحميل التقرير",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (report: any) => {
    setSelectedReport(report);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <ReportsHeader onAddReport={() => setIsFormOpen(!isFormOpen)} />

      {isFormOpen && (
        <ReportForm 
          projectId={projectId} 
          report={selectedReport}
          onSuccess={() => {
            setIsFormOpen(false);
            setSelectedReport(null);
            refetch();
          }}
        />
      )}

      <ReportsTable 
        reports={reports}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={(report) => {
          setSelectedReport(report);
          setIsDeleteDialogOpen(true);
        }}
        onDownload={handleDownload}
        isDeleting={isDeleting}
        selectedReport={selectedReport}
        formatDate={formatDate}
      />

      <ProjectReportDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};
