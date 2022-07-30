import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class RemoveCategoryDto {
  @ApiProperty({
    required: true,
  })
  id!: ObjectId;
}
