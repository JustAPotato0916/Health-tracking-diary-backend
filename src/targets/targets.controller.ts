import {
  Controller,
  Get,
  Req,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTargetDto } from './dto/create-target.dto';
import { Target } from './entities/target.entity';
import { TargetsService } from './targets.service';
import * as firebase from 'firebase-admin';
import { UpdateTargetDto } from './dto/update-target.dto';

@ApiTags('Targets')
@ApiBearerAuth()
@Controller('targets')
@UseGuards(AuthGuard('firebase-auth'))
export class TargetsController {
  constructor(private targetsService: TargetsService) {}

  @ApiOkResponse({ type: Array<Target> })
  @ApiBadRequestResponse()
  @Get()
  findAll(@Req() request: Request): Promise<Target[]> {
    return this.targetsService.findAll(request['user'].uid);
  }

  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @ApiBadRequestResponse()
  @Post()
  create(
    @Req() request: Request,
    @Body() createTargetDto: CreateTargetDto,
  ): Promise<firebase.firestore.WriteResult> {
    return this.targetsService.create(request['user'].uid, createTargetDto);
  }

  @ApiOkResponse({ type: Target })
  @ApiBadRequestResponse()
  @Patch()
  update(
    @Req() request: Request,
    @Body() updateTargetDto: UpdateTargetDto,
  ): Promise<Target> {
    return this.targetsService.update(request['user'].uid, updateTargetDto);
  }

  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @ApiBadRequestResponse()
  @Delete(':id')
  remove(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<firebase.firestore.WriteResult> {
    return this.targetsService.remove(request['user'].uid, id);
  }
}
