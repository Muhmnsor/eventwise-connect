import { RegistrationStatsCard } from "./RegistrationStatsCard";
import { PathCategoryCard } from "./PathCategoryCard";
import { ActivitiesStatsCard } from "./ActivitiesStatsCard";
import { AttendanceAverageCard } from "./AttendanceAverageCard";
import { ActivityAttendanceCard } from "./ActivityAttendanceCard";
import { ActivityRatingCard } from "./ActivityRatingCard";

interface DashboardStatsContentProps {
  registrationCount: number;
  remainingSeats: number;
  occupancyRate: number;
  project: {
    id: string;
  };
  activities: {
    total: number;
    completed: number;
    averageAttendance: number;
  };
  attendanceStats: {
    highest: any;
    lowest: any;
  } | undefined;
  ratingStats: {
    highest: any;
    lowest: any;
  } | undefined;
  isEvent?: boolean;
}

export const DashboardStatsContent = ({
  registrationCount,
  remainingSeats,
  occupancyRate,
  project,
  activities,
  attendanceStats,
  ratingStats,
  isEvent = false
}: DashboardStatsContentProps) => {
  console.log("DashboardStatsContent props:", {
    activities,
    attendanceStats,
    ratingStats
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <RegistrationStatsCard
        registrationCount={registrationCount}
        remainingSeats={remainingSeats}
        occupancyRate={occupancyRate}
      />
      
      <PathCategoryCard projectId={project.id} />

      {!isEvent && (
        <>
          <ActivitiesStatsCard
            activities={{
              total: activities.total,
              completed: activities.completed
            }}
          />
          <AttendanceAverageCard
            averageAttendance={activities.averageAttendance}
          />
          <ActivityAttendanceCard
            type="highest"
            title="أعلى نسبة حضور"
            activity={attendanceStats?.highest}
          />
          <ActivityAttendanceCard
            type="lowest"
            title="أقل نسبة حضور"
            activity={attendanceStats?.lowest}
          />
          <ActivityRatingCard
            type="highest"
            title="أعلى نشاط تقييماً"
            activity={ratingStats?.highest}
          />
          <ActivityRatingCard
            type="lowest"
            title="أقل نشاط تقييماً"
            activity={ratingStats?.lowest}
          />
        </>
      )}
    </div>
  );
};