import { ShopProduct } from '@app/db/schemas/shop-product.schemas';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { AddProductSkuDto } from './dto/add-product.dto';

@Injectable()
export class ShopProductService {
  constructor(
    @Inject(ShopProduct.name)
    private readonly productModel: ReturnModelType<typeof ShopProduct>,
  ) {}

  async getDetail() {
    return this.productModel.find();
  }

  async add(product: AddProductSkuDto) {
    return this.productModel.create(product);
  }

  async edit(_id: string, editData: any) {
    return this.productModel.findByIdAndUpdate(_id, editData);
  }

  async remove() {
    return [];
  }
}
