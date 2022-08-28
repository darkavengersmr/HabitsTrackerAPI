import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categories, CategoriesSchema } from './schemas/categories.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Categories.name, schema: CategoriesSchema, collection: "categories"}]), 
            JwtModule.register({ secret: process.env.PRIVATE_KEY || 'SECRET_PRIVATE_KEY', 
                                 signOptions: {
                                        expiresIn: '48h'
                                    }})],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
