/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [FileUploadController],
  providers: [CloudinaryProvider, FileUploadService, FileUploadRepository],
})
export class FileUploadModule {}
