import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { EventBasicFields } from "./EventBasicFields";
import { EventDateTimeFields } from "./EventDateTimeFields";
import { EventLocationFields } from "./EventLocationFields";
import { ProjectActivity, ProjectActivityFormData } from "@/types/activity";

interface EditProjectActivityFormContainerProps {
  activity: ProjectActivity;
  onSave: (updatedActivity: ProjectActivity) => void;
  onCancel: () => void;
  projectId: string;
}

export const EditProjectActivityFormContainer = ({
  activity,
  onSave,
  onCancel,
  projectId
}: EditProjectActivityFormContainerProps) => {
  console.log('Form data in EditProjectActivityFormContainer:', activity);
  
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProjectActivityFormData>({
    defaultValues: {
      title: activity.title,
      description: activity.description || "",
      date: activity.date,
      time: activity.time,
      location: activity.location,
      location_url: activity.location_url || "",
      special_requirements: activity.special_requirements || "",
      event_hours: activity.event_hours,
    },
  });

  const handleSubmit = async (data: ProjectActivityFormData) => {
    setIsLoading(true);
    try {
      const updatedActivity = {
        ...activity,
        ...data,
      };
      await onSave(updatedActivity);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <EventBasicFields form={form} />
      <EventDateTimeFields form={form} />
      <EventLocationFields form={form} />
      
      <div className="flex justify-end gap-2">
        <Button onClick={onCancel} variant="outline" type="button">
          إلغاء
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              جاري الحفظ...
            </span>
          ) : (
            "حفظ التغييرات"
          )}
        </Button>
      </div>
    </form>
  );
};