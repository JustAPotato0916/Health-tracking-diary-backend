import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserData {
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

  @ApiPropertyOptional()
  facebookUID: string | null;

  @ApiPropertyOptional()
  twitterUID: string | null;
}
