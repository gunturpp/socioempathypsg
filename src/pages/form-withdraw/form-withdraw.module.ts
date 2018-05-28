import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormWithdrawPage } from './form-withdraw';

@NgModule({
  declarations: [
    FormWithdrawPage,
  ],
  imports: [
    IonicPageModule.forChild(FormWithdrawPage),
  ],
})
export class FormWithdrawPageModule {}
