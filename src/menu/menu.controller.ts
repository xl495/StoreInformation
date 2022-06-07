import { Menu } from '@app/db/schemas/menu.schemas';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { AddMenuDto } from './dto/menu.dto';

@Controller('menu')
@ApiTags('菜单')
export class MenuController {
  constructor(
    @Inject(Menu.name) private readonly menuModel: ReturnModelType<typeof Menu>,
  ) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: '获取路由列表',
  })
  @ApiBearerAuth()
  async getList() {
    const menu = await this.menuModel.find();
    menu.forEach((item) => {
      menu.map((menuItem) => {
        if (String(menuItem.parent_id) === String(item._id)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (!item._doc.children) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item._doc.children = [];
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item._doc.children.push(menuItem);
        }
      });
    });
    return menu;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: '添加路由',
  })
  @ApiBearerAuth()
  async add(@Body() dto: AddMenuDto) {
    const {
      path,
      name,
      component,
      redirect = '/',
      icon,
      single,
      title,
      sort = 0,
      parent_id = '',
    } = dto;

    const isFindMenuName = await this.menuModel.findOne({
      name,
    });
    const isFindMenuTitle = await this.menuModel.findOne({
      title,
    });

    if (isFindMenuName || isFindMenuTitle) {
      throw new BadRequestException('该组件名称已存在!');
    }
    const menuData = await this.menuModel.create({
      parent_id,
      path,
      name,
      component,
      redirect,
      meta: {
        icon,
        single,
        title,
        sort,
      },
    });
    return menuData;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const menu = await this.menuModel.findById(id);
    if (!menu) {
      throw new BadRequestException('该菜单不存在!');
    }
    await this.menuModel.findByIdAndRemove(id);
    return {
      code: 0,
      message: '删除成功',
    };
  }
}
