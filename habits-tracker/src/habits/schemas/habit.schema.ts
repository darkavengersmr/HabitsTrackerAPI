import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from 'mongoose'
import { ITracker } from "src/interfaces/interface";

export type HabitDocument = Habit & Document

@Schema()
export class Habit {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    category: string

    @Prop(raw({}))
    tracker: {
        [key: string]: number
    }

}

export const HabitSchema = SchemaFactory.createForClass(Habit)