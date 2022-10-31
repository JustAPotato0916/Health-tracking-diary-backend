import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDataDto {
  @IsNotEmpty()
  uid: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  profilePhotoUrl: string;

  @IsNotEmpty()
  profileCoverUrl: string;

  facebookUID: string | null;

  twitterUID: string | null;
}
