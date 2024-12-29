import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "../DashboardOverview";
import { DashboardRegistrations } from "../DashboardRegistrations";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReportsTab } from "./ReportsTab";
import { ProjectEventsTab } from "@/components/projects/dashboard/ProjectEventsTab";

interface ProjectDashboardTabsProps {
  project: {
    id: string;
    max_attendees: number;
    start_date: string;
    end_date: string;
    event_path?: string;
    event_category?: string;
  };
}

export const ProjectDashboardTabs = ({ project }: ProjectDashboardTabsProps) => {
  console.log("ProjectDashboardTabs - project:", project);

  // Fetch registrations count
  const { data: registrations = [] } = useQuery({
    queryKey: ['project-registrations', project.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('project_id', project.id);

      if (error) throw error;
      return data || [];
    },
  });

  // Fetch project events
  const { data: projectEvents = [], refetch: refetchEvents } = useQuery({
    queryKey: ['project-events', project.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_events')
        .select(`
          *,
          event:events (
            id,
            title,
            description,
            date,
            time,
            location,
            location_url,
            special_requirements,
            event_type,
            max_attendees,
            image_url,
            beneficiary_type,
            certificate_type,
            event_hours,
            price,
            registration_start_date,
            registration_end_date,
            event_path,
            event_category
          )
        `)
        .eq('project_id', project.id)
        .order('event_order', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  // Calculate dashboard metrics
  const registrationCount = registrations.length;
  const remainingSeats = project.max_attendees - registrationCount;
  const occupancyRate = (registrationCount / project.max_attendees) * 100;

  return (
    <Tabs defaultValue="overview" dir="rtl" className="w-full space-y-6">
      <TabsList className="w-full grid grid-cols-4 bg-secondary/20 p-1 rounded-xl">
        <TabsTrigger 
          value="overview" 
          className="data-[state=active]:bg-white"
        >
          نظرة عامة
        </TabsTrigger>
        <TabsTrigger 
          value="registrations"
          className="data-[state=active]:bg-white"
        >
          المسجلين
        </TabsTrigger>
        <TabsTrigger 
          value="events"
          className="data-[state=active]:bg-white"
        >
          الفعاليات والأنشطة
        </TabsTrigger>
        <TabsTrigger 
          value="reports"
          className="data-[state=active]:bg-white"
        >
          التقارير
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        <DashboardOverview
          registrationCount={registrationCount}
          remainingSeats={remainingSeats}
          occupancyRate={occupancyRate}
          eventDate={project.start_date}
          eventTime={project.end_date}
          eventPath={project.event_path}
          eventCategory={project.event_category}
        />
      </TabsContent>

      <TabsContent value="registrations" className="mt-6">
        <DashboardRegistrations eventId={project.id} />
      </TabsContent>

      <TabsContent value="events" className="mt-6">
        <ProjectEventsTab
          project={project}
          projectEvents={projectEvents}
          refetchEvents={refetchEvents}
        />
      </TabsContent>

      <TabsContent value="reports" className="mt-6">
        <ReportsTab eventId={project.id} />
      </TabsContent>
    </Tabs>
  );
};