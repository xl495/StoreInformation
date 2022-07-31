import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddProductDto } from './dto/add-product.dto';
import { EditProductDto } from './dto/edit-product.dto';

import { ShopProductService } from './shop-product.service';
@Controller('shop/product')
@ApiTags('商品')
export class ShopProductController {
  constructor(private readonly productService: ShopProductService) {}
  @ApiOperation({
    summary: '获取商品详情',
  })
  @Get()
  async getDetail() {
    return [];
  }

  @ApiOperation({
    summary: '添加商品',
  })
  @Post()
  async add(@Body() product: AddProductDto) {
    return this.productService.add(product);
  }

  @ApiOperation({
    summary: '编辑商品',
  })
  @Put()
  async edit(@Body() product: EditProductDto) {
    const { _id, ...editData } = product;
    return this.productService.edit(_id, editData);
  }

  @ApiOperation({
    summary: '删除商品',
  })
  @Delete()
  async remove() {
    return [];
  }
}
