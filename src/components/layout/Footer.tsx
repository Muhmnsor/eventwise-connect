import { Logo } from "@/components/Logo";
import { Facebook, Globe, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-[#C8C8C9] dark:border-[#2A2F3C]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center justify-center md:justify-start">
            <Logo className="w-24 h-24" />
          </div>
          
          <div className="text-center">
            <h3 className="font-bold text-xl mb-2 text-[#403E43] dark:text-white">جمعية ديوان الشبابية</h3>
            <p className="text-[#9F9EA1] mb-1">المملكة العربية السعودية - المدينة المنورة</p>
            <p className="text-[#9F9EA1] mb-2">رقم الترخيص 5531</p>
            <a 
              href="https://www.dfy.org.sa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary/80 flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4" />
              www.dfy.org.sa
            </a>
          </div>

          <div className="flex justify-center md:justify-end space-x-4 rtl:space-x-reverse">
            <a href="https://twitter.com/d4ymed" target="_blank" rel="noopener noreferrer" className="text-[#9F9EA1] hover:text-primary transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://instagram.com/d4ymed" target="_blank" rel="noopener noreferrer" className="text-[#9F9EA1] hover:text-primary transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/company/d4ymed" target="_blank" rel="noopener noreferrer" className="text-[#9F9EA1] hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};