import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ReportPhoto } from '../types';

interface BaseReport {
  report_name: string;
  program_name?: string;
  report_text: string;
  activity_duration?: string;
  attendees_count?: string;
  activity_objectives?: string;
  impact_on_participants?: string;
  photos?: ReportPhoto[];
  satisfaction_level?: number;
}

export const downloadReportWithImages = async (report: BaseReport, eventTitle?: string): Promise<boolean> => {
  try {
    console.log('Starting report download process for:', report.report_name);
    const zip = new JSZip();

    // Add report text content
    const reportContent = generateReportContent(report);
    zip.file('تقرير-النشاط.txt', reportContent);

    // Download and add images if they exist
    if (report.photos && report.photos.length > 0) {
      console.log('Processing', report.photos.length, 'photos');
      const imageFolder = zip.folder('الصور');
      
      for (let i = 0; i < report.photos.length; i++) {
        const photoData = report.photos[i];
        if (!photoData) continue;
        
        try {
          const photoInfo = typeof photoData === 'string' ? JSON.parse(photoData) : photoData;
          if (!photoInfo.url) continue;

          const response = await fetch(photoInfo.url);
          const blob = await response.blob();
          const fileName = `صورة_${i + 1}${getFileExtension(photoInfo.url)}`;
          imageFolder?.file(fileName, blob);
        } catch (error) {
          console.error('Error downloading image:', error);
        }
      }
    }

    // Generate and save zip file
    const content = await zip.generateAsync({ type: 'blob' });
    const fileName = `تقرير-${eventTitle || report.report_name || 'النشاط'}-${new Date().toISOString().split('T')[0]}.zip`;
    saveAs(content, fileName);
    
    console.log('Report download completed successfully');
    return true;
  } catch (error) {
    console.error('Error in downloadReportWithImages:', error);
    return false;
  }
};

const generateReportContent = (report: BaseReport): string => {
  const sections = [
    { title: 'اسم التقرير', value: report.report_name },
    { title: 'اسم البرنامج', value: report.program_name },
    { title: 'نص التقرير', value: report.report_text },
    { title: 'مدة النشاط', value: report.activity_duration },
    { title: 'عدد الحضور', value: report.attendees_count },
    { title: 'أهداف النشاط', value: report.activity_objectives },
    { title: 'الأثر على المشاركين', value: report.impact_on_participants },
    { title: 'مستوى الرضا', value: report.satisfaction_level ? `${report.satisfaction_level}/5` : 'غير محدد' }
  ];

  return sections
    .filter(section => section.value)
    .map(section => `${section.title}:\n${section.value}\n`)
    .join('\n');
};

const getFileExtension = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase();
  if (extension && ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'].includes(extension)) {
    return `.${extension}`;
  }
  return '';
};