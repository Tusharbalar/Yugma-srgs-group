import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Configuration } from './app.constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  private serverUrl: string;
  private access_token: string;
  public header;

  constructor(private _http : Http,
              private toastCtrl: ToastController,
              private _configuration: Configuration) {
    this.serverUrl = _configuration.Server;
    this.header = _configuration.header();
  }

  public hasLogin: boolean = false;

  isLoggedIn() {
    if (localStorage.getItem("access_token")) {
      this._configuration.getHeader();
      return !this.hasLogin;
    } else {
      return this.hasLogin;
    }
  }

  verifyUser(data: Object): Observable<any[]> {
    return this._http.post(this.serverUrl + "/login", data).map((res: Response) => {
      this.access_token = res.json().access_token;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public storeParentData(parent) {
    localStorage.setItem("id", parent.id);
    localStorage.setItem("name", parent.name);
    localStorage.setItem("email", parent.email);
    localStorage.setItem("contactNo", parent.contactNo);
    localStorage.setItem("students", JSON.stringify(parent.students));
    localStorage.setItem("nickName", parent.nickName);
  }

}
