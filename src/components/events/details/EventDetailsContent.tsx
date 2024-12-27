import { EventInfo } from "../EventInfo";
import { EventDescription } from "../EventDescription";
import { EventRegisterButton } from "../EventRegisterButton";
import { getEventStatus } from "@/utils/eventUtils";
import { useEffect, useState } from "react";
import { EventType } from "@/types/event";

interface EventDetailsContentProps {
  event: EventType;
  onRegister: () => void;
}

export const EventDetailsContent = ({ event, onRegister }: EventDetailsContentProps) => {
  const [eventStatus, setEventStatus] = useState(() => getEventStatus({
    ...event,
    event_type: event.event_type || event.eventType || "in-person",
    beneficiary_type: event.beneficiary_type || event.beneficiaryType || "both",
    certificate_type: event.certificate_type || event.certificateType || "none",
    event_hours: event.event_hours || event.eventHours || 0,
    event_path: event.event_path || "environment",
    event_category: event.event_category || "social",
    max_attendees: event.max_attendees
  }));

  useEffect(() => {
    console.log('Event data in details content:', {
      title: event.title,
      date: event.date,
      registrationDates: {
        start: event.registrationStartDate || event.registration_start_date,
        end: event.registrationEndDate || event.registration_end_date
      },
      attendees: event.attendees,
      maxAttendees: event.max_attendees,
      eventPath: event.event_path,
      eventCategory: event.event_category
    });

    const newStatus = getEventStatus({
      ...event,
      event_type: event.event_type || event.eventType || "in-person",
      beneficiary_type: event.beneficiary_type || event.beneficiaryType || "both",
      certificate_type: event.certificate_type || event.certificateType || "none",
      event_hours: event.event_hours || event.eventHours || 0,
      event_path: event.event_path || "environment",
      event_category: event.event_category || "social",
      max_attendees: event.max_attendees
    });
    console.log('Event status updated to:', newStatus);
    setEventStatus(newStatus);
  }, [
    event.date, 
    event.registrationStartDate, 
    event.registrationEndDate,
    event.registration_start_date,
    event.registration_end_date,
    event.attendees,
    event.max_attendees
  ]);

  const handleRegister = () => {
    const status = getEventStatus({
      ...event,
      event_type: event.event_type || event.eventType || "in-person",
      beneficiary_type: event.beneficiary_type || event.beneficiaryType || "both",
      certificate_type: event.certificate_type || event.certificateType || "none",
      event_hours: event.event_hours || event.eventHours || 0,
      event_path: event.event_path || "environment",
      event_category: event.event_category || "social",
      max_attendees: event.max_attendees
    });
    console.log('Attempting registration with status:', status);
    
    if (status === 'available') {
      console.log('Registration allowed, proceeding...');
      onRegister();
    } else {
      console.log('Registration not allowed for status:', status);
    }
  };

  return (
    <div className="bg-white rounded-b-2xl shadow-sm">
      <div className="px-8 py-6">
        <EventInfo
          date={event.date}
          time={event.time}
          location={event.location}
          location_url={event.location_url}
          attendees={event.attendees}
          maxAttendees={event.max_attendees}
          eventType={event.event_type || event.eventType || "in-person"}
          price={event.price}
          beneficiaryType={event.beneficiary_type || event.beneficiaryType || "both"}
          certificateType={event.certificate_type || event.certificateType}
          eventHours={event.event_hours || event.eventHours}
          eventPath={event.event_path}
          eventCategory={event.event_category}
        />

        <div className="mt-8">
          <EventDescription description={event.description} />
        </div>

        <div className="mt-8">
          <EventRegisterButton 
            status={eventStatus}
            onRegister={handleRegister}
          />
        </div>
      </div>
    </div>
  );
};