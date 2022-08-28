import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRequestWithUserInfo } from '../interfaces/interface';
import { UserJwtGuard } from '../users/user.jwt.guard';
import { HabitDto } from './dto/habit.dto';
import { HabitsService } from './habits.service';
import { Habit } from './schemas/habit.schema';

@ApiTags('Привычки')
@ApiBearerAuth()
@Controller('api')
export class HabitsController {

    constructor(private readonly habitsService: HabitsService) {
    }    

    @ApiOperation({summary: 'Список привычек пользователя'})
    @ApiResponse({status: 200, type: Habit}) 
    @UseGuards(UserJwtGuard)   
    @Get('/habits')
    async getAll(@Req() req: IRequestWithUserInfo): Promise<Habit[]> {           
        return await this.habitsService.getAllByUserEmail(req.user.id)
    }

    @ApiOperation({summary: 'Информация о выбранной привычке'})
    @ApiResponse({status: 200, type: Habit})
    @UseGuards(UserJwtGuard)
    @Get('/habit/:id')
    async getHabit(@Param('id') id: string, @Req() req: IRequestWithUserInfo): Promise<Habit> {
        const habbit = await this.habitsService.getById(id)
        if (habbit.user_id === req.user.id) {
            return habbit
        } else {
            throw new UnauthorizedException({message: 'Это не ваша привычка! Доступ запрещен'}) 
        }        
    }

    @ApiOperation({summary: 'Создание новой привычки'})
    @ApiResponse({status: 201, type: Habit})
    @UseGuards(UserJwtGuard)
    @Post('/habit')
    @HttpCode(HttpStatus.CREATED)
    async createHabit(@Body() createHabitDto: HabitDto, @Req() req: IRequestWithUserInfo): Promise<Habit> {        
        if (createHabitDto.user_id === req.user.id) {
            return await this.habitsService.create(createHabitDto)
        } else {
            throw new UnauthorizedException({message: 'Вы не можете создавать привычки для других пользователей'}) 
        }        
    }

    @ApiOperation({summary: 'Удаление привычки'})
    @ApiResponse({status: 200, type: Habit})
    @UseGuards(UserJwtGuard)
    @Delete('/habit/:id')    
    async removeHabit(@Param('id') id: string, @Req() req: IRequestWithUserInfo): Promise<Habit> {
        const habbit = await this.habitsService.getById(id)
        if (habbit.user_id === req.user.id) {
            return await this.habitsService.remove(id)
        } else {
            throw new UnauthorizedException({message: 'Нельзя удалять чужие привычки'}) 
        }        
    }

    @ApiOperation({summary: 'Изменение привычки'})
    @ApiResponse({status: 200, type: Habit})
    @UseGuards(UserJwtGuard)
    @Put('/habit/:id')    
    async updateHabit(@Body() updateHabitDto: HabitDto, 
                @Param('id') id: string, 
                @Req() req: IRequestWithUserInfo): Promise<Habit> {
        if (updateHabitDto.user_id === req.user.id) {
            return await this.habitsService.update(updateHabitDto, id)
        } else {
            throw new UnauthorizedException({message: 'Вы не можете изменять привычки других пользователей'}) 
        }        
    }
}
