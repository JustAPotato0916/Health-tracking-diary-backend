import { DiaryFolderModule } from './diary-folder/diary-folder.module';
import { TargetsModule } from './targets/targets.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { UserDataModule } from './user-data/user-data.module';
import { DiariesModule } from './diaries/diaries.module';
import { GoogleFitTargetModule } from './google-fit-target/google-fit-target.module';

@Module({
  imports: [
    UserDataModule,
    TargetsModule,
    DiaryFolderModule,
    DiariesModule,
    GoogleFitTargetModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
