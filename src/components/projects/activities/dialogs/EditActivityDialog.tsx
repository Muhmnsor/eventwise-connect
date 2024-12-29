import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ProjectActivity, ProjectActivityFormData } from "@/types/activity";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditProjectEventHeader } from "../../events/EditProjectEventHeader";
import { EditActivityForm } from "../form/EditActivityForm";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditActivityDialogProps {
  activity: {
    id: string;
    project_id: string;
    event: ProjectActivity;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  projectId: string;
}

export const EditActivityDialog = ({ 
  activity, 
  open, 
  onOpenChange,
  onSave,
  projectId
}: EditActivityDialogProps) => {
  console.log('EditActivityDialog - Received activity:', activity);
  const [isLoading, setIsLoading] = useState(false);
  
  // Transform the activity data to match the expected form structure
  const formData = {
    id: activity.event.id,
    title: activity.event.title,
    description: activity.event.description,
    date: activity.event.date,
    time: activity.event.time,
    location: activity.event.location,
    location_url: activity.event.location_url,
    special_requirements: activity.event.special_requirements,
    event_hours: activity.event.event_hours
  };

  const handleSubmit = async (data: ProjectActivityFormData) => {
    setIsLoading(true);
    try {
      console.log('EditActivityDialog - Submitting update with data:', data);
      
      const { error } = await supabase
        .from('events')
        .update({
          title: data.title,
          description: data.description,
          date: data.date,
          time: data.time,
          location: data.location,
          location_url: data.location_url,
          special_requirements: data.special_requirements,
          event_hours: data.event_hours
        })
        .eq('id', activity.event.id);

      if (error) throw error;

      console.log('EditActivityDialog - Update successful');
      
      // Close dialog first
      onOpenChange(false);
      
      // Then update UI and show success message
      await onSave();
      toast.success('تم تحديث النشاط بنجاح');
    } catch (error) {
      console.error('Error updating activity:', error);
      toast.error('حدث خطأ أثناء تحديث النشاط');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]" dir="rtl">
        <EditProjectEventHeader />
        <ScrollArea className="h-[calc(90vh-120px)]">
          <EditActivityForm
            activity={formData}
            onSave={onSave}
            onCancel={() => onOpenChange(false)}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};