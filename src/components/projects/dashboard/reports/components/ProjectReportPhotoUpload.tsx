import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { ReportPhoto } from "@/types/projectReport";

interface ProjectReportPhotoUploadProps {
  photos: ReportPhoto[];
  onPhotosChange: (photos: ReportPhoto[]) => void;
  maxPhotos?: number;
}

export const ProjectReportPhotoUpload = ({
  photos,
  onPhotosChange,
  maxPhotos = 6,
}: ProjectReportPhotoUploadProps) => {
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const newPhotos = [...photos];
      newPhotos[index] = {
        url: data.url,
        description: '',
      };
      onPhotosChange(newPhotos);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    onPhotosChange(newPhotos);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array(maxPhotos)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="relative aspect-square border rounded-lg overflow-hidden"
          >
            {photos[index]?.url ? (
              <div className="relative h-full">
                <img
                  src={photos[index].url}
                  alt={`صورة ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemovePhoto(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-full cursor-pointer bg-muted hover:bg-muted/80 transition-colors">
                <ImagePlus className="h-8 w-8 mb-2" />
                <span className="text-sm">إضافة صورة</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(e, index)}
                />
              </label>
            )}
          </div>
        ))}
    </div>
  );
};