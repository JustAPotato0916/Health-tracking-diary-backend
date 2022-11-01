import { IsNotEmpty } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  folderName: string;

  @IsNotEmpty()
  title: string;

  content: string;

  @IsNotEmpty()
  date: string;
}
