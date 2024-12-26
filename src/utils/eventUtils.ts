import { Event } from "@/store/eventStore";

export const arabicToEnglishNum = (str: string) => {
  return str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
};

export const convertArabicDate = (dateStr: string, timeStr: string) => {
  console.log("Converting date and time:", { dateStr, timeStr });
  
  const [day, month, year] = dateStr.split(' ');
  const arabicMonths: { [key: string]: string } = {
    'يناير': 'January', 'فبراير': 'February', 'مارس': 'March',
    'ابريل': 'April', 'مايو': 'May', 'يونيو': 'June',
    'يوليو': 'July', 'اغسطس': 'August', 'سبتمبر': 'September',
    'اكتوبر': 'October', 'نوفمبر': 'November', 'ديسمبر': 'December'
  };
  
  const englishMonth = arabicMonths[month] || month;
  
  let cleanTimeStr = timeStr
    .replace('مساءً', 'PM')
    .replace('صباحاً', 'AM')
    .replace('ص', 'AM')
    .replace('م', 'PM');
  
  console.log("Cleaned time string:", cleanTimeStr);
  
  const dateString = `${englishMonth} ${day} ${year} ${cleanTimeStr}`;
  console.log("Final date string:", dateString);
  
  return dateString;
};

export const isEventPassed = (event: Event): boolean => {
  if (!event) {
    console.log('Event is undefined in isEventPassed');
    return false;
  }
  const now = new Date();
  const eventDateTime = new Date(`${event.date} ${event.time}`);
  return eventDateTime < now;
};

export type EventStatus = 'available' | 'full' | 'ended' | 'notStarted' | 'eventStarted';

const parseDate = (dateStr: string | null | undefined): Date | null => {
  if (!dateStr) return null;
  return new Date(dateStr);
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
    registrationStartDate: event.registrationStartDate,
    registrationEndDate: event.registrationEndDate,
    attendees: event.attendees,
    max_attendees: event.max_attendees
  });
  
  const now = new Date();
  const eventDate = new Date(`${event.date} ${event.time || '00:00'}`);
  const registrationStartDate = parseDate(event.registrationStartDate);
  const registrationEndDate = parseDate(event.registrationEndDate);
  
  // تحقق ما إذا كانت الفعالية قد انتهت
  if (now >= eventDate) {
    console.log('Event has already started or ended');
    return 'eventStarted';
  }
  
  // تحقق من تاريخ بدء التسجيل
  if (registrationStartDate && now < registrationStartDate) {
    console.log('Registration has not started yet');
    return 'notStarted';
  }
  
  // تحقق من تاريخ انتهاء التسجيل
  if (registrationEndDate && now > registrationEndDate) {
    console.log('Registration period has ended');
    return 'ended';
  }
  
  // تحقق من اكتمال العدد
  const currentAttendees = typeof event.attendees === 'number' ? event.attendees : 0;
  if (event.max_attendees && currentAttendees >= event.max_attendees) {
    console.log('Event is full - no more seats available');
    return 'full';
  }
  
  console.log('Registration is available');
  return 'available';
};

export const getStatusConfig = (status: EventStatus) => {
  const configs = {
    available: {
      text: "تسجيل الحضور",
      className: "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all",
      disabled: false
    },
    full: {
      text: "اكتمل التسجيل",
      className: "bg-gray-100 text-gray-500 cursor-not-allowed",
      disabled: true
    },
    ended: {
      text: "انتهى التسجيل",
      className: "bg-gray-50 text-gray-400 cursor-not-allowed",
      disabled: true
    },
    notStarted: {
      text: "لم يبدأ التسجيل بعد",
      className: "bg-gray-50 text-gray-400 cursor-not-allowed",
      disabled: true
    },
    eventStarted: {
      text: "بدأت الفعالية",
      className: "bg-gray-50 text-gray-400 cursor-not-allowed",
      disabled: true
    }
  };

  return configs[status];
};