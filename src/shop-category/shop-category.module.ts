import { Module } from '@nestjs/common';
import { ShopCategoryController } from './shop-category.controller';
import { ShopCategoryService } from './shop-category.service';

@Module({
  controllers: [ShopCategoryController],
  providers: [ShopCategoryService],
})
export class ShopCategoryModule {}
