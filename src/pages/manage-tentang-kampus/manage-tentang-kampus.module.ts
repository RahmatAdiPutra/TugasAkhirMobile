import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTentangKampus } from './manage-tentang-kampus';

@NgModule({
  declarations: [
    ManageTentangKampus,
  ],
  imports: [
    IonicPageModule.forChild(ManageTentangKampus),
  ],
  exports: [
    ManageTentangKampus
  ]
})
export class ManageTentangKampusModule {}
