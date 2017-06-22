import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Server } from '../server/server';

@IonicPage()
@Component({
  selector: 'page-manage-program-studi',
  templateUrl: 'manage-program-studi.html',
})
export class ManageProgramStudi {

  public alamatURL              : Server;
  public form                   : FormGroup;
  public programStudiJurusan    : any;
  public programStudiPenjelasan : any;
  public programStudiFoto : any;
  
  public isEdited               : boolean = false;
   
  public hideForm               : boolean = false;

  public hapus                  : boolean = false;
   
  public pageTitle              : string;
   
  public recordID               : any     = null;
  /* private baseURI            : string  = "http://localhost/tugasAkhir/"; */

  constructor(public navCtrl    : NavController,
              public NP         : NavParams,
              public toastCtrl  : ToastController,
              public fb         : FormBuilder,
              public http       : Http)
  {
    this.form = fb.group({
      "jurusan"              : ["", Validators.required],
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
    this.programStudiJurusan     = item.jurusan;
    this.programStudiPenjelasan  = item.penjelasan;
    this.programStudiFoto  = item.foto;
    this.recordID                = item.id;
  }

  createEntry(jurusan, penjelasan, foto)
  {
    this.alamatURL = new Server();
    let body     : string   = "key=create&jurusan=" + jurusan + "&penjelasan=" + penjelasan + "&foto=" + foto,
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.alamatURL.getUrl() + "manageProgramStudi.php";

    this.http.post(url, body, options).subscribe((data) =>
    {
      if(data.status === 200)
      {
        this.hideForm   = true;
        this.sendNotification(`Data ${jurusan} berhasil ditambahkan`);
      }
      else
      {
        this.sendNotification('Something went wrong!');
      }
    });
  }

  updateEntry(jurusan, penjelasan, foto)
  {
    this.alamatURL = new Server();
    let body       : string = "key=update&jurusan=" + jurusan + "&penjelasan=" + penjelasan + "&foto=" + foto + "&recordID=" + this.recordID,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any    = new Headers({ 'Content-Type': type}),
        options    : any    = new RequestOptions({ headers: headers }),
        url        : any    = this.alamatURL.getUrl() + "manageProgramStudi.php";

    this.http.post(url, body, options).subscribe(data =>
    {
      if(data.status === 200)
      {
        this.hideForm  =  true;
        this.sendNotification(`Data ${jurusan} berhasil diedit`);
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
    let jurusan      : string = this.programStudiJurusan,
        body       : string = "key=delete&recordID=" + this.recordID,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any    = new Headers({ 'Content-Type': type}),
        options    : any    = new RequestOptions({ headers: headers }),
        url        : any    = this.alamatURL.getUrl() + "manageProgramStudi.php";

    this.http.post(url, body, options).subscribe(data =>
    {
      if(data.status === 200)
      {
        this.hideForm  = true;
        this.hapus     = false;
        this.sendNotification(`Data ${jurusan} berhasil dihapus`);
      }
      else
      {
        this.sendNotification('Something went wrong!');
      }
    });
  }

  batal()
  {
    let jurusan      : string = this.programStudiJurusan;
    this.hideForm  = true;
    this.hapus     = false;
    this.sendNotification(`Data ${jurusan} batal dihapus`);
  }

  saveEntry()
  {
    let jurusan        : string = this.form.controls["jurusan"].value,
        penjelasan   : string = this.form.controls["penjelasan"].value,
        foto   : string = this.form.controls["foto"].value;

    if(this.isEdited)
    {
      this.updateEntry(jurusan, penjelasan, foto);
    }
    else
    {
      this.createEntry(jurusan, penjelasan, foto);
    }
  }

  resetFields() : void
  {
    this.programStudiJurusan         = "";
    this.programStudiPenjelasan    = "";
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
