import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { Catalog, CatalogSchema } from './schemas/catalog.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Catalog.name, schema: CatalogSchema, collection: "catalog"}]), 
            JwtModule.register({ secret: process.env.PRIVATE_KEY || 'SECRET_PRIVATE_KEY', 
                                 signOptions: {
                                        expiresIn: '48h'
                                    }})],
  controllers: [CatalogController],
  providers: [CatalogService]
})
export class CatalogModule {}
