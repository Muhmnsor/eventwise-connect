import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EventDeletionHandlerProps {
  eventId: string;
  onSuccess: () => void;
}

export const handleEventDeletion = async ({ eventId, onSuccess }: EventDeletionHandlerProps) => {
  try {
    console.log('Starting deletion process for event:', eventId);
    
    // Delete event_feedback records first
    console.log('Deleting event feedback records...');
    const { error: feedbackError } = await supabase
      .from('event_feedback')
      .delete()
      .eq('event_id', eventId);
    
    if (feedbackError) {
      console.error('Error deleting feedback:', feedbackError);
      throw feedbackError;
    }

    // Delete attendance records
    console.log('Deleting attendance records...');
    const { error: attendanceError } = await supabase
      .from('attendance_records')
      .delete()
      .eq('event_id', eventId);
    
    if (attendanceError) {
      console.error('Error deleting attendance:', attendanceError);
      throw attendanceError;
    }

    // Delete notification logs
    console.log('Deleting notification logs...');
    const { error: notificationError } = await supabase
      .from('notification_logs')
      .delete()
      .eq('event_id', eventId);
    
    if (notificationError) {
      console.error('Error deleting notifications:', notificationError);
      throw notificationError;
    }

    // Delete notification settings
    console.log('Deleting notification settings...');
    const { error: settingsError } = await supabase
      .from('event_notification_settings')
      .delete()
      .eq('event_id', eventId);
    
    if (settingsError) {
      console.error('Error deleting notification settings:', settingsError);
      throw settingsError;
    }

    // Delete event reports
    console.log('Deleting event reports...');
    const { error: reportsError } = await supabase
      .from('event_reports')
      .delete()
      .eq('event_id', eventId);
    
    if (reportsError) {
      console.error('Error deleting reports:', reportsError);
      throw reportsError;
    }

    // Delete registrations
    console.log('Deleting registrations...');
    const { error: registrationsError } = await supabase
      .from('registrations')
      .delete()
      .eq('event_id', eventId);
    
    if (registrationsError) {
      console.error('Error deleting registrations:', registrationsError);
      throw registrationsError;
    }

    // Finally delete the event itself
    console.log('Deleting event...');
    const { error: eventError } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);
    
    if (eventError) {
      console.error('Error deleting event:', eventError);
      throw eventError;
    }

    console.log('Event and related records deleted successfully');
    toast.success("تم حذف الفعالية بنجاح");
    onSuccess();
  } catch (error) {
    console.error('Error in deletion process:', error);
    toast.error("حدث خطأ أثناء حذف الفعالية");
    throw error;
  }
};