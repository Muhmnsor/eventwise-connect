import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { processTemplate } from "../templates/preview/utils/templateProcessor";
import { downloadTemplateFile } from "../templates/preview/utils/templateDownloader";
import { CertificateTemplatePreview } from "../templates/preview/CertificateTemplatePreview";
import { Eye, Shield } from "lucide-react";

interface CertificateIssuerProps {
  templateId: string;
  registrationId: string;
  eventId?: string;
  projectId?: string;
}

export const CertificateIssuer = ({
  templateId,
  registrationId,
  eventId,
  projectId
}: CertificateIssuerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [certificateData, setCertificateData] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [template, setTemplate] = useState<any>(null);

  const handleFieldChange = (key: string, value: string) => {
    setCertificateData(prev => ({ ...prev, [key]: value }));
  };

  const handlePreview = async () => {
    try {
      setIsLoading(true);
      if (!template) {
        const { data, error } = await supabase
          .from('certificate_templates')
          .select('*')
          .eq('id', templateId)
          .single();

        if (error) throw error;
        setTemplate(data);
      }
      setShowPreview(true);
    } catch (error) {
      console.error('❌ خطأ في تحميل القالب:', error);
      toast.error('حدث خطأ أثناء تحميل القالب');
    } finally {
      setIsLoading(false);
    }
  };

  const generateVerificationCode = () => {
    // Generate a more secure and readable verification code
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 8; i++) {
      if (i > 0 && i % 4 === 0) code += '-';
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const handleIssueCertificate = async (confirmedData: Record<string, string>) => {
    try {
      setIsLoading(true);
      console.log('🎓 إصدار شهادة بالبيانات:', { templateId, registrationId, confirmedData });

      // 1. Process template with data
      const templateFile = await downloadTemplateFile(template.template_file);
      const processedPdf = await processTemplate(await templateFile.arrayBuffer(), confirmedData);

      // 2. Upload processed PDF to storage
      const fileName = `${crypto.randomUUID()}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(fileName, processedPdf);

      if (uploadError) throw uploadError;

      // Generate a unique certificate number with prefix based on event/project
      const prefix = eventId ? 'EVT' : 'PRJ';
      const certificateNumber = `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      // Generate a more secure verification code
      const verificationCode = generateVerificationCode();

      // 3. Create certificate record
      const { error: insertError } = await supabase
        .from('certificates')
        .insert([{
          template_id: templateId,
          registration_id: registrationId,
          event_id: eventId,
          project_id: projectId,
          certificate_number: certificateNumber,
          verification_code: verificationCode,
          certificate_data: confirmedData,
          pdf_url: fileName,
          status: 'active'
        }]);

      if (insertError) throw insertError;

      toast.success('تم إصدار الشهادة بنجاح');
      setShowPreview(false);
    } catch (error) {
      console.error('❌ خطأ في إصدار الشهادة:', error);
      toast.error('حدث خطأ أثناء إصدار الشهادة');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">إصدار شهادة جديدة</h3>
        <Shield className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {Object.entries(certificateData).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <Label>{key}</Label>
            <Input
              value={value}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              placeholder={`أدخل ${key}`}
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handlePreview}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            جاري التحميل...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            معاينة الشهادة
          </span>
        )}
      </Button>

      {template && (
        <CertificateTemplatePreview
          open={showPreview}
          onOpenChange={setShowPreview}
          template={template}
          initialData={certificateData}
          onConfirm={handleIssueCertificate}
          showConfirm={true}
        />
      )}
    </Card>
  );
};