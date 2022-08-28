import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { IJwtToken } from 'src/interfaces/interface';
import { ValidateUserDto } from './dto/validate-user.dto';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService) {
    }

    async getById(id: string): Promise<User>  {        
        return await this.userModel.findById(id).exec()
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await new this.userModel(createUserDto)
        return newUser.save()
    }

   async getUserByEmail(email: string): Promise<User> {        
        const user = await this.userModel.findOne().where('email').all([email]).exec()        
        return user;
   }

   private async generateToken(user: User) {
        const payload = { username: user.username, email: user.email, id: user._id }
        return { token: this.jwtService.sign(payload) }  
   }

   private async validateUser(userDto: ValidateUserDto) {
        const user = await this.getUserByEmail(userDto.email)              
        const passwordValid = await compare(userDto.password, user.password)
        if (user && passwordValid) {
            return user
        } else {
            throw new UnauthorizedException({message: 'Некорректный логин или пароль'})
        }
   }

   async registration(userDto: CreateUserDto): Promise<IJwtToken> {
        const candidate = await this.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        } else {
            const hashPassword = await hash(userDto.password, 5)
            const user = await this.create({...userDto, password: hashPassword})        
            return this.generateToken(user)
        }
   }

   async login(userDto: ValidateUserDto): Promise<IJwtToken> {
        const user = await this.validateUser(userDto)        
        return this.generateToken(user)
   }
   
}
