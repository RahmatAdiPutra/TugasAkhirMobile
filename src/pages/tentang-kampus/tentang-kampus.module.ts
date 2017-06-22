import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TentangKampus } from './tentang-kampus';

@NgModule({
  declarations: [
    TentangKampus,
  ],
  imports: [
    IonicPageModule.forChild(TentangKampus),
  ],
  exports: [
    TentangKampus
  ]
})
export class TentangKampusModule {}
