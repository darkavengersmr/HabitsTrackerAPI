import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminJwtGuard } from '../users/admin.jwt.guard';
import { UserJwtGuard } from '../users/user.jwt.guard';
import { CatalogService } from './catalog.service';
import { CatalogDto } from './dto/catalog.dto';
import { Catalog } from './schemas/catalog.schema';

@ApiTags('Каталог привычек')
@ApiBearerAuth()
@Controller('api/catalog')
export class CatalogController {

    constructor(private readonly catalogService: CatalogService) {
    }    

    @ApiOperation({summary: 'Список всех привычек из каталога'})
    @ApiResponse({status: 200, type: Catalog}) 
    @UseGuards(UserJwtGuard)   
    @Get()
    async getAllHabitsFromCatalog(): Promise<Catalog[]> {        
        return await this.catalogService.getAll()
    }

    @ApiOperation({summary: 'Информация о привычке из каталога'})
    @ApiResponse({status: 200, type: Catalog})
    @UseGuards(UserJwtGuard)
    @Get('/:id')
    async getHabitFromCatalog(@Param('id') id: string): Promise<Catalog> {        
        return await this.catalogService.getById(id)        
    }

    @ApiOperation({summary: 'Создание новой привычки в каталоге'})
    @ApiResponse({status: 201, type: Catalog})
    @UseGuards(AdminJwtGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createHabitInCatalog(@Body() catalogDto: CatalogDto): Promise<Catalog> {                
        return await this.catalogService.create(catalogDto)        
    }

    @ApiOperation({summary: 'Удаление привычки из каталога'})
    @ApiResponse({status: 200, type: Catalog})
    @UseGuards(AdminJwtGuard)
    @Delete('/:id')    
    async removeHabitInCatalog(@Param('id') id: string): Promise<Catalog> {        
        return await this.catalogService.remove(id)
    }

    @ApiOperation({summary: 'Изменение привычки в каталоге'})
    @ApiResponse({status: 200, type: Catalog})
    @UseGuards(AdminJwtGuard)
    @Put('/:id')    
    async updateHabitInCatalog(@Body() catalogDto: CatalogDto, @Param('id') id: string): Promise<Catalog> {        
        return await this.catalogService.update(catalogDto, id)        
    }
}
