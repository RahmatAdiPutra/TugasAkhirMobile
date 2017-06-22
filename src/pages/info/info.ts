import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Server } from '../server/server';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class Info {

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
    this.http.get(this.alamatURL.getUrl() + 'tampilInfo.php')
    .map(res => res.json())
    .subscribe(data =>
    {
       this.items = data;
    });
  }

  tambahInfo()
  {
    this.navCtrl.push('ManageInfo');
  }

  editInfo(param)
  {
      this.navCtrl.push('ManageInfo', param);
  }

  hapusInfo(param)
  {
      this.navCtrl.push('ManageInfo', param);
  }

}