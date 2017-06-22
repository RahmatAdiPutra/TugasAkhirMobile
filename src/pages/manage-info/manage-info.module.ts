import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageInfo } from './manage-info';

@NgModule({
  declarations: [
    ManageInfo,
  ],
  imports: [
    IonicPageModule.forChild(ManageInfo),
  ],
  exports: [
    ManageInfo
  ]
})
export class ManageInfoModule {}
