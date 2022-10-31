import { DiaryFolder } from './../../diary-folder/entities/diary-folder.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DiaryData {
  @ApiProperty()
  diaryFolders: DiaryFolder[];
}
