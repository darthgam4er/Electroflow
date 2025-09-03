
'use server';

import { imageUploadService } from "@/lib/image-upload";
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    return { success: false, error: 'No file provided.' };
  }

  // Check if image upload service is available
  if (!imageUploadService.isAvailable()) {
    return { 
      success: false, 
      error: 'Image upload service not configured. Please check your Firebase configuration.' 
    };
  }

  try {
    // Upload image with optimized settings for admin uploads
    const result = await imageUploadService.uploadImage(file, {
      folder: 'admin-uploads',
      maxSize: 15 * 1024 * 1024, // 15MB for admin uploads
      quality: 90, // Higher quality for admin content
      generateThumbnails: false,
    });

    if (result.success && result.url) {
      return { 
        success: true, 
        url: result.url,
        metadata: result.metadata 
      };
    } else {
      return { 
        success: false, 
        error: result.error || 'Upload failed' 
      };
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return { 
      success: false, 
      error: `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Upload multiple files at once
 */
export async function uploadMultipleFiles(formData: FormData) {
  const files = formData.getAll('files') as File[];
  if (!files || files.length === 0) {
    return { success: false, error: 'No files provided.' };
  }

  if (!imageUploadService.isAvailable()) {
    return { 
      success: false, 
      error: 'Image upload service not configured.' 
    };
  }

  try {
    const results = await imageUploadService.uploadMultipleImages(files, {
      folder: 'admin-uploads',
      maxSize: 15 * 1024 * 1024,
      quality: 90,
    });

    const successfulUploads = results.filter(r => r.success);
    const failedUploads = results.filter(r => !r.success);

    return {
      success: successfulUploads.length > 0,
      urls: successfulUploads.map(r => r.url),
      errors: failedUploads.map(r => r.error),
      metadata: successfulUploads.map(r => r.metadata),
    };
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    return { 
      success: false, 
      error: `Failed to upload files: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Delete a file from storage
 */
export async function deleteFile(filename: string) {
  if (!imageUploadService.isAvailable()) {
    return { 
      success: false, 
      error: 'Image upload service not configured.' 
    };
  }

  try {
    const result = await imageUploadService.deleteImage(filename);
    return result;
  } catch (error) {
    console.error('Error deleting file:', error);
    return { 
      success: false, 
      error: `Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Get file metadata
 */
export async function getFileMetadata(filename: string) {
  if (!imageUploadService.isAvailable()) {
    return { 
      success: false, 
      error: 'Image upload service not configured.' 
    };
  }

  try {
    const metadata = await imageUploadService.getImageMetadata(filename);
    return { success: true, metadata };
  } catch (error) {
    console.error('Error getting file metadata:', error);
    return { 
      success: false, 
      error: `Failed to get file metadata: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}
