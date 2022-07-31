import { Module } from '@nestjs/common';
import { ShopProductService } from './shop-product.service';
import { ShopProductController } from './shop-product.controller';

@Module({
  providers: [ShopProductService],
  controllers: [ShopProductController],
})
export class ShopProductModule {}
