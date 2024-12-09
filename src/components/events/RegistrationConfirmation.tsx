import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

  const handleSaveConfirmation = () => {
    setHasDownloaded(true);
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