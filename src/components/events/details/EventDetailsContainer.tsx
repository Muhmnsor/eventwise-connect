import { Event } from "@/store/eventStore";
import { EventDetailsHeader } from "./EventDetailsHeader";
import { EventDetailsContent } from "./EventDetailsContent";
import { EventContainer } from "../EventContainer";
import { EventFooter } from "../EventFooter";
import { EventRegistrationDialog } from "../EventRegistrationDialog";
import { EventDeleteDialog } from "./EventDeleteDialog";
import { useState } from "react";

interface EventDetailsContainerProps {
  event: Event & { attendees: number };
  onEdit: () => void;
  onDelete: () => void;
  onAddToCalendar: () => void;
  onRegister: () => void;
  isAdmin: boolean;
  id: string;
}

export const EventDetailsContainer = ({
  event,
  onEdit,
  onDelete,
  onAddToCalendar,
  onRegister,
  isAdmin,
  id
}: EventDetailsContainerProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleRegister = () => {
    setIsRegistrationOpen(true);
  };

  const transformedEvent = {
    ...event,
    certificateType: event.certificateType || 'none',
    eventHours: event.eventHours || 0,
    maxAttendees: event.max_attendees
  };

  return (
    <div className="min-h-screen flex flex-col">
      <EventContainer>
        <div className="flex-grow">
          <EventDetailsHeader
            event={transformedEvent}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={() => setIsDeleteDialogOpen(true)}
            onShare={async () => {}}
            onAddToCalendar={onAddToCalendar}
          />

          <EventDetailsContent 
            event={transformedEvent}
            onRegister={handleRegister}
          />
        </div>

        <EventFooter />

        <EventRegistrationDialog
          open={isRegistrationOpen}
          onOpenChange={setIsRegistrationOpen}
          event={event}
        />

        <EventDeleteDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={onDelete}
        />
      </EventContainer>
    </div>
  );
};