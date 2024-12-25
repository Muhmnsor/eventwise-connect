import { Button } from "@/components/ui/button";
import { EventsSection } from "@/components/events/EventsSection";
import { useEffect } from "react";

interface EventsTabsProps {
  events: any[];
  upcomingEvents: any[];
  pastEvents: any[];
  activeTab: "all" | "upcoming" | "past";
  setActiveTab: (tab: "all" | "upcoming" | "past") => void;
  registrations: { [key: string]: number };
}

export const EventsTabs = ({ 
  events, 
  upcomingEvents, 
  pastEvents, 
  activeTab, 
  setActiveTab,
  registrations 
}: EventsTabsProps) => {
  // Set upcoming events as default tab on component mount
  useEffect(() => {
    setActiveTab("upcoming");
  }, []);

  const getTitle = (tab: "all" | "upcoming" | "past") => {
    switch (tab) {
      case "all":
        return "جميع الفعاليات";
      case "upcoming":
        return "الفعاليات القادمة";
      case "past":
        return "الفعاليات السابقة";
    }
  };

  return (
    <div className="container mx-auto px-4" dir="rtl">
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={activeTab === "upcoming" ? "default" : "outline"}
          onClick={() => setActiveTab("upcoming")}
        >
          الفعاليات القادمة
        </Button>
        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          onClick={() => setActiveTab("all")}
        >
          جميع الفعاليات
        </Button>
        <Button
          variant={activeTab === "past" ? "default" : "outline"}
          onClick={() => setActiveTab("past")}
        >
          الفعاليات السابقة
        </Button>
      </div>

      <EventsSection
        title={getTitle(activeTab)}
        events={activeTab === "all" ? events : activeTab === "upcoming" ? upcomingEvents : pastEvents}
        registrations={registrations}
        isPastEvents={activeTab === "past"}
      />
    </div>
  );
};