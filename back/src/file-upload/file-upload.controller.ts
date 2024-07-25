import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Express } from 'express';

@ApiTags('file-upload')
@Controller('uploadfile')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @ApiOperation({ summary: 'Subir un archivo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a cargar',
    type: 'multipart/form-data',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Archivo cargado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Error al cargar el archivo. El tamaño del archivo puede ser mayor a 200KB o el tipo de archivo no es soportado.',
  })
  @ApiResponse({
    status: 415,
    description: 'Tipo de archivo no soportado.',
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // 200KB
            message: 'El tamaño del archivo debe ser menor o igual a 200KB.',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.jpeg|.webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadFile(file);
  }
}
