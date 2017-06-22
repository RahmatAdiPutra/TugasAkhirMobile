import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgramStudi } from './program-studi';

@NgModule({
  declarations: [
    ProgramStudi,
  ],
  imports: [
    IonicPageModule.forChild(ProgramStudi),
  ],
  exports: [
    ProgramStudi
  ]
})
export class ProgramStudiModule {}
