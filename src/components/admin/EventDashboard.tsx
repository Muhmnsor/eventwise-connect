import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { DashboardStats } from "./DashboardStats";
import { ExportButton } from "./ExportButton";
import { RegistrationsTable } from "./RegistrationsTable";
import { Registration } from "./types";

export const EventDashboard = ({ eventId }: { eventId: string }) => {
  const [isExporting, setIsExporting] = useState(false);

  // Fetch event details
  const { data: event, isLoading: eventLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      console.log('Fetching event details for dashboard:', eventId);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) {
        console.error('Error fetching event:', error);
        throw error;
      }
      return data;
    }
  });

  // Fetch registrations
  const { data: registrations = [], isLoading: registrationsLoading } = useQuery({
    queryKey: ['registrations', eventId],
    queryFn: async () => {
      console.log('Fetching registrations for event:', eventId);
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('event_id', eventId);

      if (error) {
        console.error('Error fetching registrations:', error);
        throw error;
      }
      
      // Ensure we always return an array
      return (data || []) as Registration[];
    }
  });

  const exportToExcel = async () => {
    if (!registrations?.length) {
      toast.error("لا يوجد بيانات للتصدير");
      return;
    }
    
    setIsExporting(true);
    try {
      const exportData = registrations.map(reg => ({
        'رقم التسجيل': reg.registration_number,
        'الاسم': reg.name,
        'البريد الإلكتروني': reg.email,
        'رقم الجوال': reg.phone,
        'تاريخ التسجيل': new Date(reg.created_at).toLocaleString('ar-SA')
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "المسجلين");
      
      const fileName = `المسجلين-${event?.title}-${new Date().toLocaleDateString('ar-SA')}.xlsx`;
      
      XLSX.writeFile(wb, fileName);
      toast.success("تم تصدير البيانات بنجاح");
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error("حدث خطأ أثناء تصدير البيانات");
    } finally {
      setIsExporting(false);
    }
  };

  if (eventLoading || registrationsLoading) {
    return <div className="text-center p-8">جاري التحميل...</div>;
  }

  if (!event) {
    return <div className="text-center p-8">لم يتم العثور على الفعالية</div>;
  }

  const registrationCount = registrations?.length || 0;
  const remainingSeats = event.max_attendees - registrationCount;
  const occupancyRate = (registrationCount / event.max_attendees) * 100;

  return (
    <div className="space-y-6">
      <DashboardStats
        registrationCount={registrationCount}
        remainingSeats={remainingSeats}
        occupancyRate={occupancyRate}
        eventDate={event.date}
        eventTime={event.time}
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>قائمة المسجلين</CardTitle>
          <ExportButton
            onClick={exportToExcel}
            isExporting={isExporting}
            disabled={!registrations?.length}
          />
        </CardHeader>
        <CardContent>
          <RegistrationsTable registrations={registrations} />
        </CardContent>
      </Card>
    </div>
  );
};