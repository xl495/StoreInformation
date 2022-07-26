import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddCategoryDto } from './dto/add-category.dto';
import { ShopCategoryService } from './shop-category.service';

@ApiTags('商品分类')
@Controller('shop/category')
export class ShopCategoryController {
  constructor(private CategoryService: ShopCategoryService) {}
  @ApiOperation({
    summary: '获取商品分类列表',
  })
  @Get()
  getList() {
    return this.CategoryService.getList();
  }

  @ApiOperation({
    summary: '添加商品分类',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  add(@Body() addData: AddCategoryDto) {
    return this.CategoryService.add(addData);
  }
}
