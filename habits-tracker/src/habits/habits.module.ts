import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HabitsController } from "./habits.controller";
import { HabitsService } from "./habits.service";
import { Habit, HabitSchema } from "./schemas/habit.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Habit.name, schema: HabitSchema}])],
    providers: [HabitsService],
    controllers: [HabitsController]
})

export class HabitsModule {}