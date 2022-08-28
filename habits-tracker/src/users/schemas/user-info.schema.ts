import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types} from 'mongoose'

export type UserDocument = UserInfo & Document

@Schema()
export class UserInfo {
    @Prop({ required: true })
    id: string
    
    @ApiProperty({example: 'Адам', description: 'Имя пользователя'})
    @Prop({ required: true })
    username: string
    
    @ApiProperty({example: 'adam@google.com', description: 'Email пользователя'})
    @Prop({ required: true })
    email: string
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo)