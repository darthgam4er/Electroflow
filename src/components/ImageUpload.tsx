
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { uploadFile } from '@/app/admin/actions';

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
}

export function ImageUpload({ 
  value, 
  onChange, 
  disabled = false,
  multiple = true,
  maxFiles = 10,
  acceptedTypes = ['image/*'],
  maxSize = 10
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Validate file count
    if (value.length + files.length > maxFiles) {
      toast({
        title: "Too Many Files",
        description: `Maximum ${maxFiles} files allowed. You can upload ${maxFiles - value.length} more.`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];
    const newUploadProgress: Record<string, number> = {};

    // Initialize progress for each file
    Array.from(files).forEach(file => {
      newUploadProgress[file.name] = 0;
    });
    setUploadProgress(newUploadProgress);

    for (const file of files) {
      try {
        // Validate file type
        if (!acceptedTypes.some(type => 
          type === 'image/*' ? file.type.startsWith('image/') : file.type === type
        )) {
          toast({
            title: "Invalid File Type",
            description: `"${file.name}" is not an allowed image type.`,
            variant: "destructive",
          });
          continue;
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          toast({
            title: "File Too Large",
            description: `"${file.name}" exceeds the maximum size of ${maxSize}MB.`,
            variant: "destructive",
          });
          continue;
        }

        // Update progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 25 }));

        // Upload to Firebase Storage
        const formData = new FormData();
        formData.append('file', file);
        
        setUploadProgress(prev => ({ ...prev, [file.name]: 50 }));
        
        const result = await uploadFile(formData);
        
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));

        if (result.success && result.url) {
          uploadedUrls.push(result.url);
          toast({
            title: "Upload Successful",
            description: `"${file.name}" uploaded successfully.`,
          });
        } else {
          toast({
            title: "Upload Failed",
            description: result.error || `Could not upload ${file.name}.`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Error",
          description: `An unexpected error occurred while uploading ${file.name}.`,
          variant: "destructive",
        });
      }
    }
    
    // Update the form value
    if (uploadedUrls.length > 0) {
      onChange([...value, ...uploadedUrls]);
    }

    // Clear progress after a delay
    setTimeout(() => {
      setUploadProgress({});
    }, 2000);

    setIsUploading(false);
    
    // Reset input
    event.target.value = '';
  };

  const handleRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  const getFileStatus = (url: string) => {
    // Check if this is a Firebase Storage URL
    const isFirebaseUrl = url.includes('firebasestorage.googleapis.com');
    
    if (isFirebaseUrl) {
      return { type: 'firebase', icon: <CheckCircle className="h-4 w-4 text-green-500" />, label: 'Stored' };
    } else {
      return { type: 'local', icon: <AlertCircle className="h-4 w-4 text-yellow-500" />, label: 'Local' };
    }
  };

  return (
    <div>
      {/* Image Grid */}
      <div className="mb-4 grid grid-cols-3 gap-4">
        {value.map((url, index) => {
          const status = getFileStatus(url);
          return (
            <div key={`${url}-${index}`} className="relative aspect-square rounded-md overflow-hidden border">
              <Image 
                src={url} 
                alt={`Uploaded image ${index + 1}`} 
                fill 
                className="object-cover" 
              />
              
              {/* Status indicator */}
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {status.icon}
                <span>{status.label}</span>
              </div>
              
              {/* Remove button */}
              <div className="absolute top-2 right-2">
                <Button 
                  type="button" 
                  size="icon" 
                  variant="destructive" 
                  onClick={() => handleRemove(url)} 
                  disabled={disabled}
                  className="h-6 w-6"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mb-4 space-y-2">
          {Object.entries(uploadProgress).map(([filename, progress]) => (
            <div key={filename} className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">{filename}</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {value.length < maxFiles && (
        <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors">
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-muted-foreground">
              {multiple ? `Up to ${maxFiles - value.length} images` : 'Single image'} • Max {maxSize}MB each
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported: JPG, PNG, GIF, WebP
            </p>
            <input
              type="file"
              multiple={multiple}
              onChange={handleUpload}
              className="hidden"
              accept={acceptedTypes.join(',')}
              disabled={disabled || isUploading}
            />
          </div>
        </label>
      )}

      {/* File Limit Warning */}
      {value.length >= maxFiles && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">
              Maximum number of files ({maxFiles}) reached. Remove some files to upload more.
            </span>
          </div>
        </div>
      )}

      {/* Firebase Status */}
      {value.some(url => url.includes('firebasestorage.googleapis.com')) && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">
              Images are stored in Firebase Storage and will persist across sessions.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
