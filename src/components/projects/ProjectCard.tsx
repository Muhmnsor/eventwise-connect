import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProjectCardContent } from "./cards/ProjectCardContent";
import { useEffect } from "react"; // Added import for useEffect

interface ProjectCardProps {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  location?: string;
  image_url: string;
  event_type: "online" | "in-person";
  price: number | null;
  max_attendees?: number;
  registration_start_date?: string | null;
  registration_end_date?: string | null;
  beneficiary_type: string;
  certificate_type?: string;
  event_path?: string;
  event_category?: string;
}

export const ProjectCard = ({ 
  id, 
  title, 
  start_date,
  end_date,
  image_url, 
  event_type, 
  price,
  max_attendees = 0,
  registration_start_date,
  registration_end_date,
  beneficiary_type,
  certificate_type = 'none',
  event_path,
  event_category
}: ProjectCardProps) => {
  
  useEffect(() => {
    console.log('ProjectCard data:', {
      title,
      dates: {
        start: start_date,
        end: end_date
      },
      certificate: {
        type: certificate_type
      },
      max_attendees,
      registrationDates: {
        start: registration_start_date,
        end: registration_end_date
      },
      beneficiaryType: beneficiary_type,
      eventPath: event_path,
      eventCategory: event_category
    });
  }, [title, start_date, end_date, certificate_type, max_attendees, registration_start_date, registration_end_date, beneficiary_type, event_path, event_category]);

  return (
    <div className="w-[380px] sm:w-[460px] lg:w-[480px] mx-auto" dir="rtl">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in h-full">
        <img src={image_url} alt={title} className="w-full h-40 object-cover" />
        <CardHeader className="p-4">
          <CardTitle className="text-lg line-clamp-2 text-right">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectCardContent
            startDate={start_date}
            endDate={end_date}
            eventType={event_type}
            price={price}
            beneficiaryType={beneficiary_type}
            certificateType={certificate_type}
            maxAttendees={max_attendees}
            eventPath={event_path}
            eventCategory={event_category}
          />
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full" size="sm">
            <Link to={`/projects/${id}`}>عرض التفاصيل</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};