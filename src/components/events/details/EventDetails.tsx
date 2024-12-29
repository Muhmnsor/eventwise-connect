import { CalendarDays, Clock, MapPin, Monitor, Users, Tag } from "lucide-react";
import { formatTime12Hour, formatDateWithDay } from "@/utils/dateTimeUtils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EventDetailsProps {
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  location_url?: string;
  eventType: "online" | "in-person";
  attendees: number | Array<any>;
  maxAttendees: number;
  eventPath?: string;
  eventCategory?: string;
  isProject?: boolean;
}

export const EventDetails = ({
  date,
  endDate,
  time,
  location,
  location_url,
  eventType,
  attendees,
  maxAttendees = 0,
  eventPath,
  eventCategory,
  isProject = false
}: EventDetailsProps) => {
  const eventId = window.location.pathname.split('/').pop();
  
  const { data: registrations } = useQuery({
    queryKey: ['registrations', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq(isProject ? 'project_id' : 'event_id', eventId);

      if (error) {
        console.error('Error fetching registrations:', error);
        return [];
      }

      return data;
    },
    enabled: !!eventId
  });

  const attendeesCount = registrations?.length || 0;
  
  const formattedStartDate = formatDateWithDay(date);
  const formattedEndDate = endDate ? formatDateWithDay(endDate) : null;
  const formattedTime = time ? formatTime12Hour(time) : null;

  const handleCopyLocation = async () => {
    if (location_url) {
      try {
        await navigator.clipboard.writeText(location_url);
        toast.success("تم نسخ رابط الموقع");
      } catch (err) {
        toast.error("حدث خطأ أثناء نسخ الرابط");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center">
          <CalendarDays className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-[#1A1F2C]">{formattedStartDate}</span>
          {isProject && formattedEndDate && (
            <span className="text-sm text-gray-500">حتى {formattedEndDate}</span>
          )}
        </div>
      </div>
      
      {!isProject && time && (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <span className="text-[#1A1F2C]">{formattedTime}</span>
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center">
          {eventType === "online" ? (
            <Monitor className="h-5 w-5 text-primary" />
          ) : (
            <MapPin className="h-5 w-5 text-primary" />
          )}
        </div>
        <span className="text-[#1A1F2C]">{location}</span>
      </div>
      
      {location_url && (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={location_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              رابط تطبيقات الخرائط
            </a>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopyLocation}
              className="text-xs"
            >
              نسخ الرابط
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <span className="text-[#1A1F2C]" dir="rtl">
          {`${attendeesCount} من ${maxAttendees} مشارك`}
        </span>
      </div>
      
      {eventPath && eventCategory && (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          <span className="text-[#1A1F2C]" dir="rtl">
            {eventPath} - {eventCategory}
          </span>
        </div>
      )}
    </div>
  );
};