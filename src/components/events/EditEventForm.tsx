import { Event as CustomEvent } from "@/store/eventStore";
import { EventFormFields } from "./EventFormFields";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { EventFormActions } from "./form/EventFormActions";
import { handleImageUpload } from "./form/EventImageUpload";
import { supabase } from "@/integrations/supabase/client";

interface EditEventFormProps {
  event: CustomEvent;
  onSave: (updatedEvent: CustomEvent) => void;
  onCancel: () => void;
}

export const EditEventForm = ({ event, onSave, onCancel }: EditEventFormProps) => {
  console.log('Initial event data in EditEventForm:', event);
  
  const [formData, setFormData] = useState<CustomEvent>({
    id: event.id,
    title: event.title || '',
    description: event.description || '',
    date: event.date || '',
    time: event.time || '',
    location: event.location || '',
    certificate_type: event.certificate_type || 'none',
    certificateType: event.certificateType || 'none',
    event_hours: event.event_hours || 0,
    eventHours: event.eventHours || 0,
    price: event.price || 'free',
    max_attendees: event.max_attendees || 0,
    beneficiaryType: event.beneficiary_type || 'both',
    event_type: event.event_type || 'in-person',
    eventType: event.eventType || 'in-person',
    attendees: event.attendees || 0,
    imageUrl: event.imageUrl || event.image_url || '',
    image_url: event.image_url || event.imageUrl || '',
    registrationStartDate: event.registrationStartDate || event.registration_start_date || '',
    registrationEndDate: event.registrationEndDate || event.registration_end_date || '',
    registration_start_date: event.registration_start_date || event.registrationStartDate || '',
    registration_end_date: event.registration_end_date || event.registrationEndDate || ''
  });
  
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    console.log('Updating form data with event:', event);
    setFormData({
      id: event.id,
      title: event.title || '',
      description: event.description || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      certificate_type: event.certificate_type || 'none',
      certificateType: event.certificateType || 'none',
      event_hours: event.event_hours || 0,
      eventHours: event.eventHours || 0,
      price: event.price || 'free',
      max_attendees: event.max_attendees || 0,
      beneficiaryType: event.beneficiary_type || 'both',
      event_type: event.event_type || 'in-person',
      eventType: event.eventType || 'in-person',
      attendees: event.attendees || 0,
      imageUrl: event.imageUrl || event.image_url || '',
      image_url: event.image_url || event.imageUrl || '',
      registrationStartDate: event.registrationStartDate || event.registration_start_date || '',
      registrationEndDate: event.registrationEndDate || event.registration_end_date || '',
      registration_start_date: event.registration_start_date || event.registrationStartDate || '',
      registration_end_date: event.registration_end_date || event.registrationEndDate || ''
    });
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    
    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        image_url: formData.imageUrl || formData.image_url,
        registration_start_date: formData.registrationStartDate || formData.registration_start_date,
        registration_end_date: formData.registrationEndDate || formData.registration_end_date,
        certificate_type: formData.certificateType || formData.certificate_type,
        event_hours: formData.eventHours || formData.event_hours || null,
        event_type: formData.eventType || formData.event_type,
        price: formData.price === 'free' ? null : formData.price,
        max_attendees: formData.max_attendees,
        beneficiary_type: formData.beneficiaryType
      };
      
      console.log('Updating event with data:', updateData);
      
      const { data, error } = await supabase
        .from('events')
        .update(updateData)
        .eq('id', formData.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating event in database:', error);
        toast.error("حدث خطأ أثناء تحديث الفعالية");
        return;
      }

      console.log('Event updated successfully in database:', data);
      onSave(data);
      toast.success("تم تحديث الفعالية بنجاح");
      onCancel();
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error("حدث خطأ أثناء تحديث الفعالية");
    }
  };

  const handleImageChange = async (file: File) => {
    await handleImageUpload(file, setIsUploading, setFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <EventFormFields 
        formData={formData} 
        setFormData={setFormData}
        onImageChange={handleImageChange}
      />
      <EventFormActions 
        isUploading={isUploading}
        onCancel={onCancel}
      />
    </form>
  );
};