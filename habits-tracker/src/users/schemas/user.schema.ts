import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types} from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {    
    _id: Types.ObjectId | string

    @ApiProperty({example: 'Адам', description: 'Имя пользователя'})
    @Prop({ required: true })
    username: string
    
    @ApiProperty({example: 'adam@google.com', description: 'Email пользователя'})
    @Prop({ required: true })
    email: string

    @ApiProperty({example: 'AdamsSecret', description: 'Пароль пользователя'})
    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)