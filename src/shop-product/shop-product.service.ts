import { ShopProduct } from '@app/db/schemas/shop-product.schemas';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class ShopProductService {
  constructor(
    @Inject(ShopProduct.name)
    private readonly productModel: ReturnModelType<typeof ShopProduct>,
  ) {}

  async getDetail(id: string) {
    return this.productModel.findById(id);
  }

  async add(product: AddProductDto) {
    return this.productModel.create(product);
  }

  async edit(id: string, editData: any) {
    return this.productModel.findByIdAndUpdate(id, editData);
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
