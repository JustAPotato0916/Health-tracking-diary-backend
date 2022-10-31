import { ApiProperty } from '@nestjs/swagger';
import { Diary } from 'src/diaries/entities/diary.entity';

export class DiaryFolder {
  @ApiProperty()
  name: string;

  diaries: Diary[];
}
