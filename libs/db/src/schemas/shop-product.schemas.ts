import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { ShopCategory } from './shop-category.schemas';
import { ShopProductSku } from './shtop-product-sku.schemas';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ShopProduct {
  @Prop()
  @ApiProperty({
    description: '商品名称',
    example: '红米1',
  })
  name: string;

  @Prop({ ref: () => ShopCategory, type: () => String })
  @ApiProperty({
    description: '分类Id',
  })
  public categoryId?: Ref<ShopCategory, string>;

  @Prop()
  @ApiProperty({
    description: '描述',
  })
  description: string;

  @Prop({ type: () => Array })
  @ApiProperty({
    description: '商品详情图片',
  })
  imageUrl: string[];

  @Prop({ type: Number })
  @ApiProperty({
    description: '价格',
  })
  price: number;

  @Prop({ ref: () => ShopProductSku, type: Array })
  @ApiProperty({
    description: '',
    default: [],
  })
  sku?: Ref<ShopProductSku>[];
}
