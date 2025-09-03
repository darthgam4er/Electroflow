
'use server';

import { adminStorage } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    return { success: false, error: 'No file provided.' };
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const bucket = adminStorage.bucket();
  const fileUpload = bucket.file(`uploads/${fileName}`);

  try {
    await fileUpload.save(fileBuffer, {
      metadata: {
        contentType: file.type,
      },
    });

    // Make the file public and get the URL
    await fileUpload.makePublic();
    const publicUrl = fileUpload.publicUrl();

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error: 'Failed to upload file.' };
  }
}
