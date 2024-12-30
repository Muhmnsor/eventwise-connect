import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardOverview } from "@/components/admin/DashboardOverview";

interface DashboardOverviewTabProps {
  registrationCount: number;
  remainingSeats: number;
  occupancyRate: number;
  project: {
    start_date: string;
    end_date: string;
    event_path?: string;
    event_category?: string;
    id: string;
  };
}

export const DashboardOverviewTab = ({
  registrationCount,
  remainingSeats,
  occupancyRate,
  project,
}: DashboardOverviewTabProps) => {
  // جلب أنشطة المشروع مع بيانات الحضور والتقييم
  const { data: projectActivities = [] } = useQuery({
    queryKey: ['project-activities-stats', project.id],
    queryFn: async () => {
      console.log('Fetching project activities stats for project:', project.id);
      
      // جلب الأنشطة
      const { data: activities, error: activitiesError } = await supabase
        .from('events')
        .select(`
          id,
          title,
          attendance_records(status),
          event_feedback(overall_rating)
        `)
        .eq('project_id', project.id)
        .eq('is_project_activity', true)
        .order('created_at', { ascending: true });

      if (activitiesError) {
        console.error('Error fetching activities:', activitiesError);
        throw activitiesError;
      }

      console.log('Raw activities data:', activities);

      // حساب الإحصائيات لكل نشاط
      const activitiesWithStats = activities.map(activity => {
        const totalAttendees = activity.attendance_records?.length || 0;
        const presentAttendees = activity.attendance_records?.filter(
          (record: any) => record.status === 'present'
        ).length || 0;
        
        const attendanceRate = totalAttendees > 0 
          ? (presentAttendees / totalAttendees) * 100 
          : 0;

        const ratings = activity.event_feedback?.map((f: any) => f.overall_rating).filter(Boolean) || [];
        const averageRating = ratings.length > 0 
          ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length 
          : 0;

        return {
          id: activity.id,
          title: activity.title,
          attendanceRate,
          rating: averageRating
        };
      });

      console.log('Activities with calculated stats:', activitiesWithStats);
      return activitiesWithStats;
    }
  });

  const totalActivities = projectActivities.length;
  const completedActivities = projectActivities.filter(
    activity => activity.attendanceRate > 0
  ).length;
  
  const averageAttendanceRate = projectActivities.length > 0
    ? projectActivities.reduce((sum, activity) => sum + (activity.attendanceRate || 0), 0) / projectActivities.length
    : 0;

  console.log('Dashboard stats:', {
    totalActivities,
    completedActivities,
    averageAttendanceRate,
    projectActivities
  });

  return (
    <DashboardOverview
      registrationCount={registrationCount}
      remainingSeats={remainingSeats}
      occupancyRate={occupancyRate}
      eventDate={project.start_date}
      eventTime={project.end_date}
      eventPath={project.event_path}
      eventCategory={project.event_category}
      projectId={project.id}
      projectActivities={projectActivities}
      totalActivities={totalActivities}
      completedActivities={completedActivities}
      averageAttendanceRate={averageAttendanceRate}
    />
  );
};