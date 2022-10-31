import { IsNotEmpty } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  folderName: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  date: string;
}
