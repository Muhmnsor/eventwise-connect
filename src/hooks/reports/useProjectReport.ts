import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProjectReport, ProjectReportFormData } from '@/types/projectReport';

export const useProjectReport = (projectId: string, activityId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const submitReport = async (data: ProjectReportFormData) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting project report:', data);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('يجب تسجيل الدخول لإنشاء تقرير');
        return;
      }

      const { error } = await supabase
        .from('project_activity_reports')
        .insert({
          project_id: projectId,
          activity_id: activityId,
          executor_id: user.id,
          program_name: data.program_name,
          report_name: data.report_name,
          report_text: data.report_text,
          detailed_description: data.detailed_description,
          activity_duration: data.activity_duration,
          attendees_count: data.attendees_count,
          activity_objectives: data.activity_objectives,
          impact_on_participants: data.impact_on_participants,
          photos: data.photos,
        });

      if (error) throw error;

      await queryClient.invalidateQueries({
        queryKey: ['project-activity-reports', projectId]
      });
      
      toast.success('تم إضافة التقرير بنجاح');
      return true;
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('حدث خطأ أثناء إضافة التقرير');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateReport = async (reportId: string, data: Partial<ProjectReport>) => {
    try {
      setIsSubmitting(true);
      console.log('Updating project report:', { reportId, data });

      const { error } = await supabase
        .from('project_activity_reports')
        .update(data)
        .eq('id', reportId);

      if (error) throw error;

      await queryClient.invalidateQueries({
        queryKey: ['project-activity-reports', projectId]
      });
      
      toast.success('تم تحديث التقرير بنجاح');
      return true;
    } catch (error) {
      console.error('Error updating report:', error);
      toast.error('حدث خطأ أثناء تحديث التقرير');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteReport = async (reportId: string) => {
    try {
      setIsSubmitting(true);
      console.log('Deleting project report:', reportId);

      const { error } = await supabase
        .from('project_activity_reports')
        .delete()
        .eq('id', reportId);

      if (error) throw error;

      await queryClient.invalidateQueries({
        queryKey: ['project-activity-reports', projectId]
      });
      
      toast.success('تم حذف التقرير بنجاح');
      return true;
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.error('حدث خطأ أثناء حذف التقرير');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitReport,
    updateReport,
    deleteReport
  };
};