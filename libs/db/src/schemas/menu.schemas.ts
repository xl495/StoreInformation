import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, Ref, Prop } from '@typegoose/typegoose';

export class MeteData {
  @Prop()
  @ApiProperty({
    description: '图标',
    example: 'icon',
  })
  icon: string;
  @Prop()
  @ApiProperty({
    description: '自定义选项',
    example: false,
  })
  single: boolean;
  @Prop()
  @ApiProperty({
    description: '标题',
    example: '标题',
  })
  title: string;
  @Prop()
  @ApiProperty({
    description: '排序',
    example: '0',
  })
  @Prop()
  sort?: number;
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Menu {
  @Prop({ ref: () => Menu, type: () => String })
  @ApiProperty({
    description: '父级Id',
    default: '',
  })
  parent_id?: Ref<Menu, string>;
  @Prop()
  @ApiProperty({
    description: '路径',
    example: '/',
  })
  path: string;
  @Prop()
  @ApiProperty({
    description: '名称',
    example: 'index',
  })
  name: string;
  @Prop()
  @ApiProperty({
    description: '组件路径',
    example: '~/views/about/index.vue',
  })
  component: string;
  @Prop()
  @ApiProperty({
    description: '重定向',
    example: '/',
  })
  redirect: string;
  @Prop()
  meta?: MeteData;
}
