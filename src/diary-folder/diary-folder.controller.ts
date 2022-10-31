import { CreateDiaryFolderDto } from './dto/create-diary-folder.dto';
import { DiaryFolderService } from './diary-folder-service';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as firebase from 'firebase-admin';

@ApiTags('Diary folder')
@ApiBearerAuth()
@Controller('diary-folder')
@UseGuards(AuthGuard('firebase-auth'))
export class DiaryFolderController {
  constructor(private diaryFolderService: DiaryFolderService) {}

  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @ApiBadRequestResponse()
  @Post()
  create(
    @Req() request: Request,
    @Body() createDiaryFolderDto: CreateDiaryFolderDto,
  ): Promise<firebase.firestore.WriteResult> {
    return this.diaryFolderService.create(
      request['user'].uid,
      createDiaryFolderDto,
    );
  }

  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @ApiBadRequestResponse()
  @Delete(':name')
  remove(
    @Req() request: Request,
    @Param('name') name: string,
  ): Promise<firebase.firestore.WriteResult> {
    return this.diaryFolderService.remove(request['user'].uid, name);
  }
}
