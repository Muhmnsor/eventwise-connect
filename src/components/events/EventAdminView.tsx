import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventDetailsView } from "./EventDetailsView";
import { EventDashboard } from "@/components/admin/EventDashboard";
import { Event } from "@/store/eventStore";

interface EventAdminViewProps {
  event: Event & { attendees: number };
  onEdit: () => void;
  onDelete: () => void;
  onAddToCalendar: () => void;
  onRegister: () => void;
  id: string;
}

export const EventAdminView = ({
  event,
  onEdit,
  onDelete,
  onAddToCalendar,
  onRegister,
  id
}: EventAdminViewProps) => {
  return (
    <Tabs defaultValue="details" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="details">تفاصيل الفعالية</TabsTrigger>
        <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <EventDetailsView
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToCalendar={onAddToCalendar}
          onRegister={onRegister}
        />
      </TabsContent>
      <TabsContent value="dashboard">
        <EventDashboard eventId={id} />
      </TabsContent>
    </Tabs>
  );
};