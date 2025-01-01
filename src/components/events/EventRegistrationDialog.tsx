import { Event } from "@/store/eventStore";
import { useState } from "react";
import { RegistrationForm } from "./RegistrationForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventConfirmationDialog } from "./confirmation/EventConfirmationDialog";

interface EventRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Event;
  onComplete?: () => void;
}

export const EventRegistrationDialog = ({
  open,
  onOpenChange,
  event,
  onComplete
}: EventRegistrationDialogProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>("");
  const [registrationData, setRegistrationData] = useState<any>(null);

  console.log('EventRegistrationDialog - State:', {
    showConfirmation,
    registrationId,
    registrationData
  });

  const handleRegistrationSuccess = (id: string, data: any) => {
    console.log('Registration successful:', { id, data });
    setRegistrationId(id);
    setRegistrationData(data);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    console.log('Confirmation dialog closed');
    setShowConfirmation(false);
    onOpenChange(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (showConfirmation && registrationId) {
    return (
      <EventConfirmationDialog
        open={showConfirmation}
        onOpenChange={handleConfirmationClose}
        registrationId={registrationId}
        eventTitle={event.title}
        eventDate={event.date}
        eventTime={event.time}
        eventLocation={event.location}
        formData={registrationData}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">تسجيل الحضور في {event.title}</DialogTitle>
        </DialogHeader>
        <RegistrationForm
          eventTitle={event.title}
          eventPrice={event.price}
          eventDate={event.date}
          eventTime={event.time}
          eventLocation={event.location}
          onSubmit={(data) => handleRegistrationSuccess(data.registrationId, data.formData)}
        />
      </DialogContent>
    </Dialog>
  );
};