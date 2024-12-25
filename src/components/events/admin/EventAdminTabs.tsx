import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventDetailsView } from "../EventDetailsView";
import { EventDashboard } from "@/components/admin/EventDashboard";
import { Event } from "@/store/eventStore";
import { AddReportButton } from "./AddReportButton";

interface EventAdminTabsProps {
  event: Event & { attendees: number };
  onEdit: () => void;
  onDelete: () => void;
  onAddToCalendar: () => void;
  onRegister: () => void;
  id: string;
  canAddReport: boolean;
  onAddReport: () => void;
}

export const EventAdminTabs = ({
  event,
  onEdit,
  onDelete,
  onAddToCalendar,
  onRegister,
  id,
  canAddReport,
  onAddReport
}: EventAdminTabsProps) => {
  console.log('EventAdminTabs - canAddReport:', canAddReport);
  
  return (
    <Tabs defaultValue="details" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="details">تفاصيل الفعالية</TabsTrigger>
        <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <div className="space-y-4">
          {canAddReport && <AddReportButton onClick={onAddReport} />}
          <EventDetailsView
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddToCalendar={onAddToCalendar}
            onRegister={onRegister}
          />
        </div>
      </TabsContent>
      <TabsContent value="dashboard">
        <EventDashboard eventId={id} />
      </TabsContent>
    </Tabs>
  );
};