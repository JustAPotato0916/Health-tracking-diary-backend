import { ApiProperty } from '@nestjs/swagger';

export class Diary {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  date: string;
}
