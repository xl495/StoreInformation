import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';

export class ShopCategory {
  @Prop()
  @ApiProperty({
    description: '商品名称',
    example: '红米1',
  })
  name: string;
}
