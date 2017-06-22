import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Server } from '../server/server';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class Feedback {

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
    this.http.get(this.alamatURL.getUrl() + 'tampilFeedback.php')
    .map(res => res.json())
    .subscribe(data =>
    {
       this.items = data;
    });
  }

  tambahFeedback()
  {
    this.navCtrl.push('ManageFeedback');
  }

  editFeedback(param)
  {
      this.navCtrl.push('ManageFeedback', param);
  }

  hapusFeedback(param)
  {
      this.navCtrl.push('ManageFeedback', param);
  }
}