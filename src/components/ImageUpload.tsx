
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { uploadFile } from '@/app/admin/actions';

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of files) {
        if (!file.type.startsWith('image/')) {
            toast({
                title: "Invalid File Type",
                description: `"${file.name}" is not an image.`,
                variant: "destructive",
            });
            continue;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);
            const result = await uploadFile(formData);
            if (result.success && result.url) {
                uploadedUrls.push(result.url);
            } else {
                 toast({
                    title: "Upload Failed",
                    description: result.error || `Could not upload ${file.name}.`,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Upload Error",
                description: `An unexpected error occurred while uploading ${file.name}.`,
                variant: "destructive",
            });
        }
    }
    
    onChange([...value, ...uploadedUrls]);
    setIsUploading(false);
  };

  const handleRemove = (urlToRemove: string) => {
    // Note: This only removes from the list. It doesn't delete from storage.
    // A more robust solution would call a server action to delete the file from Firebase Storage.
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-square rounded-md overflow-hidden">
            <Image src={url} alt="Uploaded product image" fill className="object-cover" />
            <div className="absolute top-1 right-1 z-10">
              <Button type="button" size="icon" variant="destructive" onClick={() => handleRemove(url)} disabled={disabled}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary">
        <div className="text-center">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
          </p>
          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
            accept="image/*"
            disabled={disabled || isUploading}
          />
        </div>
      </label>
    </div>
  );
}
