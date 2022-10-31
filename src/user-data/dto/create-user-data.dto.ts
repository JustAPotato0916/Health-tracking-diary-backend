import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDataDto {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  profilePhotoUrl: string;

  @ApiProperty()
  profileCoverUrl: string;

  @ApiProperty()
  facebookUID: string | null;

  @ApiProperty()
  twitterUID: string | null;
}
