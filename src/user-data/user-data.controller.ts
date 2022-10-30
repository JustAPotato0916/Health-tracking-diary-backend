import { UpdateUserDataDto } from './dto/update-user-data.dto';
import {
  Controller,
  Get,
  Req,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDataService } from './user-data.service';
import { AuthGuard } from '@nestjs/passport';
import { UserData } from './entities/user-data.entity';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import * as firebase from 'firebase-admin';
import { ProfileBannerUrl } from './entities/profile-banner-url';

@ApiTags('User data')
@Controller('user-data')
export class UserDataController {
  constructor(private userDataService: UserDataService) {}

  @ApiCreatedResponse({ type: UserData })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  @Post()
  create(
    @Body() createUserDto: CreateUserDataDto,
  ): Promise<UserData | firebase.firestore.WriteResult> {
    return this.userDataService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserData })
  @Get()
  @UseGuards(AuthGuard('firebase-auth'))
  findOne(@Req() request: Request): Promise<UserData> {
    return this.userDataService.findOne(request['user'].uid);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @Patch()
  @UseGuards(AuthGuard('firebase-auth'))
  update(
    @Req() request: Request,
    @Body() updateUserDataDto: UpdateUserDataDto,
  ): Promise<void | firebase.firestore.WriteResult> {
    return this.userDataService.update(request['user'].uid, updateUserDataDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: firebase.firestore.WriteResult })
  @Patch('/banner')
  @UseGuards(AuthGuard('firebase-auth'))
  updateBanner(
    @Req() request: Request,
    @Body() profileBannerUrl: ProfileBannerUrl,
  ): Promise<void | firebase.firestore.WriteResult> {
    return this.userDataService.updateBanner(
      request['user'].uid,
      profileBannerUrl,
    );
  }
}
