import { Injectable } from '@nestjs/common';
import { UpdateGoogleFitTargetDto } from './dto/update-google-fit-target.dto';
import * as firebase from 'firebase-admin';
import { GoogleFitTarget } from './entities/google-fit-target.entity';

@Injectable()
export class GoogleFitTargetService {
  async findAll(uid: string): Promise<GoogleFitTarget[]> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const GoogleFitTargetRef = userRef.collection('googleFitTargets');
    const googleFitTargets = [];

    const docs = await GoogleFitTargetRef.get();
    docs.forEach((doc) => {
      googleFitTargets.push(doc.data());
    });

    return googleFitTargets;
  }

  update(
    id: string,
    uid: string,
    updateGoogleFitTargetDto: UpdateGoogleFitTargetDto,
  ): Promise<firebase.firestore.WriteResult> {
    const userRef = firebase.firestore().collection('users').doc(`${uid}`);
    const GoogleFitTargetRef = userRef.collection('googleFitTargets');
    return GoogleFitTargetRef.doc(id).set({
      type: updateGoogleFitTargetDto.type,
      value: updateGoogleFitTargetDto.value,
    });
  }
}
