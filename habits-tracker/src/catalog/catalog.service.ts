import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatalogDto } from './dto/catalog.dto';
import { Catalog, CatalogDocument } from './schemas/catalog.schema';

@Injectable()
export class CatalogService {
    constructor(@InjectModel(Catalog.name) private CatalogModel: Model<CatalogDocument>) {
    }

    async getAll(): Promise<Catalog[]> {
        return await this.CatalogModel.find().exec() 
    }

    async getById(id: string): Promise<Catalog>  {
        return await this.CatalogModel.findById(id).exec()
    }

    async create(catalogDto: CatalogDto): Promise<Catalog> {
        const newCatalog = new this.CatalogModel(catalogDto)
        return newCatalog.save()
    }

    async remove(id: string): Promise<Catalog> {
        return this.CatalogModel.findByIdAndRemove(id)
    }

    async update(catalogDto: CatalogDto, id: string): Promise<Catalog> {
        return this.CatalogModel.findByIdAndUpdate(id, catalogDto, {new: true})
    }
}
