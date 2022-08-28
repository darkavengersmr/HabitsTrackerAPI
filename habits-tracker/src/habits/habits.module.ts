import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { HabitsController } from "./habits.controller";
import { HabitsService } from "./habits.service";
import { Habit, HabitSchema } from "./schemas/habit.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Habit.name, schema: HabitSchema, collection: "habits"}]), 
              JwtModule.register({ secret: process.env.PRIVATE_KEY || 'SECRET_PRIVATE_KEY', 
                                   signOptions: {
                                        expiresIn: '48h'
                                    }})],
    providers: [HabitsService],
    controllers: [HabitsController]
})

export class HabitsModule {}