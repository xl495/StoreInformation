import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddCategoryDto } from './dto/add-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';
import { RemoveCategoryDto } from './dto/remove-category.dto';
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
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  @Post()
  add(@Body() addData: AddCategoryDto) {
    return this.CategoryService.add(addData);
  }

  @ApiOperation({
    summary: '编辑商品分类',
  })
  @Put()
  edit(@Body() editData: EditCategoryDto) {
    return this.CategoryService.edit(editData);
  }

  @ApiOperation({
    summary: '删除商品分类',
  })
  @Delete()
  remove(@Body() removeData: RemoveCategoryDto) {
    return this.CategoryService.remove(removeData);
  }
}
