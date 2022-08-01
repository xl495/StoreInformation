import { Prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class Swiper {
  @Prop()
  @ApiProperty({
    default: 'home',
    description: '主页',
  })
  tag: string;
  @Prop()
  @ApiProperty({
    enum: ['image', 'video'],
    description: '类型',
  })
  type: string;
  @Prop()
  @ApiProperty({
    description: '图片地址',
  })
  imageUrl: string;
  @Prop()
  @ApiProperty({
    description: '排序',
    default: 0,
  })
  sort: number;
}
