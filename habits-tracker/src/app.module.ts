import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [HabitsModule, MongooseModule.forRoot('mongodb://192.168.32.64:27017/habits_tracker')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
