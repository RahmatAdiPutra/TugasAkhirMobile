import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTautan } from './manage-tautan';

@NgModule({
  declarations: [
    ManageTautan,
  ],
  imports: [
    IonicPageModule.forChild(ManageTautan),
  ],
  exports: [
    ManageTautan
  ]
})
export class ManageTautanModule {}
