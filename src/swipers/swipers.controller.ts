import { Swiper } from '@app/db/schemas/swipers.schemas';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { AddSwiperDto } from './dto/add-swiper.dto';

@Controller('swipers')
@ApiTags('轮播图片')
export class SwipersController {
  constructor(
    @Inject(Swiper.name)
    private readonly swiperModel: ReturnModelType<typeof Swiper>,
  ) {}

  @Get()
  @ApiOperation({
    summary: '获取轮播图片',
  })
  async getSwipers(@Query('tag') tag?: string) {
    return this.swiperModel.find({
      tag: tag || 'home',
    });
  }

  @Post()
  @ApiOperation({
    summary: '添加轮播',
  })
  async addSwiper(@Body() swiper: AddSwiperDto) {
    return await this.swiperModel.create(swiper);
  }

  @Delete()
  @ApiOperation({
    summary: '删除轮播',
  })
  async removeSwiper(@Query('id') id: string) {
    return await this.swiperModel.findByIdAndRemove(id);
  }
}
