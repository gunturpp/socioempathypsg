import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievDetailPage } from './achiev-detail';

@NgModule({
  declarations: [
    AchievDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievDetailPage),
  ],
})
export class AchievDetailPageModule {}
