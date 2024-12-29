import { useEffect, useState } from "react";
import { Event } from "@/store/eventStore";
import { EditEventDialog } from "./EditEventDialog";
import { EventContent } from "./EventContent";
import { EventImage } from "./EventImage";
import { EventTitle } from "./EventTitle";
import { EventRegistrationDialog } from "./EventRegistrationDialog";
import { useAuthStore } from "@/store/authStore";
import { EventDeleteDialog } from "./details/EventDeleteDialog";
import { handleEventUpdate } from "./details/handlers/EventUpdateHandler";
import { handleEventDelete } from "./details/handlers/EventDeleteHandler";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface EventDetailsViewProps {
  event: Event;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onAddToCalendar: () => void;
  onRegister?: () => void;
  id: string;
  children?: React.ReactNode;
}

export const EventDetailsView = ({
  event,
  isAdmin,
  onEdit,
  onDelete,
  onAddToCalendar,
  onRegister,
  id,
  children
}: EventDetailsViewProps) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(event);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { user } = useAuthStore();

  console.log('EventDetailsView - User:', user);
  console.log('EventDetailsView - isAdmin:', isAdmin);

  useEffect(() => {
    setCurrentEvent(event);
  }, [event]);

  const handleUpdateEvent = async (updatedEvent: Event) => {
    const result = await handleEventUpdate(updatedEvent, id);
    if (result) {
      setCurrentEvent(result);
    }
  };

  const handleRegister = () => {
    console.log('Opening registration dialog');
    setIsRegistrationOpen(true);
  };

  const handleDelete = async () => {
    await handleEventDelete({
      id,
      onSuccess: onDelete
    });
    setIsDeleteDialogOpen(false);
  };

  const handleVisibilityChange = async (visible: boolean) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_visible: visible })
        .eq('id', id);

      if (error) throw error;

      setCurrentEvent(prev => prev ? { ...prev, is_visible: visible } : null);
      toast.success(visible ? 'تم إظهار الفعالية' : 'تم إخفاء الفعالية');
    } catch (error) {
      console.error('Error updating event visibility:', error);
      toast.error('حدث خطأ أثناء تحديث حالة الظهور');
    }
  };

  if (!currentEvent) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <EventImage imageUrl={currentEvent.image_url || currentEvent.imageUrl} title={currentEvent.title} />
      
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <EventTitle
            title={currentEvent.title}
            isAdmin={isAdmin}
            onEdit={() => setIsEditDialogOpen(true)}
            onDelete={() => setIsDeleteDialogOpen(true)}
            onAddToCalendar={onAddToCalendar}
            isVisible={currentEvent.is_visible}
            onVisibilityChange={handleVisibilityChange}
          />

          {children}

          {!isAdmin && (
            <EventContent 
              event={currentEvent}
              onRegister={handleRegister}
            />
          )}
        </div>
      </div>

      <EditEventDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        event={currentEvent} 
        onSave={handleUpdateEvent} 
      />

      <EventRegistrationDialog
        open={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
        event={currentEvent}
      />

      <EventDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
};