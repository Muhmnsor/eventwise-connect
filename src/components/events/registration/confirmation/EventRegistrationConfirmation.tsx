import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmationCardWrapper } from "./ConfirmationCardWrapper";

interface EventRegistrationConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationId: string;
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  formData: {
    name: string;
    email: string;
    phone: string;
  };
}

export const EventRegistrationConfirmation = ({
  open,
  onOpenChange,
  registrationId,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  formData,
}: EventRegistrationConfirmationProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  console.log('EventRegistrationConfirmation - Rendering with:', {
    registrationId,
    eventTitle,
    formData,
    open
  });

  const handleCloseDialog = () => {
    console.log('handleCloseDialog called');
    setIsClosing(true);
    onOpenChange(false);
    
    setTimeout(() => {
      console.log('Navigating to home page');
      navigate('/');
    }, 300);
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        console.log('Dialog onOpenChange triggered:', {
          newOpen,
          currentOpen: open,
          isClosing
        });
        if (!newOpen) {
          handleCloseDialog();
        }
      }}
    >
      <DialogContent 
        className="max-w-md mx-auto"
        onPointerDownOutside={(e) => {
          console.log('Preventing outside click close');
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          console.log('Preventing escape key close');
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          console.log('Preventing interaction outside');
          e.preventDefault();
        }}
      >
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center">تم التسجيل بنجاح!</DialogTitle>
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <div>سيتم التواصل معك قريباً</div>
            <div className="font-medium">يرجى حفظ هذا التأكيد أو تصويره قبل الإغلاق</div>
          </div>
        </DialogHeader>
        
        <ConfirmationCardWrapper
          eventTitle={eventTitle}
          registrationId={registrationId}
          formData={formData}
          eventDate={eventDate}
          eventTime={eventTime}
          eventLocation={eventLocation}
        />

        <Button 
          variant="outline" 
          className="w-full mt-2"
          onClick={handleCloseDialog}
        >
          <X className="w-4 h-4 mr-2" />
          إغلاق
        </Button>
      </DialogContent>
    </Dialog>
  );
};