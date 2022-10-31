import { ApiProperty } from '@nestjs/swagger';

export class CreateDiaryFolderDto {
  @ApiProperty()
  name: string;
}
