import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HabitDto } from './dto/habit.dto';
import { Habit, HabitDocument } from './schemas/habit.schema';

@Injectable()
export class HabitsService {

    constructor(@InjectModel(Habit.name) private habitModel: Model<HabitDocument>) {
    }

    async getAllByUserEmail(id: string): Promise<Habit[]> {
        return await this.habitModel.find().where('user_id').all([id]).exec() 
    }

    async getById(id: string): Promise<Habit>  {
        return await this.habitModel.findById(id).exec()
    }

    async create(createHabitDto: HabitDto): Promise<Habit> {
        const newHabit = new this.habitModel(createHabitDto)
        return newHabit.save()
    }

    async remove(id: string): Promise<Habit> {
        return this.habitModel.findByIdAndRemove(id)
    }

    async update(updateHabitDto: HabitDto, id: string): Promise<Habit> {
        return this.habitModel.findByIdAndUpdate(id, updateHabitDto, {new: true})
    }
}
