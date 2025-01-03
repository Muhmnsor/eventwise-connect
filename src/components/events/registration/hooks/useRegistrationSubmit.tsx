import { FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { RegistrationFormData } from "../types/registration";

interface UseRegistrationSubmitProps {
  formData: RegistrationFormData;
  setIsSubmitting: (value: boolean) => void;
  setRegistrationId: (value: string) => void;
  setIsRegistered: (value: boolean) => void;
  setShowConfirmation: (value: boolean) => void;
  isProject: boolean;
}

export const useRegistrationSubmit = ({
  formData,
  setIsSubmitting,
  setRegistrationId,
  setIsRegistered,
  setShowConfirmation,
  isProject,
}: UseRegistrationSubmitProps) => {
  const { id } = useParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Starting registration submission...');
    console.log('Form data:', formData);
    console.log('Event/Project ID from URL:', id);
    
    if (!formData.arabicName || !formData.email || !formData.phone) {
      console.error('Required fields are missing:', {
        arabicName: formData.arabicName,
        email: formData.email,
        phone: formData.phone
      });
      throw new Error('Required fields are missing');
    }
    
    setIsSubmitting(true);
    
    try {
      const registrationId = uuidv4();
      const registrationNumber = `REG-${registrationId.split('-')[0]}`;

      const registrationData = {
        id: registrationId,
        arabic_name: formData.arabicName,
        english_name: formData.englishName || null,
        email: formData.email,
        phone: formData.phone,
        education_level: formData.educationLevel || null,
        birth_date: formData.birthDate || null,
        national_id: formData.nationalId || null,
        gender: formData.gender || null,
        work_status: formData.workStatus || null,
        registration_number: registrationNumber,
      };

      // Check if this is a project activity
      if (!isProject) {
        const { data: eventData } = await supabase
          .from('events')
          .select('is_project_activity')
          .eq('id', id)
          .maybeSingle();

        console.log('Event data:', eventData);

        // If this is a project activity, we don't allow direct registration
        if (eventData?.is_project_activity) {
          console.error('Cannot register directly for project activities');
          throw new Error('Cannot register directly for project activities');
        }

        // This is a regular event registration
        Object.assign(registrationData, { event_id: id });
      } else {
        // This is a project registration
        Object.assign(registrationData, { project_id: id });
      }

      console.log('Submitting registration with data:', registrationData);

      const { error } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (error) {
        console.error('Registration error:', error);
        throw error;
      }

      console.log('Registration successful:', registrationId);
      
      setRegistrationId(registrationId);
      setIsRegistered(true);
      setShowConfirmation(true);
      
      console.log('States updated after successful registration:', {
        registrationId,
        isRegistered: true,
        showConfirmation: true
      });
      
      return registrationId;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit };
};