import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesDto } from './dto/categories.dto';
import { Categories, CategoriesDocument } from './schemas/categories.schema';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Categories.name) private CategoriesModel: Model<CategoriesDocument>) {
    }

    async getAll(): Promise<Categories[]> {
        return await this.CategoriesModel.find().exec() 
    }

    async getById(id: string): Promise<Categories>  {
        return await this.CategoriesModel.findById(id).exec()
    }

    async create(categoriesDto: CategoriesDto): Promise<Categories> {
        const newCategories = new this.CategoriesModel(categoriesDto)
        return newCategories.save()
    }

    async remove(id: string): Promise<Categories> {
        return this.CategoriesModel.findByIdAndRemove(id)
    }

    async update(categoriesDto: CategoriesDto, id: string): Promise<Categories> {
        return this.CategoriesModel.findByIdAndUpdate(id, categoriesDto, {new: true})
    }
}
