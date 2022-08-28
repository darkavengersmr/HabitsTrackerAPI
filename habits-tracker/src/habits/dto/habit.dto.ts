import { ApiProperty } from "@nestjs/swagger"

export class HabitDto {
    @ApiProperty({example: '630a004c2173bfdddc63400a', description: 'ID пользователя'})
    user_id: string

    @ApiProperty({example: 'Пройти 10000 шагов', description: 'Название привычки'})
    title: string

    @ApiProperty({example: 'fitness', description: 'Категория привычки'})
    category: string

    @ApiProperty({example: '{"2022-01-01": 3, "2022-01-02": 4}', description: 'Отслеживание по датам'})
    tracker: {
        [key: string]: number
    }
}