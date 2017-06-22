import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Server } from '../server/server';

@IonicPage()
@Component({
  selector: 'page-program-studi',
  templateUrl: 'program-studi.html',
})
export class ProgramStudi {

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
    this.http.get(this.alamatURL.getUrl() + 'tampilProgramStudi.php')
    .map(res => res.json())
    .subscribe(data =>
    {
       this.items = data;
    });
  }

  tambahProgramStudi()
  {
    this.navCtrl.push('ManageProgramStudi');
  }

  editProgramStudi(param)
  {
      this.navCtrl.push('ManageProgramStudi', param);
  }

  hapusProgramStudi(param)
  {
      this.navCtrl.push('ManageProgramStudi', param);
  }
}