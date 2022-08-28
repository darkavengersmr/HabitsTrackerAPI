import { ApiProperty } from "@nestjs/swagger"

export class CategoriesDto {
    @ApiProperty({example: 'Фитнес', description: 'Название категории'})
    title: string

    @ApiProperty({example: 'fitness', description: 'Имя файла с картинкой категории'})
    file: string
}