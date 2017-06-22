import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageProgramStudi } from './manage-program-studi';

@NgModule({
  declarations: [
    ManageProgramStudi,
  ],
  imports: [
    IonicPageModule.forChild(ManageProgramStudi),
  ],
  exports: [
    ManageProgramStudi
  ]
})
export class ManageProgramStudiModule {}
