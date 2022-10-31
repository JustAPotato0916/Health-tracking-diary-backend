import { DiaryFolderController } from './diary-folder.controller';
import { Module } from '@nestjs/common';
import { DiaryFolderService } from './diary-folder-service';

@Module({
  controllers: [DiaryFolderController],
  providers: [DiaryFolderService],
})
export class DiaryFolderModule {}
