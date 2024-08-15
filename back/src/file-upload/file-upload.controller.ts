import {
	Controller,
	Post,
	UploadedFile,
	UseInterceptors,
	ParseFilePipe,
	FileTypeValidator,
	MaxFileSizeValidator,
	BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiOperation, ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';

@ApiTags('File-Upload')
@Controller('uploadfile')
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Post()
	@ApiOperation({ summary: 'Subir un archivo' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Archivo a cargar',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 1048576,
						message:
							'El tamaño del archivo debe ser menor o igual a 1 MB.',
					}),
					new FileTypeValidator({
						fileType: /(.jpg|.png|.jpeg|.webp)/,
					}),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		if (!file) {
			throw new BadRequestException('No se ha subido ningún archivo');
		}
		return this.fileUploadService.uploadFile(file);
	}
}
