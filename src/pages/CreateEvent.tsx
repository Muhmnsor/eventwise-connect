import { useNavigate, useParams } from "react-router-dom";
import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { EventFormFields } from "@/components/events/EventFormFields";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Event } from "@/store/eventStore";
import { EventFormActions } from "@/components/events/form/EventFormActions";
import { handleImageUpload } from "@/components/events/form/EventImageUpload";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Event>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    certificateType: "none",
    eventHours: 0,
    price: "free",
    maxAttendees: 0,
    beneficiaryType: "both",
    eventType: "in-person",
    attendees: 0,
    imageUrl: "",
    registrationStartDate: "",
    registrationEndDate: ""
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        console.log('Fetching event data for editing, ID:', id);
        const { data: event, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        console.log('Fetched event data:', event);
        
        if (event) {
          setFormData({
            title: event.title || "",
            description: event.description || "",
            date: event.date || "",
            time: event.time || "",
            location: event.location || "",
            certificateType: event.certificate_type || "none",
            eventHours: event.event_hours || 0,
            price: event.price || "free",
            maxAttendees: event.max_attendees || 0,
            beneficiaryType: event.beneficiary_type || "both",
            eventType: event.event_type || "in-person",
            attendees: 0,
            imageUrl: event.image_url || "",
            registrationStartDate: event.registration_start_date || "",
            registrationEndDate: event.registration_end_date || ""
          });
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error("حدث خطأ أثناء جلب بيانات الفعالية");
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    
    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        certificate_type: formData.certificateType,
        event_hours: formData.eventHours,
        price: formData.price === "free" ? null : formData.price,
        max_attendees: formData.maxAttendees,
        beneficiary_type: formData.beneficiaryType,
        event_type: formData.eventType,
        image_url: formData.imageUrl,
        registration_start_date: formData.registrationStartDate,
        registration_end_date: formData.registrationEndDate
      };

      let result;
      
      if (isEditMode) {
        console.log('Updating event with ID:', id);
        result = await supabase
          .from("events")
          .update(eventData)
          .eq("id", id);
      } else {
        console.log('Creating new event');
        result = await supabase
          .from("events")
          .insert([eventData]);
      }

      if (result.error) throw result.error;

      toast.success(isEditMode ? "تم تحديث الفعالية بنجاح" : "تم إنشاء الفعالية بنجاح");
      navigate("/");
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error(isEditMode ? "حدث خطأ أثناء تحديث الفعالية" : "حدث خطأ أثناء إنشاء الفعالية");
    }
  };

  const handleImageChange = async (file: File) => {
    await handleImageUpload(file, setIsUploading, setFormData);
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <TopHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {isEditMode ? "تعديل الفعالية" : "إنشاء فعالية جديدة"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <EventFormFields 
            formData={formData} 
            setFormData={setFormData}
            onImageChange={handleImageChange}
          />
          <EventFormActions 
            isUploading={isUploading}
            onCancel={() => navigate("/")}
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;