import { ApiProperty } from '@nestjs/swagger';

export class CreateDiaryDto {
  @ApiProperty()
  folderName: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  date: string;
}
