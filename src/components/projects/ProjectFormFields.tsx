import { Project } from "@/types/project";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BeneficiaryType } from "@/types/event";

interface ProjectFormFieldsProps {
  formData: Project;
  setFormData: (data: Project) => void;
  onImageChange?: (file: File | null) => void;
}

export const ProjectFormFields = ({ formData, setFormData, onImageChange }: ProjectFormFieldsProps) => {
  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div>
        <label className="text-sm font-medium block mb-1.5">عنوان المشروع</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="text-right"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium block mb-1.5">وصف المشروع</label>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="text-right"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">تاريخ البداية</label>
        <Input
          type="date"
          value={formData.start_date}
          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          className="text-right"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">تاريخ النهاية</label>
        <Input
          type="date"
          value={formData.end_date}
          onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
          className="text-right"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">نوع المشروع</label>
        <Select
          value={formData.event_type}
          onValueChange={(value: "online" | "in-person") => 
            setFormData({ ...formData, event_type: value })
          }
        >
          <SelectTrigger className="text-right">
            <SelectValue placeholder="اختر نوع المشروع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in-person">حضوري</SelectItem>
            <SelectItem value="online">عن بعد</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">نوع المستفيدين</label>
        <Select
          value={formData.beneficiary_type}
          onValueChange={(value: BeneficiaryType) => 
            setFormData({ ...formData, beneficiary_type: value })
          }
        >
          <SelectTrigger className="text-right">
            <SelectValue placeholder="اختر نوع المستفيدين" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="men">رجال</SelectItem>
            <SelectItem value="women">نساء</SelectItem>
            <SelectItem value="both">رجال ونساء</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">السعر (اتركه فارغاً للمشاريع المجانية)</label>
        <Input
          type="number"
          value={formData.price || ''}
          onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : null })}
          className="text-right"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">عدد المقاعد</label>
        <Input
          type="number"
          value={formData.max_attendees}
          onChange={(e) => setFormData({ ...formData, max_attendees: Number(e.target.value) })}
          className="text-right"
        />
      </div>

      {onImageChange && (
        <div>
          <label className="text-sm font-medium block mb-1.5">صورة المشروع</label>
          <ImageUpload
            onChange={onImageChange}
            value={formData.image_url}
          />
        </div>
      )}
    </div>
  );
};