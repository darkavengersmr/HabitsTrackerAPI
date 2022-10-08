import { Body, Controller, Get, HttpCode, HttpStatus, Req, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IJwtToken, IRequestWithUserInfo } from 'src/interfaces/interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UserInfo } from './schemas/user-info.schema';
import { User } from './schemas/user.schema';
import { UserJwtGuard } from './user.jwt.guard';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'Информация о пользователе'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(UserJwtGuard)
    @Get('/user')
    async getUser(@Req() req: IRequestWithUserInfo): Promise<UserInfo> {
        const user = await this.usersService.getById(req.user.id)
        return {username: user.username, email: user.email, id: user._id.toString()}
    }

    @ApiOperation({summary: 'Регистрация нового пользователя'})
    @ApiResponse({status: 201, type: User})
    @Post('/registration')
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<IJwtToken> {
        return await this.usersService.registration(createUserDto)
    }

    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/login')        
    async loginUser(@Body() userDto: ValidateUserDto): Promise<IJwtToken> {
        return await this.usersService.login(userDto)
    }
}
