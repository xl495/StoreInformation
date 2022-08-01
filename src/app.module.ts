import { DbModule } from '@app/db';
import { User } from '@app/db/schemas/user.schemas';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ShopCategoryModule } from './shop-category/shop-category.module';
import { ShopCategory } from '@app/db/schemas/shop-category.schemas';
import { ShopProductModule } from './shop-product/shop-product.module';
import { ShopProduct } from '@app/db/schemas/shop-product.schemas';
import { ShopProductSku } from '@app/db/schemas/shtop-product-sku.schemas';
import { SwipersController } from './swipers/swipers.controller';
import { SwipersModule } from './swipers/swipers.module';
import { Swiper } from '@app/db/schemas/swipers.schemas';

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
    // 连接数据库
    DbModule.forRoot('MONGO_URI'),

    DbModule.forFeature([
      User,
      ShopCategory,
      ShopProduct,
      ShopProductSku,
      Swiper,
    ]),
    ThrottlerModule.forRoot({
      ttl: 60, // 1分钟
      limit: 50, // 限制请求10次
    }),
    AuthModule,
    ShopCategoryModule,
    ShopProductModule,
    SwipersModule,
  ],
  controllers: [AppController, SwipersController],
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
