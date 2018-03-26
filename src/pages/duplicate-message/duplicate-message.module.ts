import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuplicateMessagePage } from './duplicate-message';

@NgModule({
  declarations: [
    DuplicateMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(DuplicateMessagePage),
  ],
})
export class DuplicateMessagePageModule {}
