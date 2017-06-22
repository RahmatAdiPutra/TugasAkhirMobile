import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageFeedback } from './manage-feedback';

@NgModule({
  declarations: [
    ManageFeedback,
  ],
  imports: [
    IonicPageModule.forChild(ManageFeedback),
  ],
  exports: [
    ManageFeedback
  ]
})
export class ManageFeedbackModule {}
