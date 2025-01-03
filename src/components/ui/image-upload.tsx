import React, { useRef } from 'react';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onChange: (file: File) => void;
  value?: string;
  className?: string;
}

export function ImageUpload({ onChange, value, className }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        className="w-full"
      >
        {value ? 'تغيير الصورة' : 'اختر صورة'}
      </Button>
      {value && (
        <div className="relative aspect-video mt-2">
          <img
            src={value}
            alt="Preview"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}