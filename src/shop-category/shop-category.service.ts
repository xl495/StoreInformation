import { ShopCategory } from '@app/db/schemas/shop-category.schemas';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { AddCategoryDto } from './dto/add-category.dto';
import { EditCategoryDto } from './dto/edit-category.dto';
import { RemoveCategoryDto } from './dto/remove-category.dto';

@Injectable()
export class ShopCategoryService {
  constructor(
    @Inject(ShopCategory.name)
    private readonly shopCategoryModel: ReturnModelType<typeof ShopCategory>,
  ) {}
  async getList() {
    const data = await this.shopCategoryModel.find();
    // 遍历先把自己加到父级下
    data.forEach((item) => {
      data.forEach((items) => {
        if (String(item._id) === items.parentId) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (!item._doc.children) item._doc.children = [];
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item._doc.children.push(items);
        }
      });
    });

    const cate = data.filter((item) => !item.parentId);
    return cate;
  }

  async add(addData: AddCategoryDto) {
    return this.shopCategoryModel.create(addData);
  }

  // 修改
  async edit(editData: EditCategoryDto) {
    return this.shopCategoryModel.findByIdAndUpdate(editData.id, {
      name: editData.name,
    });
  }

  async remove(removeData: RemoveCategoryDto) {
    const isFindChild = await this.shopCategoryModel.find({
      parentId: removeData.id,
    });

    if (isFindChild.length !== 0) {
      throw new HttpException(
        '删除分类存在子级, 请删除子级后重试!',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    const remove = await this.shopCategoryModel.findByIdAndRemove(
      removeData.id,
    );

    return (
      remove || new HttpException('未找到ID', HttpStatus.PRECONDITION_FAILED)
    );
  }
}
