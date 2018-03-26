import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaySuccessPage } from './pay-success';

@NgModule({
  declarations: [
    PaySuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(PaySuccessPage),
  ],
})
export class PaySuccessPageModule {}
