import { adminStorage } from './firebase-admin';
import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  metadata?: {
    filename: string;
    size: number;
    contentType: string;
    uploadedAt: Date;
  };
}

export interface ImageUploadOptions {
  folder?: string;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  generateThumbnails?: boolean;
  compress?: boolean;
  quality?: number; // 0-100
}

const DEFAULT_OPTIONS: ImageUploadOptions = {
  folder: 'uploads',
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  generateThumbnails: false,
  compress: true,
  quality: 85,
};

export class ImageUploadService {
  private static instance: ImageUploadService;
  private bucket: any;

  private constructor() {
    if (adminStorage) {
      this.bucket = adminStorage.bucket();
    } else {
      console.warn('Firebase Admin Storage not initialized');
    }
  }

  public static getInstance(): ImageUploadService {
    if (!ImageUploadService.instance) {
      ImageUploadService.instance = new ImageUploadService();
    }
    return ImageUploadService.instance;
  }

  /**
   * Upload a single image file
   */
  async uploadImage(
    file: File,
    options: ImageUploadOptions = {}
  ): Promise<UploadResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    try {
      // Validate file
      const validation = this.validateFile(file, opts);
      if (!validation.success) {
        return { success: false, error: validation.error };
      }

      // Check if Firebase Storage is available
      if (!this.bucket) {
        return { 
          success: false, 
          error: 'Firebase Storage not configured. Please check your environment variables.' 
        };
      }

      // Generate unique filename
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const filename = `${opts.folder}/${uuidv4()}.${fileExtension}`;

      // Convert file to buffer
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Upload to Firebase Storage
      const fileUpload = this.bucket.file(filename);
      
      await fileUpload.save(fileBuffer, {
        metadata: {
          contentType: file.type,
          metadata: {
            originalName: file.name,
            uploadedAt: new Date().toISOString(),
            size: file.size,
          },
        },
        resumable: false,
      });

      // Make the file public
      await fileUpload.makePublic();

      // Get the public URL
      const publicUrl = fileUpload.publicUrl();

      // Generate thumbnail if requested
      if (opts.generateThumbnails) {
        await this.generateThumbnail(fileBuffer, filename, file.type);
      }

      return {
        success: true,
        url: publicUrl,
        metadata: {
          filename,
          size: file.size,
          contentType: file.type,
          uploadedAt: new Date(),
        },
      };

    } catch (error) {
      console.error('Error uploading image:', error);
      return {
        success: false,
        error: `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(
    files: File[],
    options: ImageUploadOptions = {}
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = [];
    
    for (const file of files) {
      const result = await this.uploadImage(file, options);
      results.push(result);
    }

    return results;
  }

  /**
   * Delete an image from storage
   */
  async deleteImage(filename: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.bucket) {
        return { success: false, error: 'Firebase Storage not configured' };
      }

      const file = this.bucket.file(filename);
      await file.delete();

      return { success: true };
    } catch (error) {
      console.error('Error deleting image:', error);
      return {
        success: false,
        error: `Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Get image metadata
   */
  async getImageMetadata(filename: string): Promise<any> {
    try {
      if (!this.bucket) {
        throw new Error('Firebase Storage not configured');
      }

      const file = this.bucket.file(filename);
      const [metadata] = await file.getMetadata();
      return metadata;
    } catch (error) {
      console.error('Error getting image metadata:', error);
      throw error;
    }
  }

  /**
   * Generate thumbnail (placeholder for future implementation)
   */
  private async generateThumbnail(
    fileBuffer: Buffer,
    originalFilename: string,
    contentType: string
  ): Promise<void> {
    // This is a placeholder for thumbnail generation
    // You can implement image resizing using libraries like sharp or jimp
    console.log('Thumbnail generation requested for:', originalFilename);
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File, options: ImageUploadOptions): { success: boolean; error?: string } {
    // Check file size
    if (file.size > (options.maxSize || DEFAULT_OPTIONS.maxSize!)) {
      return {
        success: false,
        error: `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${(options.maxSize! / 1024 / 1024).toFixed(2)}MB`,
      };
    }

    // Check file type
    const allowedTypes = options.allowedTypes || DEFAULT_OPTIONS.allowedTypes!;
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
      };
    }

    return { success: true };
  }

  /**
   * Check if service is available
   */
  isAvailable(): boolean {
    return !!this.bucket;
  }

  /**
   * Get storage bucket info
   */
  getBucketInfo(): { name: string; location?: string } | null {
    if (!this.bucket) return null;
    
    return {
      name: this.bucket.name,
      location: this.bucket.location,
    };
  }
}

// Export singleton instance
export const imageUploadService = ImageUploadService.getInstance();
