import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document} from 'mongoose'

export type CatalogDocument = Catalog & Document

@Schema()
export class Catalog {
    @ApiProperty({example: 'Не забудь про зарядку', description: 'Название привычки'})
    @Prop({ required: true })
    title: string

    @ApiProperty({example: 'fitness', description: 'Категория привычки'})
    @Prop({ required: true })
    category: string

    @ApiProperty({example: 'Посвятите первые 10 минут с утра зарядке. Оживлённая прогулка или 10-минутный комплекс упражнений — идеальный способ ускорить метаболизм', 
                  description: 'Подробное описание привычки'})
    @Prop({ required: true })
    detail: string

}

export const CatalogSchema = SchemaFactory.createForClass(Catalog)