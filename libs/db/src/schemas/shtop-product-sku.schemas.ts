import { Prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class ShopProductSku {
  @Prop()
  @ApiProperty({
    description: 'logo',
    example: 'https://img.yzcdn.cn/vant/logo.png',
  })
  logo: string;

  @Prop()
  @ApiProperty({
    description: '规格名称',
    example: '红米1',
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: '价格',
  })
  price: number;

  @Prop()
  @ApiProperty({
    description: '库存',
  })
  stock: number;
}
