import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageBerita } from './manage-berita';

@NgModule({
  declarations: [
    ManageBerita,
  ],
  imports: [
    IonicPageModule.forChild(ManageBerita),
  ],
  exports: [
    ManageBerita
  ]
})
export class ManageBeritaModule {}
