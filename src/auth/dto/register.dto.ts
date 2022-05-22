import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '用户名',
  })
  @MinLength(5)
  @MaxLength(20)
  username: string;
  @ApiProperty({
    description: '密码',
  })
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
