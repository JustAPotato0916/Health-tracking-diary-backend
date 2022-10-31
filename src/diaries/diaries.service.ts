import { DiaryData } from './entities/diary-data.entity';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@Injectable()
export class DiariesService {
  async findAll(uid: string): Promise<DiaryData> {
    const diaryData: DiaryData = { diaryFolders: [] };
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const foldersRef = userRef.collection('diaryFolder');

    (await foldersRef.get()).forEach(async (doc) => {
      const folderName = doc.id;
      diaryData.diaryFolders.push({
        name: folderName,
        diaries: [],
      });
    });

    await Promise.all(
      diaryData.diaryFolders.map(async (folder) => {
        (await foldersRef.doc(folder.name).collection('diaries').get()).forEach(
          (doc) => {
            const diary: any = doc.data();
            folder.diaries.push(diary);
            return;
          },
        );
      }),
    );

    return diaryData;
  }

  async create(
    uid: string,
    createDiaryDto: CreateDiaryDto,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const diaryFolderRef = userRef.collection('diaryFolder');
    return diaryFolderRef
      .doc(createDiaryDto.folderName)
      .collection('diaries')
      .doc(createDiaryDto.title)
      .set(
        {
          title: createDiaryDto.title,
          date: createDiaryDto.date,
        },
        { merge: true },
      );
  }

  update(
    uid: string,
    updateDiaryDto: UpdateDiaryDto,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const diaryFolderRef = userRef.collection('diaryFolder');
    return diaryFolderRef
      .doc(updateDiaryDto.folderName)
      .collection('diaries')
      .doc(updateDiaryDto.title)
      .set({
        title: updateDiaryDto.title,
        date: updateDiaryDto.date,
        content: updateDiaryDto.content,
      });
  }

  remove(
    uid: string,
    folderName: string,
    diaryName: string,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const diaryFolderRef = userRef.collection('diaryFolder');
    return diaryFolderRef
      .doc(folderName)
      .collection('diaries')
      .doc(diaryName)
      .delete();
  }
}
