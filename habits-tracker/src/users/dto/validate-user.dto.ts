import { ApiProperty } from "@nestjs/swagger"

export class ValidateUserDto {    
    @ApiProperty({example: 'adam@google.com', description: 'Email пользователя'})    
    email: string

    @ApiProperty({example: 'AdamsSecret', description: 'Пароль пользователя'})
    password: string    
}