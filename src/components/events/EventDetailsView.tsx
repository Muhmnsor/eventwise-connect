import { Event } from "@/store/eventStore";
import { EventReportDialog } from "./EventReportDialog";
import { EventAdminTabs } from "./admin/EventAdminTabs";
import { useUserRoles } from "./admin/useUserRoles";
import { useState } from "react";
import { EventImage } from "./EventImage";
import { EventTitle } from "./EventTitle";
import { EventRegistrationDialog } from "./EventRegistrationDialog";
import { EventContent } from "./EventContent";
import { EditEventDialog } from "./EditEventDialog";
import { EventDeleteDialog } from "./details/EventDeleteDialog";
import { handleEventDeletion } from "./details/EventDeletionHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface EventDetailsViewProps {
  event: Event & { attendees: number };
  onEdit: () => void;
  onDelete: () => void;
  onAddToCalendar: () => void;
  onRegister: () => void;
  id: string;
  isAdmin: boolean;
}

export const EventDetailsView = ({
  event,
  onAddToCalendar,
  onRegister,
  id,
  isAdmin,
}: EventDetailsViewProps) => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(event);
  const { data: userRoles = [], isLoading: rolesLoading } = useUserRoles();
  const navigate = useNavigate();
  
  console.log('EventDetailsView - Event data:', currentEvent);
  console.log('EventDetailsView - isAdmin:', isAdmin);
  console.log('EventDetailsView - User roles:', userRoles);

  const handleRegister = () => {
    console.log('Opening registration dialog');
    setIsRegistrationOpen(true);
  };

  const handleEdit = () => {
    console.log('Opening edit dialog');
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    console.log('Opening delete dialog');
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleEventDeletion({ 
        eventId: id, 
        onSuccess: () => {
          navigate('/');
          toast.success('تم حذف الفعالية بنجاح');
        }
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('حدث خطأ أثناء حذف الفعالية');
    }
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    console.log('Updating event with:', updatedEvent);
    setCurrentEvent({ ...currentEvent, ...updatedEvent });
  };

  const canAddReport = !rolesLoading && (
    userRoles.includes('admin') || 
    userRoles.includes('event_executor')
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <EventImage imageUrl={currentEvent.image_url || currentEvent.imageUrl || ''} title={currentEvent.title} />
        <EventTitle 
          title={currentEvent.title}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShare={async () => {}}
          onAddToCalendar={onAddToCalendar}
        />
        <EventContent 
          event={currentEvent}
          onRegister={handleRegister}
        />

        {(isAdmin || canAddReport) && (
          <>
            <div className="mt-8 border-t border-gray-100">
              <EventAdminTabs
                event={currentEvent}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddToCalendar={onAddToCalendar}
                onRegister={handleRegister}
                id={id}
                canAddReport={canAddReport}
                onAddReport={() => setIsReportDialogOpen(true)}
                isAdmin={isAdmin}
              />
            </div>

            <EventReportDialog
              open={isReportDialogOpen}
              onOpenChange={setIsReportDialogOpen}
              eventId={id}
            />
          </>
        )}

        <EventRegistrationDialog
          open={isRegistrationOpen}
          onOpenChange={setIsRegistrationOpen}
          event={currentEvent}
        />

        <EditEventDialog 
          event={currentEvent}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleUpdateEvent}
        />

        <EventDeleteDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};