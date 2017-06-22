import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageVisiMisi } from './manage-visi-misi';

@NgModule({
  declarations: [
    ManageVisiMisi,
  ],
  imports: [
    IonicPageModule.forChild(ManageVisiMisi),
  ],
  exports: [
    ManageVisiMisi
  ]
})
export class ManageVisiMisiModule {}
