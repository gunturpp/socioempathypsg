import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultationRequestPage } from './consultation-request';

@NgModule({
  declarations: [
    ConsultationRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultationRequestPage),
  ],
})
export class ConsultationRequestPageModule {}
