interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

export const createCalendarUrl = (event: CalendarEvent) => {
  // تحديد نوع النظام
  const userAgent = navigator.userAgent.toLowerCase();
  const isAndroid = /android/.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  console.log("Device detection:", { isAndroid, isIOS, userAgent });

  if (isIOS) {
    // صيغة رابط تقويم آيفون
    return `webcal://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate}/${event.endDate}`;
  } else if (isAndroid) {
    // صيغة رابط تقويم أندرويد
    return `content://com.android.calendar/events?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate}/${event.endDate}`;
  } else {
    // صيغة رابط تقويم سطح المكتب
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate}/${event.endDate}`;
  }
};