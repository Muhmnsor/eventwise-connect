export interface EventReport {
  id: string;
  event_id: string | null;
  executor_id: string | null;
  report_name: string;
  program_name?: string | null;
  report_text: string;
  detailed_description?: string | null;
  event_duration: string;
  attendees_count?: string | null;
  event_objectives: string;
  impact_on_participants?: string | null;
  photos?: { url: string; description: string; }[] | null;
  created_at: string;
  video_links?: string[];
  additional_links?: string[];
  files?: string[];
  comments?: string[];
  satisfaction_level?: number | null;
  profiles?: {
    id: string;
    email: string;
  } | null;
}

export interface EventReportFormData {
  event_id?: string;
  executor_id?: string;
  program_name: string;
  report_name: string;
  report_text: string;
  detailed_description: string;
  event_duration: string;
  attendees_count: string;
  event_objectives: string;
  impact_on_participants: string;
  photos: { url: string; description: string; }[];
}