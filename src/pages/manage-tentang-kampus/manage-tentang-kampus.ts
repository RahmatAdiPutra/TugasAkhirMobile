import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Server } from '../server/server';

@IonicPage()
@Component({
  selector: 'page-manage-tentang-kampus',
  templateUrl: 'manage-tentang-kampus.html',
})
export class ManageTentangKampus {

  public alamatURL                  : Server;
  public form                       : FormGroup;
  public tentangKampusJudul         : any;
  public tentangKampusPenjelasan    : any;
  public tentangKampusFoto    : any;
  
  public isEdited               : boolean = false;
   
  public hideForm               : boolean = false;

  public hapus                  : boolean = false;
   
  public pageTitle              : string;
   
  public recordID               : any     = null;
  /* private baseURI               : string  = "http://localhost/tugasAkhir/"; */

  constructor(public navCtrl    : NavController,
              public NP         : NavParams,
              public toastCtrl  : ToastController,
              public fb         : FormBuilder,
              public http       : Http)
  {
    this.form = fb.group({
      "judul"                : ["", Validators.required],
      "penjelasan"           : ["", Validators.required],
      "foto"           : ["", Validators.required]
    });
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
      this.isEdited      = false;
      this.pageTitle     = 'Tambah';
    }
  }

  selectEntry(item)
  {
    this.tentangKampusJudul        = item.judul;
    this.tentangKampusPenjelasan   = item.penjelasan;
    this.tentangKampusFoto   = item.foto;
    this.recordID                  = item.id;
  }

  createEntry(judul, penjelasan, foto)
  {
    this.alamatURL = new Server();
    let body     : string   = "key=create&judul=" + judul + "&penjelasan=" + penjelasan + "&foto=" + foto,
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.alamatURL.getUrl() + "manageTentangKampus.php";

    this.http.post(url, body, options).subscribe((data) =>
    {
      if(data.status === 200)
      {
        this.hideForm   = true;
        this.sendNotification(`Data ${judul} berhasil ditambahkan`);
      }
      else
      {
        this.sendNotification('Something went wrong!');
      }
    });
  }

  updateEntry(judul, penjelasan, foto)
  {
    this.alamatURL = new Server();
    let body       : string = "key=update&judul=" + judul + "&penjelasan=" + penjelasan + "&foto=" + foto + "&recordID=" + this.recordID,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any    = new Headers({ 'Content-Type': type}),
        options    : any    = new RequestOptions({ headers: headers }),
        url        : any    = this.alamatURL.getUrl() + "manageTentangKampus.php";

    this.http.post(url, body, options).subscribe(data =>
    {
      if(data.status === 200)
      {
        this.hideForm  =  true;
        this.sendNotification(`Data ${judul} berhasil diedit`);
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
    let judul      : string = this.tentangKampusJudul,
        body       : string = "key=delete&recordID=" + this.recordID,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any    = new Headers({ 'Content-Type': type}),
        options    : any    = new RequestOptions({ headers: headers }),
        url        : any    = this.alamatURL.getUrl() + "manageTentangKampus.php";

    this.http.post(url, body, options).subscribe(data =>
    {
      if(data.status === 200)
      {
        this.hideForm  = true;
        this.hapus     = false;
        this.sendNotification(`Data ${judul} berhasil dihapus`);
      }
      else
      {
        this.sendNotification('Something went wrong!');
      }
    });
  }

  batal()
  {
    let judul      : string = this.tentangKampusJudul;
    this.hideForm  = true;
    this.hapus     = false;
    this.sendNotification(`Data ${judul} batal dihapus`);
  }

  saveEntry()
  {
    let judul        : string = this.form.controls["judul"].value,
        penjelasan   : string = this.form.controls["penjelasan"].value,
        foto   : string = this.form.controls["foto"].value;

    if(this.isEdited)
    {
      this.updateEntry(judul, penjelasan, foto);
    }
    else
    {
      this.createEntry(judul, penjelasan, foto);
    }
  }

  resetFields() : void
  {
    this.tentangKampusJudul         = "";
    this.tentangKampusPenjelasan    = "";
  }
   
  sendNotification(message)  : void
  {
    let notification = this.toastCtrl.create({
      message       : message,
      duration      : 3000
    });
    notification.present();
  }

  /*
  pindahHalaman()
  {
    this.navCtrl.push('TentangKampus');
  }

  showLongToast() {
    this.alamatURL = new Server();
    let toast = this.toastCtrl.create({
      message: this.alamatURL.getUrl(),
      duration: 2000,
    });
    toast.present();
  }

  getCoba() {
    return this.pageTitle = "http://localhost/tugasAkhir/";
  }
  */
}