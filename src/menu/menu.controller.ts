import { Menu } from '@app/db/schemas/menu.schemas';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { AddMenuDto } from './dto/menu.dto';

export type MenuItemDto = {
  children?: Menu[];
} & Menu;

@Controller('menu')
@ApiTags('菜单')
export class MenuController {
  constructor(
    @Inject(Menu.name) private readonly menuModel: ReturnModelType<typeof Menu>,
  ) {}
  @Get()
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    description: '获取路由列表',
  })
  // @ApiBearerAuth()
  async getList() {
    const menu = await this.menuModel.find();
    const menus = [];
    menu.forEach((item) => {
      menus.push({
        ...item,
        chindren: [],
      });
    });

    // const resMenu = menus.map((item) => {
    //   menu.map((menuItem) => {
    //     if (String(menuItem.parent_id) === String(item._id)) {
    //       item.children.push(menuItem);
    //     }
    //   });
    //   return item;
    // });

    // console.log(menus);

    return menus;
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

    const isFindMenu = await this.menuModel.findOne({
      name,
    });

    if (isFindMenu) {
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
}
