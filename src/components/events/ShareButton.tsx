import { Share2, X, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  onShare?: () => Promise<void>;
}

export const ShareButton = ({ 
  url = window.location.href,
  title = "",
  text = "",
  onShare 
}: ShareButtonProps) => {
  const handleShare = async (method: 'copy' | 'x' | 'facebook' | 'whatsapp') => {
    switch (method) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          toast("تم نسخ رابط الفعالية إلى الحافظة");
        } catch (error) {
          console.error('Error copying link:', error);
          toast.error("لم نتمكن من نسخ الرابط");
        }
        break;
      
      case 'x':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + "\n" + text)}`, '_blank');
        break;
      
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title + "\n" + text)}`, '_blank');
        break;
      
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + "\n" + text + "\n" + url)}`, '_blank');
        break;
    }

    if (onShare) {
      await onShare();
    }
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem onClick={() => handleShare('x')}>
          <span className="flex items-center justify-end text-right w-full">
            مشاركة على X
            <X className="h-4 w-4 mr-2" />
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('facebook')}>
          <span className="flex items-center justify-end text-right w-full">
            مشاركة على فيسبوك
            <Facebook className="h-4 w-4 mr-2" />
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
          <span className="flex items-center justify-end text-right w-full">
            مشاركة عبر واتساب
            <MessageCircle className="h-4 w-4 mr-2" />
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('copy')}>
          <span className="flex items-center justify-end text-right w-full">
            نسخ الرابط
            <Share2 className="h-4 w-4 mr-2" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};