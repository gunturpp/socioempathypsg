import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LovestorePage } from './lovestore';

@NgModule({
  declarations: [
    LovestorePage,
  ],
  imports: [
    IonicPageModule.forChild(LovestorePage),
  ],
})
export class LovestorePageModule {}
