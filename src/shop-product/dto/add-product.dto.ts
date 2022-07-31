import { ApiProperty } from '@nestjs/swagger';
import { ProductSkuDto } from './sku.dto';

export class AddProductDto {
  @ApiProperty({
    description: '商品ID',
  })
  name: string;
  @ApiProperty({
    description: '商品分类ID',
  })
  categroyId: string;

  @ApiProperty({
    description: '商品描述',
  })
  description: string;

  @ApiProperty({
    description: '商品图片',
    type: [String],
  })
  imageUrl: string[];
  @ApiProperty({
    description: '商品价格',
  })
  price: number;
  @ApiProperty({
    description: '商品SKU',
    type: [ProductSkuDto],
  })
  sku?: ProductSkuDto[];
}
