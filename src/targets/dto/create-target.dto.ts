import { IsNotEmpty } from 'class-validator';

export class CreateTargetDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  state: boolean;

  @IsNotEmpty()
  time: string;
}
