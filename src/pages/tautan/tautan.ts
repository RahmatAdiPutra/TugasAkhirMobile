import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Server } from '../server/server';

@IonicPage()
@Component({
  selector: 'page-tautan',
  templateUrl: 'tautan.html',
})
export class Tautan {

  public alamatURL : Server;
  public items     : any = [];

  constructor(public navCtrl  : NavController,
              public navParams: NavParams,
              public http     : Http)
  {

  }

 
  ionViewWillEnter()
  {
    this.load();
  }

  load()
  {
    this.alamatURL = new Server();
    this.http.get(this.alamatURL.getUrl() + 'tampilTautan.php')
    .map(res => res.json())
    .subscribe(data =>
    {
       this.items = data;
    });
  }

  tambahTautan()
  {
    this.navCtrl.push('ManageTautan');
  }

  editTautan(param)
  {
      this.navCtrl.push('ManageTautan', param);
  }

  hapusTautan(param)
  {
      this.navCtrl.push('ManageTautan', param);
  }
}