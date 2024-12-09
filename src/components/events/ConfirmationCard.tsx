import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Clock, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { exportCardAsImage } from "@/utils/cardExport";
import { useToast } from "@/components/ui/use-toast";

interface ConfirmationCardProps {
  eventTitle: string;
  registrationId: string;
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  onSave?: () => void;
}

export const ConfirmationCard = ({
  eventTitle,
  registrationId,
  formData,
  eventDate,
  eventTime,
  eventLocation,
  onSave
}: ConfirmationCardProps) => {
  const { toast } = useToast();

  const handleSaveCard = async () => {
    console.log("Save card button clicked");
    const success = await exportCardAsImage(
      "confirmation-card",
      `تأكيد-التسجيل-${eventTitle}.png`
    );

    if (success) {
      console.log("Card saved successfully");
      toast({
        title: "تم حفظ البطاقة بنجاح",
        description: "تم تنزيل البطاقة على جهازك",
      });
      if (onSave) onSave();
    } else {
      console.log("Failed to save card");
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من حفظ البطاقة، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <Card id="confirmation-card" className="bg-white p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-right space-y-2">
            <h3 className="font-bold text-xl">{eventTitle}</h3>
            <p className="text-sm text-muted-foreground">رقم التسجيل: {registrationId.split('-').pop()}</p>
          </div>
          <Logo className="w-16 h-16" />
        </div>

        <div className="flex justify-center py-4">
          <QRCodeSVG
            value={registrationId}
            size={150}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="space-y-4 text-right">
          <div className="space-y-2">
            <p className="text-sm font-medium">معلومات المسجل:</p>
            <div className="text-sm space-y-1">
              <p>الاسم: {formData.name}</p>
              <p>البريد الإلكتروني: {formData.email}</p>
              <p>رقم الجوال: {formData.phone}</p>
            </div>
          </div>

          {eventDate && (
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays size={20} className="text-primary shrink-0" />
              <span className="font-medium">{eventDate}</span>
            </div>
          )}
          
          {eventTime && (
            <div className="flex items-center gap-3 text-sm">
              <Clock size={20} className="text-primary shrink-0" />
              <span className="font-medium">{eventTime}</span>
            </div>
          )}
          
          {eventLocation && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={20} className="text-primary shrink-0" />
              <span className="font-medium">{eventLocation}</span>
            </div>
          )}
        </div>
      </Card>

      <Button 
        onClick={handleSaveCard} 
        className="w-full gap-2"
        variant="secondary"
        size="lg"
      >
        <Download className="w-5 h-5" />
        حفظ البطاقة
      </Button>
    </div>
  );
};