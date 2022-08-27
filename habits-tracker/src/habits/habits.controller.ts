import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { HabitsService } from './habits.service';
import { Habit } from './schemas/habit.schema';

@Controller('habits')
export class HabitsController {

    constructor(private readonly habitsService: HabitsService) {
    }

    @Get()
    getAll(): Promise<Habit[]> {
        return this.habitsService.getAll()
    }

    @Get(':id')
    getHabit(@Param('id') id: string): Promise<Habit> {
        return this.habitsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createHabit(@Body() createHabitDto: CreateHabitDto): Promise<Habit> {
        return this.habitsService.create(createHabitDto)
    }

    @Delete(':id')    
    removeHabit(@Param('id') id: string): Promise<Habit> {
        return this.habitsService.remove(id)
    }

    @Put(':id')    
    updateHabit(@Body() updateHabitDto: UpdateHabitDto, @Param('id') id: string): Promise<Habit> {
        return this.habitsService.update(updateHabitDto, id)
    }
}
