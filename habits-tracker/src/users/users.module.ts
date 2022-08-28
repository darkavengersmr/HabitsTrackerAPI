import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema, collection: "users"}]),
            JwtModule.register({ secret: process.env.PRIVATE_KEY || 'SECRET_PRIVATE_KEY', 
                                 signOptions: {
                                    expiresIn: '48h'
                                 }})],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
