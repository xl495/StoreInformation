import { DbModule } from '@app/db';
import { Menu } from '@app/db/schemas/menu.schemas';
import { User } from '@app/db/schemas/user.schemas';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        const SECERT = configService.get('SECERT');
        return {
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRESIN'),
          },
          secret: SECERT,
        };
      },
      inject: [ConfigService],
    }),
    DbModule.forRoot('MONGO_URI'),
    DbModule.forFeature([User, Menu]),
    // ThrottlerModule.forRoot({
    //   ttl: 60, // 1分钟
    //   limit: 50, // 限制请求10次
    // }),
    AuthModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
  exports: [JwtModule],
})
export class AppModule {}
