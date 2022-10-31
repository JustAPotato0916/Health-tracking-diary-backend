import { ApiProperty } from '@nestjs/swagger';

export class CreateTargetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  state: boolean;

  @ApiProperty()
  time: string;
}
