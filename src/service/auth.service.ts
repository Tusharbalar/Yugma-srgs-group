import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
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
      return this.access_token;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  headers;

  info(access_token) {

    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    });

    var options = new RequestOptions({
      headers : this.headers
    });
    console.log("DASDADSDA", options)

    return this._http.get(this.serverUrl + "/franchise/info", options).map((res: Response) => {
      localStorage.setItem("access_token", access_token);
      this._configuration.getHeader();
      return res.json();
    }).catch((error: any) => Observable.throw(error || 'server error'));

  }

  public storeData(data) {
    localStorage.setItem("id", data.id);
    localStorage.setItem("role", data.role);
    localStorage.setItem("classTeacher", data.classTeacher);
    localStorage.setItem("username", data.username);
    localStorage.setItem("contactNo", data.contactNo);
    localStorage.setItem("email", data.email);
    localStorage.setItem("name", data.name);
    localStorage.setItem("nickName", data.nickName);
  }

  forgotPassword(username: string) {
    let data = {
      username: username
    }
    return this._http.put(this.serverUrl + "/forgot-password", data).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

}
