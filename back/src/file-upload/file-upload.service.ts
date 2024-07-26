/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class FileUploadService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof import('cloudinary').v2,
    private readonly fileUploadRepository: FileUploadRepository,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    // Usa el repositorio para subir la imagen
    return this.fileUploadRepository.uploadFile(file);
  }
}
