import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserCoverDto {
  @ApiProperty()
  profileCoverUrl: string;
}
