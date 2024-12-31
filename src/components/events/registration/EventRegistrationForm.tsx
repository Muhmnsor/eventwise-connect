import { RegistrationFormContainer } from "./RegistrationFormContainer";
import { RegistrationConfirmation } from "@/components/events/RegistrationConfirmation";
import { useRegistration } from "./hooks/useRegistration";
import { useQueryClient } from "@tanstack/react-query";

interface EventRegistrationFormProps {
  eventTitle: string;
  eventPrice: number | "free" | null;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  onSubmit: () => void;
  isProject?: boolean;
}

export const EventRegistrationForm = ({
  eventTitle,
  eventPrice,
  eventDate,
  eventTime,
  eventLocation,
  onSubmit,
  isProject = false
}: EventRegistrationFormProps) => {
  const queryClient = useQueryClient();
  
  const {
    formData,
    showConfirmation,
    setShowConfirmation,
    registrationId,
    isRegistered,
    handleSubmit
  } = useRegistration(() => {
    console.log('Registration successful, calling onSubmit callback');
    queryClient.invalidateQueries({ queryKey: ['registrations'] });
    if (onSubmit) {
      onSubmit();
    }
  }, isProject);

  console.log('Registration state:', {
    showConfirmation,
    isRegistered,
    registrationId,
    formData
  });

  if (isRegistered && showConfirmation) {
    console.log('Showing confirmation dialog');
    // Transform formData to match RegistrationConfirmation expectations
    const confirmationFormData = {
      name: formData.arabicName,
      email: formData.email,
      phone: formData.phone
    };

    return (
      <RegistrationConfirmation
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        registrationId={registrationId}
        eventTitle={eventTitle}
        eventPrice={eventPrice}
        eventDate={eventDate}
        eventTime={eventTime}
        eventLocation={eventLocation}
        formData={confirmationFormData}
        isProjectActivity={isProject}
        onPayment={() => {}}
      />
    );
  }

  return (
    <RegistrationFormContainer
      eventTitle={eventTitle}
      eventPrice={eventPrice}
      eventDate={eventDate}
      eventTime={eventTime}
      eventLocation={eventLocation}
      onSubmit={handleSubmit}
      isProject={isProject}
    />
  );
};