import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   constructor(public navCtrl: NavController, public http   : Http)
   {

   }

   tentangKampus()
   {
      this.navCtrl.push('TentangKampus');
   }

   visiMisiKampus()
   {
      this.navCtrl.push('VisiMisi');
   }

   programKampus()
   {
      this.navCtrl.push('ProgramStudi');
   }

   beritaKampus()
   {
      this.navCtrl.push('Berita');
   }

   infoKampus()
   {
      this.navCtrl.push('Info');
   }

   tautanKampus()
   {
      this.navCtrl.push('Tautan');
   }

   feedbackKampus()
   {
      this.navCtrl.push('Feedback');
   }
}