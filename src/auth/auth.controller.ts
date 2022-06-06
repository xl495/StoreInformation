import { User } from '@app/db/schemas/user.schemas';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';
import { ConfigService } from '@nestjs/config';
import { CaptchaService } from './captcha.service';

export type UserDocument = DocumentType<User>;

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private captcha: CaptchaService,
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
  ) {}
  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    const currentUser = await this.userModel.findOne({
      username,
    });
    if (currentUser) {
      throw new BadRequestException('用户名已存在!');
    }
    const user = await this.userModel.create({
      username,
      password,
    });
    return user;
  }

  @Get('code')
  @ApiOperation({
    summary: '获取验证码',
  })
  async getAuthCode(@Req() req) {
    const svgData = await this.captcha.getCaptche();
    req.session.code = svgData.text;
    return svgData.data;
  }

  @Post('login')
  @ApiOperation({
    summary: '登录',
  })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      token: this.jwtService.sign({
        id: user._id,
      }),
    };
  }

  @Get('user')
  @ApiOperation({
    summary: '获取个人信息',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDocument) {
    return user;
  }
}
