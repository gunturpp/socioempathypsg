import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementPage } from './achievement';

@NgModule({
  declarations: [
    AchievementPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementPage),
  ],
})
export class AchievementPageModule {}
