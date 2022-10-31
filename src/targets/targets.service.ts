import { CreateTargetDto } from './dto/create-target.dto';
import { Target } from './entities/target.entity';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { UpdateTargetDto } from './dto/update-target.dto';

@Injectable()
export class TargetsService {
  async findAll(uid: string): Promise<Target[]> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const targetRef = userRef.collection('targets');
    const targets: any[] = [];
    const docs = await targetRef.get();
    docs.forEach((doc) => {
      targets.push(doc.data());
    });

    return targets;
  }

  async create(
    uid: string,
    createTargetDto: CreateTargetDto,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const targetId = createTargetDto.id;
    const targetRef = userRef.collection('targets');
    return targetRef.doc(targetId).set({
      id: createTargetDto.id,
      title: createTargetDto.title,
      content: createTargetDto.content,
      state: createTargetDto.state,
      time: createTargetDto.time,
    });
  }

  async update(uid: string, updateTargetDto: UpdateTargetDto): Promise<Target> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const targetRef = userRef.collection('targets');
    targetRef.doc(updateTargetDto.id).set({
      id: updateTargetDto.id,
      title: updateTargetDto.title,
      content: updateTargetDto.content,
      state: updateTargetDto.state,
      time: updateTargetDto.time,
    });
    const doc = await targetRef.doc(updateTargetDto.id).get();
    const target: any = doc.data();
    return target;
  }

  async remove(
    uid: string,
    id: string,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const targetRef = userRef.collection('targets');
    return targetRef.doc(id).delete();
  }
}
