import { EventDetails } from "./details/EventDetails";
import { EventBadges } from "./badges/EventBadges";
import { BeneficiaryType } from "@/types/event";

interface EventInfoProps {
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  location_url?: string;
  attendees: number;
  maxAttendees: number;
  eventType: "online" | "in-person";
  price?: number | null;
  beneficiaryType?: BeneficiaryType;
  certificateType?: string;
  eventHours?: number | null;
  eventPath?: string;
  eventCategory?: string;
  showBadges?: boolean;
  isProject?: boolean;
}

export const EventInfo = ({
  date,
  endDate,
  time,
  location,
  location_url,
  attendees,
  maxAttendees,
  eventType,
  price,
  beneficiaryType,
  certificateType,
  eventHours,
  eventPath,
  eventCategory,
  showBadges = false,
  isProject = false
}: EventInfoProps) => {
  return (
    <div className="space-y-8">
      <EventDetails
        date={date}
        endDate={endDate}
        time={time}
        location={location}
        location_url={location_url}
        eventType={eventType}
        attendees={attendees}
        maxAttendees={maxAttendees}
        eventPath={eventPath}
        eventCategory={eventCategory}
        isProject={isProject}
      />

      {showBadges && (
        <EventBadges
          eventType={eventType}
          price={price}
          beneficiaryType={beneficiaryType || 'both'}
          certificateType={certificateType}
          eventHours={eventHours}
        />
      )}
    </div>
  );
};