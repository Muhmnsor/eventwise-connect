import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButton } from "./ShareButton";

interface EventActionsProps {
  onShare: () => Promise<void>;
  onAddToCalendar: () => void;
  eventTitle?: string;
  eventDescription?: string;
}

export const EventActions = ({ 
  onAddToCalendar, 
  eventTitle,
  eventDescription 
}: EventActionsProps) => {
  return (
    <div className="flex gap-2">
      <ShareButton 
        title={eventTitle}
        text={eventDescription}
        url={window.location.href}
      />
      <Button variant="outline" size="icon" onClick={onAddToCalendar}>
        <CalendarPlus className="h-4 w-4" />
      </Button>
    </div>
  );
};