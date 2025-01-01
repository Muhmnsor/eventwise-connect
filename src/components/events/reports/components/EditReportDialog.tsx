import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Report } from "@/types/report";
import { EditReportDialogHeader } from "./dialog/EditReportDialogHeader";
import { EditReportDialogContent } from "./dialog/EditReportDialogContent";
import { EditReportDialogActions } from "./dialog/EditReportDialogActions";

interface EditReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report;
}

export const EditReportDialog = ({
  open,
  onOpenChange,
  report,
}: EditReportDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const [formValues, setFormValues] = useState({
    report_name: report.report_name,
    program_name: report.program_name,
    report_text: report.report_text,
    detailed_description: report.detailed_description,
    event_duration: report.event_duration,
    attendees_count: report.attendees_count,
    event_objectives: report.event_objectives,
    impact_on_participants: report.impact_on_participants,
    photos: report.photos || [],
  });

  const { data: activities = [] } = useQuery({
    queryKey: ['project-activities', report.event_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('project_id', report.event_id)
        .eq('is_project_activity', true)
        .order('date', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log('Submitting updated report:', formValues);

      const { error } = await supabase
        .from('event_reports')
        .update({
          report_name: formValues.report_name,
          program_name: formValues.program_name,
          report_text: formValues.report_text,
          detailed_description: formValues.detailed_description,
          event_duration: formValues.event_duration,
          attendees_count: formValues.attendees_count,
          event_objectives: formValues.event_objectives,
          impact_on_participants: formValues.impact_on_participants,
          photos: formValues.photos,
        })
        .eq('id', report.id);

      if (error) throw error;

      await queryClient.invalidateQueries({
        queryKey: ['event-reports', report.event_id]
      });
      
      toast.success('تم تحديث التقرير بنجاح');
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating report:', error);
      toast.error('حدث خطأ أثناء تحديث التقرير');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <EditReportDialogHeader />
        <EditReportDialogContent
          formValues={formValues}
          setFormValues={setFormValues}
          activities={activities}
        />
        <EditReportDialogActions
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};