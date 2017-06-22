import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tautan } from './tautan';

@NgModule({
  declarations: [
    Tautan,
  ],
  imports: [
    IonicPageModule.forChild(Tautan),
  ],
  exports: [
    Tautan
  ]
})
export class TautanModule {}
