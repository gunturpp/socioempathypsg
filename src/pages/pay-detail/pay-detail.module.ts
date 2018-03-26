import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayDetailPage } from './pay-detail';

@NgModule({
  declarations: [
    PayDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PayDetailPage),
  ],
})
export class PayDetailPageModule {}
