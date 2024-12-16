import { Event } from "@/store/eventStore";

export const arabicToEnglishNum = (str: string) => {
  return str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
};

export const convertArabicDate = (dateStr: string, timeStr: string) => {
  console.log("Converting date and time:", { dateStr, timeStr });
  
  // تحويل التاريخ
  const [day, month, year] = dateStr.split(' ');
  const arabicMonths: { [key: string]: string } = {
    'يناير': 'January', 'فبراير': 'February', 'مارس': 'March',
    'ابريل': 'April', 'مايو': 'May', 'يونيو': 'June',
    'يوليو': 'July', 'اغسطس': 'August', 'سبتمبر': 'September',
    'اكتوبر': 'October', 'نوفمبر': 'November', 'ديسمبر': 'December'
  };
  
  const englishMonth = arabicMonths[month] || month;
  
  // معالجة الوقت
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

export const getEventStatus = (event: Event): 'available' | 'full' | 'ended' | 'notStarted' => {
  const now = new Date();
  const eventDate = new Date(`${event.date} ${event.time}`);
  
  // تحقق ما إذا كان الحدث قد انتهى
  if (eventDate < now) {
    console.log('Event has already passed');
    return 'ended';
  }
  
  // تحقق من تاريخ بدء التسجيل
  if (event.registrationStartDate) {
    const startDate = new Date(event.registrationStartDate);
    console.log('Registration start date:', startDate);
    console.log('Current date:', now);
    if (now < startDate) {
      console.log('Registration has not started yet');
      return 'notStarted';
    }
  }
  
  // تحقق من تاريخ انتهاء التسجيل
  if (event.registrationEndDate) {
    const endDate = new Date(event.registrationEndDate);
    if (now > endDate) {
      console.log('Registration has ended');
      return 'ended';
    }
  }
  
  // تحقق من اكتمال العدد
  if (event.attendees >= event.maxAttendees) {
    console.log('Event is full');
    return 'full';
  }
  
  console.log('Registration is available');
  return 'available';
};