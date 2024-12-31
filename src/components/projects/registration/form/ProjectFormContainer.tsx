import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ProjectRegistrationForm } from "./ProjectRegistrationForm";
import { RegistrationConfirmation } from "@/components/events/RegistrationConfirmation";

interface ProjectFormContainerProps {
  projectTitle: string;
  projectPrice: number | "free" | null;
  startDate: string;
  endDate: string;
  eventType: string;
  onSubmit: () => void;
}

export const ProjectFormContainer = ({
  projectTitle,
  projectPrice,
  startDate,
  endDate,
  eventType,
  onSubmit,
}: ProjectFormContainerProps) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    arabicName: "",
    englishName: "",
    educationLevel: "",
    birthDate: "",
    nationalId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Starting project registration process...");
    setIsSubmitting(true);

    try {
      const hasExistingRegistration = await checkExistingRegistration(formData.email);
      
      if (hasExistingRegistration) {
        toast.error("لقد قمت بالتسجيل في هذا المشروع مسبقاً");
        return;
      }

      const uniqueId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const { data: newRegistration, error: registrationError } = await supabase
        .from('registrations')
        .insert({
          project_id: id,
          arabic_name: formData.arabicName,
          email: formData.email,
          phone: formData.phone,
          registration_number: uniqueId,
          english_name: formData.englishName,
          education_level: formData.educationLevel,
          birth_date: formData.birthDate,
          national_id: formData.nationalId
        })
        .select()
        .single();

      if (registrationError) {
        console.error('Error submitting registration:', registrationError);
        throw registrationError;
      }

      if (projectPrice !== "free" && projectPrice !== null && projectPrice > 0) {
        await processPayment(newRegistration);
      }

      await queryClient.invalidateQueries({ 
        queryKey: ['registrations', id] 
      });
      
      setRegistrationId(uniqueId);
      setShowConfirmation(true);
      
      console.log('Project registration successful:', uniqueId);
    } catch (error) {
      console.error('Error in registration process:', error);
      toast.error("لم نتمكن من إكمال عملية التسجيل، يرجى المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkExistingRegistration = async (email: string) => {
    console.log("Checking for existing project registration...");
    const { data, error } = await supabase
      .from('registrations')
      .select('id')
      .eq('project_id', id)
      .eq('email', email);

    if (error) {
      console.error('Error checking registration:', error);
      throw error;
    }

    return data && data.length > 0;
  };

  const processPayment = async (registrationData: any) => {
    console.log("Processing payment for project...");
    const { error: paymentError } = await supabase
      .from('payment_transactions')
      .insert({
        registration_id: registrationData.id,
        amount: projectPrice,
        status: 'completed',
        payment_method: 'card',
        payment_gateway: 'local_gateway'
      });

    if (paymentError) {
      console.error('Error processing payment:', paymentError);
      throw paymentError;
    }

    return true;
  };

  if (showConfirmation) {
    return (
      <RegistrationConfirmation
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        registrationId={registrationId}
        eventTitle={projectTitle}
        eventPrice={projectPrice}
        isProjectActivity={false}
        projectTitle={projectTitle}
        formData={{
          ...formData,
          name: formData.arabicName
        }}
        onPayment={() => {}}
      />
    );
  }

  return (
    <ProjectRegistrationForm
      formData={formData}
      setFormData={setFormData}
      isSubmitting={isSubmitting}
      projectPrice={projectPrice}
      onSubmit={handleSubmit}
    />
  );
};