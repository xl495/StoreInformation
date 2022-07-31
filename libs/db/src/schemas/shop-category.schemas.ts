import { ApiProperty } from '@nestjs/swagger';
import { Prop, Ref } from '@typegoose/typegoose';

export class ShopCategory {
  @Prop()
  @ApiProperty({
    description: '商品分类名称',
    example: '红米1',
  })
  name: string;
  @Prop({ ref: () => ShopCategory, type: () => String })
  @ApiProperty({
    description: '父级Id',
  })
  public parentId?: Ref<ShopCategory, string>;
}
