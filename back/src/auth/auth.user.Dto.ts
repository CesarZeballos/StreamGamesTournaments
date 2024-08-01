import {
	IsString,
	IsEmail,
	IsNotEmpty,
	IsDateString,
	IsOptional,
	IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '@prisma/client';


export class SignInDto {
	@ApiProperty({
	  description: 'Dirección de correo electrónico del usuario',
	  example: 'user@example.com',
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;
  
	@ApiProperty({
	  description: 'Token de Firebase del usuario',
	  example: 'someFirebaseToken',
	})
	@IsString()
	@IsNotEmpty()
	tokenFirebase: string;
  }

  export class CreateUserDto extends SignInDto {
	@ApiProperty({
	  description: 'Apodo del usuario',
	  example: 'JohnDoe',
	})
	@IsString()
	@IsNotEmpty()
	nickname: string;
  
	@ApiProperty({
	  description: 'Fecha de nacimiento del usuario',
	  example: '2000-01-01T00:00:00.000Z',
	})
	@IsNotEmpty()
	@IsDateString()
	birthdate: string;
  }

  export class UpdateUserDto extends PartialType(CreateUserDto) {

	@ApiPropertyOptional({
	  description: 'URL del stream del usuario',
	  example: 'http://example.com/stream',
	})
	@IsOptional()
	@IsString()
	urlStream?: string;

	@ApiPropertyOptional({
		description: 'URL profile del usuario',
		example: 'http://example.com/stream',
	  })
	  @IsOptional()
	  @IsString()
	  urlProfile?: string;
	
	  @ApiPropertyOptional({
		description: 'Estado del usuario',
		example: true,
	  })
	  @IsOptional()
	  @IsBoolean()
	  state?: boolean;
	}

	export class UserDtoForAdmin extends PartialType(UpdateUserDto){
		@ApiPropertyOptional({
			description: 'Role del usuario',
			example: 'user',
		  })
		  @IsOptional()
		  @IsString()
		  role?: Role;
		}