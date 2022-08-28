import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitsModule } from './habits/habits.module';
import { UsersModule } from './users/users.module';
import { CatalogModule } from './catalog/catalog.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot(),
            MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_BASE}`), 
            UsersModule, 
            HabitsModule,                         
            CatalogModule,             
            CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
