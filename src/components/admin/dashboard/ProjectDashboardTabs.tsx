import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "../DashboardOverview";
import { DashboardRegistrations } from "../DashboardRegistrations";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

  // Calculate dashboard metrics
  const registrationCount = registrations.length;
  const remainingSeats = project.max_attendees - registrationCount;
  const occupancyRate = (registrationCount / project.max_attendees) * 100;

  return (
    <Tabs defaultValue="overview" dir="rtl" className="w-full space-y-6">
      <TabsList className="w-full justify-start bg-secondary/20 p-1 rounded-xl">
        <TabsTrigger 
          value="overview" 
          className="flex-1 max-w-[200px] data-[state=active]:bg-white"
        >
          نظرة عامة
        </TabsTrigger>
        <TabsTrigger 
          value="registrations"
          className="flex-1 max-w-[200px] data-[state=active]:bg-white"
        >
          المسجلين
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
    </Tabs>
  );
};