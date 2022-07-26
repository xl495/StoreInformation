import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Inject, Req } from '@nestjs/common';
import { User } from '@app/db/schemas/user.schemas';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';

export class LocalStrateggy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject(User.name) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      session: true,
      passReqToCallback: true,
    });
  }

  async validate(@Req() req, username: string, password: string) {
    console.log(req);

    const { body = { code: 'bodyCode' }, session = { code: 'sessionCode' } } =
      req;

    // 验证码白名单 sessionCode
    if (session.code === undefined) session.code = 'sessionCode';

    // 不验证大小写
    if (
      (body.code && String(body.code).toLocaleUpperCase()) !==
      (session.code && String(session.code).toLocaleUpperCase())
    ) {
      throw new BadRequestException('验证码错误!');
    }

    const user = await this.userModel
      .findOne({
        username,
      })
      .select('+password');

    if (!user) {
      throw new BadRequestException('用户名不正确!');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确!');
    }

    // 验证通过 清除 session
    // req.session.code = null;

    return user;
  }
}
