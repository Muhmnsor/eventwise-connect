import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as htmlToImage from "html-to-image";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { ConfirmationCard } from "./ConfirmationCard";
import { ConfirmationActions } from "./ConfirmationActions";

interface RegistrationConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationId: string;
  eventTitle: string;
  eventPrice: number | "free";
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onPayment: () => void;
}

export const RegistrationConfirmation = ({
  open,
  onOpenChange,
  registrationId,
  eventTitle,
  eventPrice,
  eventDate,
  eventTime,
  eventLocation,
  formData,
  onPayment,
}: RegistrationConfirmationProps) => {
  const { toast } = useToast();
  const [isClosing, setIsClosing] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  useEffect(() => {
    if (open) {
      setIsClosing(false);
      setHasDownloaded(false);
      console.log("Dialog opened, states reset");
    }
  }, [open]);

  const handleCloseDialog = () => {
    if (!hasDownloaded) {
      const shouldClose = window.confirm("هل أنت متأكد من إغلاق نافذة التأكيد؟ لم تقم بحفظ التأكيد بعد.");
      if (!shouldClose) {
        return;
      }
    }
    setIsClosing(true);
    onOpenChange(false);
  };

  const handleSaveConfirmation = async () => {
    console.log("Attempting to save confirmation");
    const element = document.getElementById("confirmation-card");
    if (!element) {
      console.error("Confirmation card element not found");
      return;
    }

    try {
      // Reset any transformations
      const computedStyle = window.getComputedStyle(element);
      const originalTransform = computedStyle.transform;
      element.style.transform = 'none';

      // Add a white background temporarily
      element.style.backgroundColor = '#ffffff';
      
      // Capture the image with improved settings
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
        skipAutoScale: true,
        style: {
          transform: 'none',
          margin: '0',
          padding: '0',
        },
        filter: (node) => {
          return !node.classList?.contains('no-export');
        }
      });

      // Restore original styles
      element.style.transform = originalTransform;
      element.style.backgroundColor = '';

      // Create download link
      const link = document.createElement("a");
      link.download = `تأكيد-التسجيل-${eventTitle}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      
      console.log("Triggering download");
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(dataUrl);
      
      setHasDownloaded(true);
      toast({
        title: "تم حفظ التأكيد بنجاح",
        description: "يمكنك الآن إغلاق النافذة",
      });
      console.log("Confirmation saved successfully");
    } catch (error) {
      console.error("Error saving confirmation:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ التأكيد",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          handleCloseDialog();
        }
      }}
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
        
        <ConfirmationCard
          eventTitle={eventTitle}
          registrationId={registrationId}
          formData={formData}
          eventDate={eventDate}
          eventTime={eventTime}
          eventLocation={eventLocation}
          onSave={handleSaveConfirmation}
        />

        <ConfirmationActions
          onSave={handleSaveConfirmation}
          onClose={handleCloseDialog}
          onPayment={onPayment}
          showPayment={eventPrice !== "free"}
        />
      </DialogContent>
    </Dialog>
  );
};