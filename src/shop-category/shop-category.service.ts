import { ShopCategory } from '@app/db/schemas/shop-category.schemas';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { AddCategoryDto } from './dto/add-category.dto';

@Injectable()
export class ShopCategoryService {
  constructor(
    @Inject(ShopCategory.name)
    private readonly shopCategoryModel: ReturnModelType<typeof ShopCategory>,
  ) {}
  async getList() {
    return this.shopCategoryModel.find();
  }

  async add(addData: AddCategoryDto) {
    return this.shopCategoryModel.create(addData);
  }
}
