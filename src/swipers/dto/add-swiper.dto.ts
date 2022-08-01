import { ApiProperty } from '@nestjs/swagger';

export class AddSwiperDto {
  @ApiProperty({
    description: 'home',
  })
  tag: string;

  @ApiProperty({
    default: 'image',
    description: 'image',
    enum: ['image', 'video'],
  })
  type?: string;

  @ApiProperty({
    description: '图片地址',
  })
  imageUrl: string;

  @ApiProperty({
    description: '排序',
    default: 0,
  })
  sort: number;
}
