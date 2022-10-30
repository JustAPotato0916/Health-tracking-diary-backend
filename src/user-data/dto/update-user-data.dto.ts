import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDataDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  facebookUID: string;

  @ApiProperty()
  twitterUID: string;

  @ApiProperty()
  profilePhotoUrl: string;
}
