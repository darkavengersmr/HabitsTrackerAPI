import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habit, HabitDocument } from './schemas/habit.schema';

@Injectable()
export class HabitsService {

    constructor(@InjectModel(Habit.name) private habitModel: Model<HabitDocument>) {
    }

    async getAll(): Promise<Habit[]> {
        return this.habitModel.find().exec()
    }

    async getById(id: string): Promise<Habit>  {
        return this.habitModel.findById(id).exec()
    }

    async create(createHabitDto: CreateHabitDto): Promise<Habit> {
        const newHabit = new this.habitModel(createHabitDto)
        return newHabit.save()
    }

    async remove(id: string): Promise<Habit> {
        return this.habitModel.findByIdAndRemove(id)
    }

    async update(updateHabitDto: UpdateHabitDto, id: string): Promise<Habit> {
        return this.habitModel.findByIdAndUpdate(id, updateHabitDto, {new: true})
    }
}
