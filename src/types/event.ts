export type BeneficiaryType = 'men' | 'women' | 'both';

export interface EventType {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  image_url?: string;
  attendees: number;
  maxAttendees: number;
  eventType: "online" | "in-person";
  price: number | "free";
  beneficiaryType: BeneficiaryType;
  registrationStartDate?: string | null;
  registrationEndDate?: string | null;
}