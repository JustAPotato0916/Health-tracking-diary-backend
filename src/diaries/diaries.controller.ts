import { CreateDiaryDto } from './dto/create-diary.dto';
import { DiariesService } from './diaries.service';
import {
  Controller,
  Get,
  Req,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { DiaryData } from './entities/diary-data.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import * as firebase from 'firebase-admin';

@ApiTags('Diaries')
@ApiBearerAuth()
@Controller('diaries')
@UseGuards(AuthGuard('firebase-auth'))
export class DiariesController {
  constructor(private diariesService: DiariesService) {}

  @ApiOkResponse({ type: DiaryData })
  @ApiBadRequestResponse()
  @Get()
  findAll(@Req() request: Request): Promise<DiaryData> {
    return this.diariesService.findAll(request['user'].uid);
  }

  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @ApiBadRequestResponse()
  @Post()
  create(
    @Req() request: Request,
    @Body() createDiaryDto: CreateDiaryDto,
  ): Promise<firebase.firestore.WriteResult> {
    return this.diariesService.create(request['user'].uid, createDiaryDto);
  }

  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @ApiBadRequestResponse()
  @Patch()
  update(
    @Req() request: Request,
    @Body() createDiaryDto: CreateDiaryDto,
  ): Promise<firebase.firestore.WriteResult> {
    return this.diariesService.update(request['user'].uid, createDiaryDto);
  }

  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @ApiBadRequestResponse()
  @Delete(':folderName/:diaryName')
  remove(
    @Req() request: Request,
    @Param('folderName') folderName: string,
    @Param('diaryName') diaryName: string,
  ): Promise<firebase.firestore.WriteResult> {
    return this.diariesService.remove(
      request['user'].uid,
      folderName,
      diaryName,
    );
  }
}
