import { Injectable } from '@nestjs/common';
import { CreateDiaryFolderDto } from './dto/create-diary-folder.dto';
import * as firebase from 'firebase-admin';

@Injectable()
export class DiaryFolderService {
  async create(
    uid: string,
    createDiaryFolderDto: CreateDiaryFolderDto,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const diaryFolderRef = userRef.collection('diaryFolder');
    return diaryFolderRef.doc(`${createDiaryFolderDto.name}`).set({});
  }

  async remove(
    uid: string,
    name: string,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const diaryFolderRef = userRef.collection('diaryFolder');
    return diaryFolderRef.doc(name).delete();
  }
}
