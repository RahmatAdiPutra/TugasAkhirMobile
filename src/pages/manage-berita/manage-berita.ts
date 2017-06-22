import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Server } from '../server/server';

@IonicPage()
@Component({
  selector: 'page-manage-berita',
  templateUrl: 'manage-berita.html',
})
export class ManageBerita {

  public alamatURL              : Server;
  public form                   : FormGroup;
  public beritaJudul            : any;
  public beritaTanggal          : any;
  public beritaPenjelasan       : any;
  public beritaFoto             : any;
  
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
      "judul"                : ["", Validators.required],
      "tanggal"              : ["", Validators.required],
      "penjelasan"           : ["", Validators.required],
      "foto"                 : ["", Validators.required]
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
    this.beritaJudul        = item.judul;
    this.beritaTanggal      = item.tanggal;
    this.beritaPenjelasan   = item.penjelasan;
    this.beritaFoto         = item.foto;
    this.recordID           = item.id;
  }

  createEntry(judul, tanggal, penjelasan, foto)
  {
    this.alamatURL = new Server();
    let body     : string   = "key=create&judul=" + judul + "&tanggal=" + tanggal + "&penjelasan=" + penjelasan + "&foto=" + foto,
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.alamatURL.getUrl() + "manageBerita.php";

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

  updateEntry(judul, tanggal, penjelasan, foto)
  {
    this.alamatURL = new Server();
    let body       : string = "key=update&judul=" + judul + "&tanggal=" + tanggal + "&penjelasan=" + penjelasan + "&foto=" + foto + "&recordID=" + this.recordID,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any    = new Headers({ 'Content-Type': type}),
        options    : any    = new RequestOptions({ headers: headers }),
        url        : any    = this.alamatURL.getUrl() + "manageBerita.php";

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
    let judul      : string = this.beritaJudul,
        body       : string = "key=delete&recordID=" + this.recordID,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any    = new Headers({ 'Content-Type': type}),
        options    : any    = new RequestOptions({ headers: headers }),
        url        : any    = this.alamatURL.getUrl() + "manageBerita.php";

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
    let judul      : string = this.beritaJudul;
    this.hideForm  = true;
    this.hapus     = false;
    this.sendNotification(`Data ${judul} batal dihapus`);
  }

  saveEntry()
  {
    let judul        : string = this.form.controls["judul"].value,
    	  tanggal      : string = this.form.controls["tanggal"].value,
        penjelasan   : string = this.form.controls["penjelasan"].value,
        foto         : string = this.form.controls["foto"].value;

    if(this.isEdited)
    {
      this.updateEntry(judul, tanggal, penjelasan, foto);
    }
    else
    {
      this.createEntry(judul, tanggal, penjelasan, foto);
    }
  }

  resetFields() : void
  {
    this.beritaJudul         = "";
    this.beritaTanggal       = "";
    this.beritaPenjelasan    = "";
    this.beritaFoto          = "";
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