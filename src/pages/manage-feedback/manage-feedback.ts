import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Server } from '../server/server';

@IonicPage()
@Component({
  selector: 'page-manage-feedback',
  templateUrl: 'manage-feedback.html',
})
export class ManageFeedback {

  public alamatURL              : Server;
  public form                   : FormGroup;
  public feedbackNama           : any;
  public feedbackTanggal        : any;
  public feedbackKomentar       : any;
  
  public isEdited               : boolean = false;
   
  public hideForm               : boolean = false;

  public hapus                  : boolean = false;
   
  public pageTitle              : string;
   
  public recordID               : any     = null;
  /* private baseURI            : string  = "http://localhost/tugasAkhir/"; */
  
  /*today;*/

  constructor(public navCtrl    : NavController,
              public NP         : NavParams,
              public toastCtrl  : ToastController,
              public fb         : FormBuilder,
              public http       : Http)
  {
    this.form = fb.group({
      "nama"                : ["", Validators.required],
      "tanggal"                : ["", Validators.required],
      "komentar"           : ["", Validators.required]
    });

    /*this.today = new Date().toISOString();*/
  }

  ionViewWillEnter()
  {
    this.resetFields();

    if(this.NP.get("record"))
    {
      this.isEdited      = true;
      this.hideForm      = false;
      this.hapus         = false;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle     = 'Edit';
    }
    else if(this.NP.get("hapus"))
    {
      this.isEdited      = false;
      this.hideForm      = true;
      this.hapus         = true;
      this.selectEntry(this.NP.get("hapus"));
      this.pageTitle     = 'Hapus';
    }
    else
    {
      this.isEdited        = false;
      this.feedbackTanggal = new Date();
      this.pageTitle       = 'Tambah';
    }
  }

  selectEntry(item)
  {
    this.feedbackNama        = item.nama;
    this.feedbackTanggal      = item.tanggal;
    this.feedbackKomentar   = item.komentar;
    this.recordID           = item.id;
  }

  createEntry(nama, tanggal, komentar)
  {
    this.alamatURL = new Server();
    let body     : string   = "key=create&nama=" + nama + "&tanggal=" + tanggal + "&komentar=" + komentar,
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.alamatURL.getUrl() + "manageFeedback.php";

    this.http.post(url, body, options).subscribe((data) =>
    {
      if(data.status === 200)
      {
        this.hideForm   = true;
        this.sendNotification(`Data ${nama} berhasil ditambahkan`);
      }
      else
      {
        this.sendNotification('Something went wrong!');
      }
    });
  }

  updateEntry(nama, tanggal, komentar)
  {
    this.alamatURL = new Server();
    let body       : string = "key=update&nama=" + nama + "&tanggal=" + tanggal + "&komentar=" + komentar + "&recordID=" + this.recordID,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any    = new Headers({ 'Content-Type': type}),
        options    : any    = new RequestOptions({ headers: headers }),
        url        : any    = this.alamatURL.getUrl() + "manageFeedback.php";

    this.http.post(url, body, options).subscribe(data =>
    {
      if(data.status === 200)
      {
        this.hideForm  =  true;
        this.sendNotification(`Data ${nama} berhasil diedit`);
      }
      else
      {
        this.sendNotification('Something went wrong!');
      }
    });
  }

  deleteEntry()
  {
    this.alamatURL = new Server();
    let nama      : string = this.feedbackNama,
        body       : string = "key=delete&recordID=" + this.recordID,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any    = new Headers({ 'Content-Type': type}),
        options    : any    = new RequestOptions({ headers: headers }),
        url        : any    = this.alamatURL.getUrl() + "manageFeedback.php";

    this.http.post(url, body, options).subscribe(data =>
    {
      if(data.status === 200)
      {
        this.hideForm  = true;
        this.hapus     = false;
        this.sendNotification(`Data ${nama} berhasil dihapus`);
      }
      else
      {
        this.sendNotification('Something went wrong!');
      }
    });
  }

  batal()
  {
    let nama      : string = this.feedbackNama;
    this.hideForm  = true;
    this.hapus     = false;
    this.sendNotification(`Data ${nama} batal dihapus`);
  }

  saveEntry()
  {
    let nama        : string = this.form.controls["nama"].value,
    	tanggal      : string = this.form.controls["tanggal"].value,
        komentar   : string = this.form.controls["komentar"].value;

    if(this.isEdited)
    {
      this.updateEntry(nama, tanggal, komentar);
    }
    else
    {
      this.createEntry(nama, tanggal, komentar);
    }
  }

  resetFields() : void
  {
    this.feedbackNama         = "";
    this.feedbackTanggal       = "";
    this.feedbackKomentar    = "";
  }
   
  sendNotification(message)  : void
  {
    let notification = this.toastCtrl.create({
      message       : message,
      duration      : 3000
    });
    notification.present();
  }
}