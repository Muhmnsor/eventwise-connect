import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationsTable } from "./RegistrationsTable";
import { Card } from "@/components/ui/card";
import { AttendanceStats } from "./attendance/AttendanceStats";

interface DashboardRegistrationsProps {
  eventId: string;
}

export const DashboardRegistrations = ({ eventId }: DashboardRegistrationsProps) => {
  console.log("DashboardRegistrations - eventId:", eventId);

  const { data: registrations = [], refetch: refetchRegistrations } = useQuery({
    queryKey: ['event-registrations', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          attendance_records(*)
        `)
        .eq('event_id', eventId);

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="space-y-6">
      <AttendanceStats registrations={registrations} />
      <Card>
        <RegistrationsTable 
          registrations={registrations} 
          eventId={eventId}
          onAttendanceChange={refetchRegistrations}
        />
      </Card>
    </div>
  );
};