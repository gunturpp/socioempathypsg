import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstProfilePage } from './first-profile';

@NgModule({
  declarations: [
    FirstProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(FirstProfilePage),
  ],
})
export class FirstProfilePageModule {}
