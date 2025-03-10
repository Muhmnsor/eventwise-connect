export interface BaseReport {
  id: string;
  report_name: string;
  program_name?: string | null;
  report_text: string;
  detailed_description?: string | null;
  duration?: string | null;
  activity_duration?: string | null;
  attendees_count?: string | null;
  objectives?: string | null;
  activity_objectives?: string | null;
  impact_on_participants?: string | null;
  photos?: { url: string; description: string; }[] | null;
  created_at: string;
  video_links?: string[];
  additional_links?: string[];
  files?: string[];
  comments?: string[];
  satisfaction_level?: number | null;
}

export interface ReportFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface ReportActionsProps {
  onDelete: () => void;
  onDownload: () => void;
  onEdit: () => void;
  isDeleting?: boolean;
}

export interface ReportListProps {
  projectId?: string;
  activityId?: string;
}

export interface ReportMetadata {
  duration: string;
  attendeesCount: string;
  objectives: string;
  impactOnParticipants: string;
}

export interface ReportPhoto {
  url: string;
  description: string;
}

export interface ReportFormData {
  program_name: string;
  report_name: string;
  report_text: string;
  detailed_description: string;
  duration: string;
  attendees_count: string;
  objectives: string;
  impact_on_participants: string;
  photos: ReportPhoto[];
}