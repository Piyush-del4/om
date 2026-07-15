import cloudinary from 'cloudinary';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  api_key: process.env.CLOUDINARY_API_KEY ?? '',
  api_secret: process.env.CLOUDINARY_API_SECRET ?? '',
  secure: true,
});

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string,
  fileName: string,
  options: Record<string, unknown> = {}
): Promise<cloudinary.UploadApiResponse> => {
  const apiKey = process.env.CLOUDINARY_API_KEY ?? '';
  if (!apiKey || apiKey === 'your_api_key' || apiKey.includes('replace')) {
    // Local fallback for local development/testing without real Cloudinary credentials
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const fileExt = '.jpg';
    const localFileName = `${fileName}${fileExt}`;
    const localFilePath = path.join(uploadsDir, localFileName);
    fs.writeFileSync(localFilePath, fileBuffer);

    const port = process.env.PORT || '5000';
    const secure_url = `http://localhost:${port}/uploads/${localFileName}`;

    return {
      secure_url,
      public_id: fileName,
    } as cloudinary.UploadApiResponse;
  }

  const stream = new Readable();
  stream.push(fileBuffer);
  stream.push(null);
  return new Promise((resolve, reject) => {
    const upload = cloudinary.v2.uploader.upload_stream(
      { folder, public_id: fileName, ...options },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as cloudinary.UploadApiResponse);
      }
    );
    stream.pipe(upload);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<cloudinary.DeleteApiResponse> => {
  const apiKey = process.env.CLOUDINARY_API_KEY ?? '';
  if (!apiKey || apiKey === 'your_api_key' || apiKey.includes('replace')) {
    return { result: 'ok' } as any;
  }
  return cloudinary.v2.uploader.destroy(publicId);
};
