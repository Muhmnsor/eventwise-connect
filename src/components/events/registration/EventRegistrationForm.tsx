import { RegistrationFormContainer } from "./RegistrationFormContainer";
import { EventRegistrationConfirmation } from "./confirmation/EventRegistrationConfirmation";
import { useRegistration } from "./hooks/useRegistration";

interface EventRegistrationFormProps {
  eventTitle: string;
  eventPrice: number | "free" | null;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  onSubmit: () => void;
}

export const EventRegistrationForm = ({
  eventTitle,
  eventPrice,
  eventDate,
  eventTime,
  eventLocation,
  onSubmit,
}: EventRegistrationFormProps) => {
  const {
    formData,
    showConfirmation,
    setShowConfirmation,
    registrationId,
    isRegistered,
    handleSubmit
  } = useRegistration(() => {
    console.log('EventRegistrationForm - Registration successful, calling onSubmit');
    onSubmit(); // تم إزالة الشرط لأن onSubmit مطلوب في الواجهة
  }, false);

  console.log('EventRegistrationForm - Current state:', {
    showConfirmation,
    isRegistered,
    registrationId,
    formData
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    console.log('EventRegistrationForm - Form submitted');
    try {
      await handleSubmit(e);
      console.log('EventRegistrationForm - Form submission successful');
    } catch (error) {
      console.error('EventRegistrationForm - Form submission failed:', error);
    }
  };

  if (showConfirmation && isRegistered) {
    console.log('EventRegistrationForm - Showing confirmation dialog');
    return (
      <EventRegistrationConfirmation
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        registrationId={registrationId}
        eventTitle={eventTitle}
        eventDate={eventDate}
        eventTime={eventTime}
        eventLocation={eventLocation}
        formData={{
          name: formData.arabicName,
          email: formData.email,
          phone: formData.phone
        }}
      />
    );
  }

  console.log('EventRegistrationForm - Showing registration form');
  return (
    <RegistrationFormContainer
      eventTitle={eventTitle}
      eventPrice={eventPrice}
      eventDate={eventDate}
      eventTime={eventTime}
      eventLocation={eventLocation}
      onSubmit={handleFormSubmit}
    />
  );
};