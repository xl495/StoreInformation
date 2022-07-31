import { ApiProperty } from '@nestjs/swagger';

export class ProductSkuDto {
  @ApiProperty({
    description: 'sku图片',

    type: String,
    example: 'http://www.baidu.com',
  })
  logo: string;

  @ApiProperty({
    description: 'sku名称',
  })
  name: string;

  @ApiProperty({
    description: 'sku价格',
  })
  price: number;

  @ApiProperty({
    description: 'sku库存',
  })
  stock: number;
}
