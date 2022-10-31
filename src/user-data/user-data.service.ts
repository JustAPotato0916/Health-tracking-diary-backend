import { UpdateUserDataDto } from './dto/update-user-data.dto';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { CreateUserDataDto } from './dto/create-user-data.dto';
import { UserData } from './entities/user-data.entity';
import { UpdateUserCoverDto } from './dto/update-user-cover.dto';

@Injectable()
export class UserDataService {
  async create(
    createUserDto: CreateUserDataDto,
  ): Promise<UserData | firebase.firestore.WriteResult> {
    const userUid = createUserDto.uid;
    const userRef = firebase.firestore().collection('users').doc(`${userUid}`);

    return userRef.get().then((doc) => {
      if (doc.exists) {
        return;
      } else {
        return userRef.set(createUserDto);
      }
    });
  }

  async findOne(uid: string): Promise<UserData> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    return await userRef
      .get()
      .then((doc: firebase.firestore.DocumentData) => {
        return doc.data();
      })
      .catch((error) => {
        return error;
      });
  }

  async update(
    uid: string,
    updateUserDataDto: UpdateUserDataDto,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    return userRef
      .set(
        {
          name: updateUserDataDto.name,
          profilePhotoUrl: updateUserDataDto.profilePhotoUrl,
          facebookUID: updateUserDataDto.facebookUID,
          twitterUID: updateUserDataDto.twitterUID,
        },
        { merge: true },
      )
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async updateBanner(
    uid: string,
    updateUserCoverDto: UpdateUserCoverDto,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    return userRef
      .set(
        {
          profileCoverUrl: updateUserCoverDto.profileCoverUrl,
        },
        { merge: true },
      )
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
