import { ApiProperty } from '@nestjs/swagger';

export class AddMenuDto {
  @ApiProperty({
    description: '父级Id',
  })
  parent_id?: string;
  @ApiProperty({
    description: '路径',
    example: '/',
  })
  path: string;
  @ApiProperty({
    description: '名称',
    example: 'index',
  })
  name: string;
  @ApiProperty({
    description: '组件路径',
    example: '~/views/about/index.vue',
  })
  component: string;
  @ApiProperty({
    description: '重定向',
    example: '/',
  })
  redirect?: string;
  @ApiProperty({
    description: '路由信息',
  })
  @ApiProperty({
    description: '图标',
    example: 'icon',
  })
  icon: string;
  @ApiProperty({
    description: '自定义选项',
    example: 'false',
  })
  single: boolean;
  @ApiProperty({
    description: '标题',
    example: '标题',
  })
  title: string;
  @ApiProperty({
    description: '排序',
    example: '0',
  })
  sort?: number;
}

export class MeteData {
  @ApiProperty({
    description: '图标',
    example: 'icon',
  })
  icon: string;
  @ApiProperty({
    description: '自定义选项',
    example: false,
  })
  single: boolean;
  @ApiProperty({
    description: '标题',
    example: '标题',
  })
  title: string;
  @ApiProperty({
    description: '排序',
    example: '0',
  })
  sort?: number;
}

export class ResMenuDto {
  @ApiProperty({
    description: '父级Id',
    default: '',
  })
  parent_id?: string;
  @ApiProperty({
    description: '路径',
    example: '/',
  })
  path: string;
  @ApiProperty({
    description: '名称',
    example: 'index',
  })
  name: string;
  @ApiProperty({
    description: '组件路径',
    example: '~/views/about/index.vue',
  })
  component: string;
  @ApiProperty({
    description: '重定向',
    example: '/',
  })
  redirect: string;
  meta?: MeteData;
  @ApiProperty({
    description: '子级',
    example: '/',
  })
  children?: [];
}
