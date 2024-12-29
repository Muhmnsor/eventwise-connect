import { Card, CardContent } from "@/components/ui/card";
import { ProjectDashboardHeader } from "./ProjectDashboardHeader";
import { ProjectActivitiesList } from "./ProjectActivitiesList";
import { AddProjectEventDialog } from "@/components/projects/events/AddProjectEventDialog";
import { EditProjectActivityDialog } from "@/components/projects/activities/EditProjectActivityDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ProjectActivity } from "@/types/activity";

interface ProjectActivitiesTabProps {
  project: {
    id: string;
    event_path: string;
    event_category: string;
  };
  projectActivities: any[];
  refetchActivities: () => void;
}

export const ProjectActivitiesTab = ({ 
  project,
  projectActivities,
  refetchActivities
}: ProjectActivitiesTabProps) => {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleAddEvent = () => {
    setIsAddEventOpen(true);
  };

  const handleEditEvent = (projectEvent: any) => {
    console.log("Editing project event:", projectEvent);
    setSelectedEvent(projectEvent);
    setIsEditEventOpen(true);
  };

  const handleDeleteEvent = (event: any) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const { error: projectEventError } = await supabase
        .from('project_events')
        .delete()
        .eq('event_id', selectedEvent.event.id)
        .eq('project_id', project.id);

      if (projectEventError) throw projectEventError;

      const { error: eventError } = await supabase
        .from('events')
        .delete()
        .eq('id', selectedEvent.event.id);

      if (eventError) throw eventError;

      toast.success('تم حذف النشاط بنجاح');
      refetchActivities();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('حدث خطأ أثناء حذف النشاط');
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <ProjectDashboardHeader onAddEvent={handleAddEvent} />
        <ProjectActivitiesList
          projectActivities={projectActivities}
          onEditActivity={handleEditEvent}
          onDeleteActivity={handleDeleteEvent}
        />

        <AddProjectEventDialog
          open={isAddEventOpen}
          onOpenChange={setIsAddEventOpen}
          projectId={project.id}
          onSuccess={refetchActivities}
          project={project}
        />

        {selectedEvent && (
          <EditProjectActivityDialog
            activity={selectedEvent.event}
            open={isEditEventOpen}
            onOpenChange={setIsEditEventOpen}
            onSave={async (updatedActivity: ProjectActivity) => {
              try {
                const { error } = await supabase
                  .from('events')
                  .update(updatedActivity)
                  .eq('id', selectedEvent.event.id);

                if (error) throw error;

                toast.success('تم تحديث النشاط بنجاح');
                refetchActivities();
                setIsEditEventOpen(false);
              } catch (error) {
                console.error('Error updating event:', error);
                toast.error('حدث خطأ أثناء تحديث النشاط');
              }
            }}
            projectId={project.id}
          />
        )}

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من حذف هذا النشاط؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف النشاط بشكل نهائي ولا يمكن التراجع عن هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogAction onClick={confirmDelete}>
                نعم، احذف النشاط
              </AlertDialogAction>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};