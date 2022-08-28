import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document} from 'mongoose'

export type CategoriesDocument = Categories & Document

@Schema()
export class Categories {
    @ApiProperty({example: 'Фитнес', description: 'Название категории'})
    @Prop({ required: true })
    title: string

    @ApiProperty({example: 'fitness', description: 'Имя файла с картинкой категории'})
    @Prop({ required: true })
    file: string
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories)