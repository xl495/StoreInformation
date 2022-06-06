import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { CaptchaService } from './captcha.service';
import { JwtStrateggy } from './jwt.strategy';
import { LocalStrateggy } from './local.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [LocalStrateggy, JwtStrateggy, CaptchaService],
})
export class AuthModule {}
