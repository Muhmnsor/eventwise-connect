import { useParams, useNavigate } from "react-router-dom";
import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { EventLoadingState } from "@/components/events/EventLoadingState";
import { EventNotFound } from "@/components/events/EventNotFound";
import { EventDetailsView } from "@/components/events/EventDetailsView";
import { EventAdminTabs } from "@/components/events/admin/EventAdminTabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      console.log("Fetching event details for id:", id);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      console.log("Event data fetched:", data);
      return data;
    },
  });

  const handleEdit = () => {
    navigate(`/event/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("تم حذف الفعالية بنجاح");
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("حدث خطأ أثناء حذف الفعالية");
    }
  };

  const handleAddToCalendar = () => {
    toast.success("تمت إضافة الفعالية إلى التقويم");
  };

  const handleRegister = () => {
    toast.success("تم التسجيل في الفعالية");
  };

  if (isLoading) return <EventLoadingState />;
  if (!event) return <EventNotFound />;

  return (
    <div className="min-h-screen" dir="rtl">
      <TopHeader />
      <div className="container mx-auto px-4 py-8">
        {user?.isAdmin ? (
          <EventAdminTabs 
            event={event}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddToCalendar={handleAddToCalendar}
            onRegister={handleRegister}
            id={id || ''}
            canAddReport={true}
            onAddReport={() => {}}
          />
        ) : (
          <EventDetailsView 
            event={event}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddToCalendar={handleAddToCalendar}
            onRegister={handleRegister}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;