export interface EventReport {
  id: string;
  event_id: string | null;
  executor_id: string | null;
  program_name?: string | null;
  report_name: string;
  report_text: string;
  detailed_description?: string | null;
  duration?: string | null;
  activity_duration?: string | null; // For backwards compatibility
  attendees_count?: string | null;
  objectives?: string | null;
  activity_objectives?: string | null; // For backwards compatibility
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
  program_name: string;
  report_name: string;
  report_text: string;
  detailed_description: string;
  duration: string;
  attendees_count: string;
  objectives: string;
  impact_on_participants: string;
  photos: { url: string; description: string; }[];
}