import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../users/admin.jwt.guard';
import { UserJwtGuard } from '../users/user.jwt.guard';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';
import { Categories } from './schemas/Categories.schema';

@ApiTags('Категории')
@ApiBearerAuth()
@Controller('api/categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {
    }    

    @ApiOperation({summary: 'Список всех категорий'})
    @ApiResponse({status: 200, type: Categories}) 
    @UseGuards(UserJwtGuard)   
    @Get()
    async getAllCategories(): Promise<Categories[]> {        
        return await this.categoriesService.getAll()
    }

    @ApiOperation({summary: 'Информация о категории'})
    @ApiResponse({status: 200, type: Categories})
    @UseGuards(UserJwtGuard)
    @Get('/:id')
    async getCategoriesById(@Param('id') id: string): Promise<Categories> {        
        return await this.categoriesService.getById(id)        
    }

    @ApiOperation({summary: 'Создание новой категории'})
    @ApiResponse({status: 201, type: Categories})
    @UseGuards(AdminJwtGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createItemInCategories(@Body() categoriesDto: CategoriesDto): Promise<Categories> {                
        return await this.categoriesService.create(categoriesDto)        
    }

    @ApiOperation({summary: 'Удаление категории'})
    @ApiResponse({status: 200, type: Categories})
    @UseGuards(AdminJwtGuard)
    @Delete('/:id')    
    async removeItemFromCategories(@Param('id') id: string): Promise<Categories> {        
        return await this.categoriesService.remove(id)
    }

    @ApiOperation({summary: 'Изменение категории'})
    @ApiResponse({status: 200, type: Categories})
    @UseGuards(AdminJwtGuard)
    @Put('/:id')    
    async updateItemInCategories(@Body() categoriesDto: CategoriesDto, @Param('id') id: string): Promise<Categories> {        
        console.log(categoriesDto, id)
        return await this.categoriesService.update(categoriesDto, id)        
    }
}
