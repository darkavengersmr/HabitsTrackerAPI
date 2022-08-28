import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document} from 'mongoose'

export type HabitDocument = Habit & Document

@Schema()
export class Habit {
    @ApiProperty({example: 'Пройти 10000 шагов', description: 'Название привычки'})
    @Prop({ required: true })
    title: string

    @ApiProperty({example: 'fitness', description: 'Категория привычки'})
    @Prop({ required: true })
    category: string

    @ApiProperty({example: '{"2022-01-01": 3, "2022-01-02": 4}', description: 'Отслеживание по датам'})
    @Prop(raw({}))
    tracker: {
        [key: string]: number
    }

    @ApiProperty({example: '630a004c2173bfdddc63400a', description: 'ID пользователя'})
    @Prop({ required: true })
    user_id: string

}

export const HabitSchema = SchemaFactory.createForClass(Habit)