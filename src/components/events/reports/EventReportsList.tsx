import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReportListContainer } from "./ReportListContainer";
import { ReportListHeader } from "./ReportListHeader";
import { ReportListItem } from "./ReportListItem";

interface EventReportsListProps {
  eventId: string;
}

export const EventReportsList = ({ eventId }: EventReportsListProps) => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ['event-reports', eventId],
    queryFn: async () => {
      console.log('Fetching reports for event:', eventId);
      const { data, error } = await supabase
        .from('event_reports')
        .select(`
          *,
          profiles:executor_id (
            id,
            email
          )
        `)
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reports:', error);
        throw error;
      }

      console.log('Reports fetched:', data);
      return data;
    },
  });

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <ReportListContainer>
      <ReportListHeader />
      {reports?.map((report) => (
        <ReportListItem key={report.id} report={report} />
      ))}
    </ReportListContainer>
  );
};