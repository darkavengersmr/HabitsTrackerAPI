import { ApiProperty } from "@nestjs/swagger"

export class CatalogDto {
    @ApiProperty({example: 'Не забудь про зарядку', description: 'Название привычки'})
    title: string

    @ApiProperty({example: 'fitness', description: 'Категория привычки'})
    category: string

    @ApiProperty({example: 'Посвятите первые 10 минут с утра зарядке. Оживлённая прогулка или 10-минутный комплекс упражнений — идеальный способ ускорить метаболизм', 
                  description: 'Подробное описание привычки'})
    detail: string
}