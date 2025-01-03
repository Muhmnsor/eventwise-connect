import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EventConfirmationCard } from "./EventConfirmationCard";
import { exportCardAsImage } from "@/utils/cardExport";

interface EventConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationId: string;
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  location_url?: string;
  formData: {
    name: string;
    email: string;
    phone: string;
  };
}

export const EventConfirmationDialog = ({
  open,
  onOpenChange,
  registrationId,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  location_url,
  formData,
}: EventConfirmationDialogProps) => {
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const navigate = useNavigate();

  console.log('EventConfirmationDialog - Rendering with:', {
    registrationId,
    eventTitle,
    formData,
    open
  });

  const handleDownload = async () => {
    console.log('Attempting to download confirmation card');
    const success = await exportCardAsImage(
      "confirmation-card",
      `تأكيد-التسجيل-${eventTitle}.png`
    );

    if (success) {
      console.log('Card downloaded successfully');
      setHasDownloaded(true);
      toast.success('تم حفظ بطاقة التأكيد بنجاح');
    } else {
      console.error('Failed to download card');
      toast.error('حدث خطأ أثناء حفظ البطاقة');
    }
  };

  const handleClose = () => {
    if (!hasDownloaded) {
      const shouldClose = window.confirm(
        "هل أنت متأكد من إغلاق نافذة التأكيد؟ لم تقم بحفظ التأكيد بعد."
      );
      if (!shouldClose) return;
    }
    onOpenChange(false);
    navigate('/');
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={handleClose}
    >
      <DialogContent 
        className="max-w-md mx-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center">تم التسجيل بنجاح!</DialogTitle>
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <div>سيتم التواصل معك قريباً</div>
            <div className="font-medium">يرجى حفظ هذا التأكيد أو تصويره قبل الإغلاق</div>
          </div>
        </DialogHeader>
        
        <EventConfirmationCard
          eventTitle={eventTitle}
          registrationId={registrationId}
          registrantInfo={formData}
          eventDetails={{
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            location_url: location_url
          }}
        />

        <div className="space-y-2 mt-4">
          <Button 
            onClick={handleDownload}
            className="w-full gap-2"
            variant="secondary"
            size="lg"
          >
            <Download className="w-5 h-5" />
            حفظ البطاقة
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleClose}
          >
            <X className="w-4 h-4 mr-2" />
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};