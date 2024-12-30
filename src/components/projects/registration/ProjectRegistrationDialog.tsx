import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getEventStatus } from "@/utils/eventUtils";
import { Project } from "@/types/project";
import { ProjectRegistrationForm } from "./ProjectRegistrationForm";
import { EventPathType, EventCategoryType } from "@/types/event";

interface ProjectRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

export const ProjectRegistrationDialog = ({
  open,
  onOpenChange,
  project,
}: ProjectRegistrationDialogProps) => {
  // تحويل بيانات المشروع إلى تنسيق Event للتحقق من حالة التسجيل
  const eventData = {
    ...project,
    date: project.end_date,
    time: "00:00",
    location: "",
    attendees: 0,
    beneficiaryType: project.beneficiary_type,
    event_hours: 0,
    registrationStartDate: project.registration_start_date,
    registrationEndDate: project.registration_end_date,
    certificate_type: project.certificate_type || 'none',
    event_type: project.event_type || 'in-person',
    event_path: (project.event_path || 'environment') as EventPathType,
    event_category: (project.event_category || 'social') as EventCategoryType,
    imageUrl: project.image_url,
    price: project.price || 0,
    max_attendees: project.max_attendees || 0,
    is_visible: project.is_visible
  };
  
  const status = getEventStatus(eventData);
  console.log('Project registration status:', status);

  if (status !== 'available' && open) {
    console.log('Closing dialog because registration is not allowed. Status:', status);
    onOpenChange(false);
    return null;
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'full':
        return "اكتمل التسجيل";
      case 'ended':
        return "انتهى التسجيل";
      case 'notStarted':
        return "لم يبدأ التسجيل بعد";
      case 'eventStarted':
        return "انتهى المشروع";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">تسجيل في {project.title}</DialogTitle>
        </DialogHeader>
        {status !== 'available' ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {getStatusMessage()}
            </AlertDescription>
          </Alert>
        ) : (
          <ProjectRegistrationForm
            projectTitle={project.title}
            projectPrice={project.price}
            startDate={project.start_date}
            endDate={project.end_date}
            eventType={project.event_type}
            onSubmit={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};