import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailTransactionPage } from './detail-transaction';

@NgModule({
  declarations: [
    DetailTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailTransactionPage),
  ],
})
export class DetailTransactionPageModule {}
