import { Event } from "@/store/eventStore";
import { EventStatus } from "@/types/eventStatus";
import { getEventDateTime } from "./dateUtils";
import { getStatusConfig } from "./eventStatusConfig";

export const arabicToEnglishNum = (str: string) => {
  return str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
};

export const isEventPassed = (event: Event): boolean => {
  if (!event) {
    console.log('Event is undefined in isEventPassed');
    return false;
  }
  const now = new Date();
  const eventDateTime = getEventDateTime(event.date, event.time);
  return eventDateTime < now;
};

export const getEventStatus = (event: Event): EventStatus => {
  if (!event) {
    console.log('Event is undefined in getEventStatus');
    return 'notStarted';
  }

  console.log('Checking event status for:', {
    title: event.title,
    date: event.date,
    time: event.time,
    registrationStartDate: event.registration_start_date || event.registrationStartDate,
    registrationEndDate: event.registration_end_date || event.registrationEndDate,
    attendees: event.attendees,
    max_attendees: event.max_attendees
  });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDateTime = getEventDateTime(event.date, event.time);
  
  // تحويل تواريخ التسجيل إلى كائنات Date
  const registrationStartDate = (event.registration_start_date || event.registrationStartDate) ? 
    new Date(event.registration_start_date || event.registrationStartDate) : null;
  const registrationEndDate = (event.registration_end_date || event.registrationEndDate) ? 
    new Date(event.registration_end_date || event.registrationEndDate) : null;

  // تسجيل التواريخ للتحقق
  console.log('Registration dates:', {
    start: registrationStartDate?.toISOString(),
    end: registrationEndDate?.toISOString(),
    now: now.toISOString(),
    today: today.toISOString()
  });

  // التحقق من بدء موعد التسجيل
  if (registrationStartDate) {
    const startDate = new Date(
      registrationStartDate.getFullYear(),
      registrationStartDate.getMonth(),
      registrationStartDate.getDate()
    );
    
    if (today < startDate) {
      console.log('Registration has not started yet');
      return 'notStarted';
    }
  }

  // التحقق من انتهاء موعد التسجيل
  if (registrationEndDate) {
    const endDate = new Date(
      registrationEndDate.getFullYear(),
      registrationEndDate.getMonth(),
      registrationEndDate.getDate(),
      23, 59, 59
    );

    if (now > endDate) {
      console.log('Registration period has ended');
      return 'ended';
    }
  }

  // التحقق من بدء الفعالية
  if (now >= eventDateTime) {
    console.log('Event has already started or ended');
    return 'eventStarted';
  }

  // التحقق من اكتمال العدد
  const currentAttendees = typeof event.attendees === 'number' ? event.attendees : 0;
  if (event.max_attendees && currentAttendees >= event.max_attendees) {
    console.log('Event is full - no more seats available');
    return 'full';
  }

  console.log('Registration is available');
  return 'available';
};

export { getStatusConfig };