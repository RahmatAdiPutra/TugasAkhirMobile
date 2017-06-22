import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisiMisi } from './visi-misi';

@NgModule({
  declarations: [
    VisiMisi,
  ],
  imports: [
    IonicPageModule.forChild(VisiMisi),
  ],
  exports: [
    VisiMisi
  ]
})
export class VisiMisiModule {}
