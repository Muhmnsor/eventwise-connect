import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/home/Hero";
import { EventsTabs } from "@/components/home/EventsTabs";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");

  const { data: events = [], isError: isEventsError } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        console.log("Fetching events from Supabase...");
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true });

        if (eventsError) {
          console.error("Supabase error fetching events:", eventsError);
          throw eventsError;
        }

        console.log("Events fetched successfully, count:", eventsData?.length);
        return eventsData || [];
      } catch (error) {
        console.error("Error in events query:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      onError: (error: Error) => {
        console.error("Query error loading events:", error);
        toast.error("حدث خطأ في تحميل الفعاليات");
      }
    }
  });

  const { data: registrations = {}, isError: isRegistrationsError } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      try {
        console.log("Fetching registrations from Supabase...");
        const { data: registrationsData, error: registrationsError } = await supabase
          .from("registrations")
          .select("event_id");

        if (registrationsError) {
          console.error("Supabase error fetching registrations:", registrationsError);
          throw registrationsError;
        }

        console.log("Registrations fetched successfully, count:", registrationsData?.length);
        
        const registrationCounts = (registrationsData || []).reduce((acc: { [key: string]: number }, registration) => {
          if (registration.event_id) {
            acc[registration.event_id] = (acc[registration.event_id] || 0) + 1;
          }
          return acc;
        }, {});

        console.log("Processed registration counts:", registrationCounts);
        return registrationCounts;
      } catch (error) {
        console.error("Error in registrations query:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    meta: {
      onError: (error: Error) => {
        console.error("Query error loading registrations:", error);
        toast.error("حدث خطأ في تحميل التسجيلات");
      }
    }
  });

  const now = new Date();
  const upcomingEvents = events.filter((event: any) => {
    const eventDate = new Date(event.date);
    return eventDate >= now;
  });

  const pastEvents = events.filter((event: any) => {
    const eventDate = new Date(event.date);
    return eventDate < now;
  });

  useEffect(() => {
    console.log("Current state:", {
      eventsCount: events.length,
      registrationsCount: Object.keys(registrations).length,
      upcomingEventsCount: upcomingEvents.length,
      pastEventsCount: pastEvents.length,
      isEventsError,
      isRegistrationsError
    });
  }, [events, registrations, upcomingEvents, pastEvents, isEventsError, isRegistrationsError]);

  return (
    <div className="min-h-screen">
      <Hero />
      <EventsTabs
        events={events}
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        registrations={registrations}
      />
    </div>
  );
};

export default Index;