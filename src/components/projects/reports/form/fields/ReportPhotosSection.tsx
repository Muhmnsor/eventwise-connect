import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash2 } from "lucide-react";
import { handleImageUpload } from "@/components/events/form/EventImageUpload";
import { toast } from "sonner";

interface ReportPhotosSectionProps {
  form: UseFormReturn<any>;
  photoPlaceholders?: string[];
}

export const ReportPhotosSection = ({ 
  form,
  photoPlaceholders = []
}: ReportPhotosSectionProps) => {
  const photos = form.watch('photos') || [];

  const handlePhotoUpload = async (file: File, index: number) => {
    try {
      const { publicUrl, error } = await handleImageUpload(file, 'project');
      if (error) throw error;
      
      const currentPhotos = [...photos];
      currentPhotos[index] = { 
        url: publicUrl, 
        description: currentPhotos[index]?.description || '' 
      };
      
      form.setValue('photos', currentPhotos);
      toast.success('تم رفع الصورة بنجاح');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('حدث خطأ أثناء رفع الصورة');
    }
  };

  const handleDescriptionChange = (index: number, description: string) => {
    const currentPhotos = [...photos];
    currentPhotos[index] = { 
      ...currentPhotos[index], 
      description 
    };
    form.setValue('photos', currentPhotos);
  };

  const handleDeletePhoto = (index: number) => {
    const currentPhotos = [...photos];
    currentPhotos[index] = { url: '', description: '' };
    form.setValue('photos', currentPhotos);
  };

  // Initialize array with 6 slots if empty
  while (photos.length < 6) {
    photos.push({ url: '', description: '' });
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">الصور</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <Card key={index} className="p-4 space-y-4">
            <div className="space-y-2">
              {photo.url ? (
                <div className="relative aspect-video">
                  <img
                    src={photo.url}
                    alt={`صورة ${index + 1}`}
                    className="rounded-md object-cover w-full h-full"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeletePhoto(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="relative aspect-video bg-muted rounded-md flex items-center justify-center">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handlePhotoUpload(file, index);
                    }}
                  />
                  <div className="text-center">
                    <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {photoPlaceholders[index] || `اختر صورة ${index + 1}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <Label className="mb-2 block">وصف الصورة</Label>
              <Input
                placeholder="أدخل وصفاً للصورة"
                value={photo.description}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
              />
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};