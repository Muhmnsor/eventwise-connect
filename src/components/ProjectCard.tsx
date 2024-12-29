import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { EventCardBadges } from "./events/cards/EventCardBadges";
import { ProjectCardStatus } from "./projects/cards/ProjectCardStatus";
import { ProjectCardDetails } from "./projects/cards/ProjectCardDetails";
import { BeneficiaryType } from "@/types/event";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  image_url: string;
  event_type: "online" | "in-person";
  price: number | "free";
  beneficiary_type: BeneficiaryType;
  certificate_type?: string;
  event_hours?: number;
  max_attendees: number;
  attendees: number;
  registration_start_date?: string;
  registration_end_date?: string;
}

export const ProjectCard = ({
  id,
  title,
  description,
  start_date,
  end_date,
  image_url,
  event_type,
  price,
  beneficiary_type,
  certificate_type,
  event_hours,
  max_attendees,
  attendees,
  registration_start_date,
  registration_end_date,
}: ProjectCardProps) => {
  const getProjectStatus = () => {
    const now = new Date();
    const endDate = new Date(end_date);
    const regStartDate = registration_start_date ? new Date(registration_start_date) : null;
    const regEndDate = registration_end_date ? new Date(registration_end_date) : null;

    if (endDate < now) return "ended";
    if (attendees >= max_attendees) return "full";
    if (regStartDate && now < regStartDate) return "notStarted";
    if (regEndDate && now > regEndDate) return "ended";
    return "available";
  };

  return (
    <Link to={`/projects/${id}`}>
      <Card className="w-full max-w-sm mx-auto overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative">
          <img
            src={image_url || "/placeholder.svg"}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <ProjectCardStatus 
            status={getProjectStatus()}
            className="absolute top-4 left-4"
          />
        </div>

        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-right">{title}</h3>
          <p className="text-gray-600 mb-4 text-right line-clamp-2">{description}</p>

          <EventCardBadges
            eventType={event_type}
            price={typeof price === "number" ? price : 0}
            beneficiaryType={beneficiary_type}
            certificateType={certificate_type}
            eventHours={event_hours}
          />
        </CardContent>

        <CardFooter className="bg-gray-50 p-4">
          <ProjectCardDetails
            start_date={start_date}
            end_date={end_date}
            attendees={attendees}
            maxAttendees={max_attendees}
          />
        </CardFooter>
      </Card>
    </Link>
  );
};