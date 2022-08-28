import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty({example: 'Адам', description: 'Имя пользователя'})
    username: string

    @ApiProperty({example: 'adam@google.com', description: 'Email пользователя'})    
    email: string

    @ApiProperty({example: 'AdamsSecret', description: 'Пароль пользователя'})
    password: string    
}