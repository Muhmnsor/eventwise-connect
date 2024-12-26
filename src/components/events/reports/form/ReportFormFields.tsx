import { ReportNameField } from "./ReportNameField";
import { ReportTextField } from "./ReportTextField";
import { DetailedDescriptionField } from "./DetailedDescriptionField";
import { EventMetadataFields } from "./EventMetadataFields";
import { EventObjectivesField } from "./EventObjectivesField";
import { ImpactField } from "./ImpactField";
import { PhotosField } from "./PhotosField";

interface PhotoWithDescription {
  url: string;
  description: string;
}

interface ReportFormFieldsProps {
  formValues: {
    program_name: string;
    report_name: string;
    report_text: string;
    detailed_description: string;
    event_duration: string;
    attendees_count: string;
    event_objectives: string;
    impact_on_participants: string;
    photos: PhotoWithDescription[];
  };
  setValue: (field: string, value: any) => void;
}

export const ReportFormFields = ({ formValues, setValue }: ReportFormFieldsProps) => {
  return (
    <>
      <ReportNameField
        value={formValues.report_name}
        programName={formValues.program_name}
        onChange={(value) => setValue('report_name', value)}
        onProgramNameChange={(value) => setValue('program_name', value)}
      />

      <ReportTextField
        value={formValues.report_text}
        onChange={(value) => setValue('report_text', value)}
      />

      <DetailedDescriptionField
        value={formValues.detailed_description}
        onChange={(value) => setValue('detailed_description', value)}
      />

      <EventMetadataFields
        duration={formValues.event_duration}
        attendeesCount={formValues.attendees_count}
        onDurationChange={(value) => setValue('event_duration', value)}
        onAttendeesCountChange={(value) => setValue('attendees_count', value)}
      />

      <EventObjectivesField
        value={formValues.event_objectives}
        onChange={(value) => setValue('event_objectives', value)}
      />

      <ImpactField
        value={formValues.impact_on_participants}
        onChange={(value) => setValue('impact_on_participants', value)}
      />

      <PhotosField
        photos={formValues.photos}
        onPhotosChange={(photos) => setValue('photos', photos)}
      />
    </>
  );
};