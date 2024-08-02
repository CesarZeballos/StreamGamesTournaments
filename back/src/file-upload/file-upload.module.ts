import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
	controllers: [FileUploadController],
	providers: [FileUploadService, CloudinaryProvider],
})
export class FileUploadModule {}
