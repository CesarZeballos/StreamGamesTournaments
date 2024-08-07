import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class AddFriendDto {
    @ApiProperty({
        description: 'ID of the user',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @ApiProperty({
        description: 'ID of the friend',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    friendId: string

}