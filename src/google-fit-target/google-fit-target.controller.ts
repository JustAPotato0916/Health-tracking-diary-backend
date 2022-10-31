import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Request,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoogleFitTargetService } from './google-fit-target.service';
import { UpdateGoogleFitTargetDto } from './dto/update-google-fit-target.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GoogleFitTarget } from './entities/google-fit-target.entity';
import * as firebase from 'firebase-admin';

@ApiTags('Google fit target')
@ApiBearerAuth()
@UseGuards(AuthGuard('firebase-auth'))
@Controller('google-fit-target')
export class GoogleFitTargetController {
  constructor(
    private readonly googleFitTargetService: GoogleFitTargetService,
  ) {}

  @ApiOkResponse({ type: Array<GoogleFitTarget> })
  @ApiBadRequestResponse()
  @Get()
  findAll(@Req() request: Request): Promise<GoogleFitTarget[]> {
    return this.googleFitTargetService.findAll(request['user'].uid);
  }

  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @ApiBadRequestResponse()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() updateGoogleFitTargetDto: UpdateGoogleFitTargetDto,
  ) {
    return this.googleFitTargetService.update(
      id,
      request['user'].uid,
      updateGoogleFitTargetDto,
    );
  }
}
