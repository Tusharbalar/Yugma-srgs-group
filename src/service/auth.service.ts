import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ToastController, Events } from 'ionic-angular';

import { RequestService } from './request.service';
import { Observable } from 'rxjs/Observable';
import { Configuration } from './app.constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  private access_token: string;
  public header;
  headers;
  options;

  public hasLogin: boolean = false;

  constructor(private _http : Http,
              private toastCtrl: ToastController,
              public events: Events,
              public requestService: RequestService,
              private _configuration: Configuration) {
  }

  public baseUrl = "https://yugmatesting01.appspot-preview.com";

  // called after logout
  resetLoginStatus() {
    this.hasLogin = false;
  }

  isLoggedIn() {
    this.access_token = localStorage.getItem("access_token");
    if (this.access_token) {
      this._configuration.setAccessToken();
      this.checkUserSession();
      return !this.hasLogin;
    } else {
      return this.hasLogin;
    }
  }

  checkUserSession() {
    this.getUserInfo(this.access_token).subscribe((res) => {
      this.storeData(res);
    }, (err) => {
      if (err.status === 401) {
       this.events.publish("session:expired");
      }
    });
  }

  getHeader() {
    let access_token = localStorage.getItem("access_token");
    this.options = this._configuration.getHeader(access_token);
  }

  getNewHeader(access_token) {
    this.options = this._configuration.getHeader(access_token);
  }

  verifyUser(data: Object): Observable<any[]> {
    return this._http.post(this.baseUrl + "/login", data).map((res: Response) => {
      this.access_token = res.json().access_token;
      return this.access_token;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  getUserInfo(access_token) {
    this.getNewHeader(access_token);
    return this._http.get(this.baseUrl + "/management/info", this.options).map((res: Response) => {
      this.storeData(res.json());
      this.getEditInfo();
      return res.json();
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getEditInfo() {
    this.requestService.editInfo().subscribe((res) => {
      let data = res.json();
      localStorage.setItem("acknowledgements", JSON.stringify(data.acknowledgements));
      localStorage.setItem("employees", JSON.stringify(data.employees));
      localStorage.setItem("priorities", JSON.stringify(data.priorities));
    }, (err) => {
      console.log("err", err);
    });
  }

  public storeData(data) {
    localStorage.setItem("access_token", this.access_token);
    localStorage.setItem("id", data.id);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);
    localStorage.setItem("contactNo", data.contactNo);
    localStorage.setItem("email", data.email);
    localStorage.setItem("name", data.name);
    localStorage.setItem("nickName", data.nickName);
    localStorage.setItem("filterInfo", JSON.stringify(data.filterInfo));
    this.events.publish("user:login");
  }

  forgotPassword(username: string) {
    let data = {
      username: username
    }
    return this._http.put(this.baseUrl + "/forgot-password", data).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  logout() {
    this.getHeader();
    return this._http.get(this.baseUrl + "/management/logout", this.options).map((res: Response) => {
      localStorage.clear();
      return true;
    });
  }

  resetPassword(data) {
    this.getHeader();
    let userId = this._configuration.getUserId();
    return this._http.put(this.baseUrl + "/management/" + userId + "/password", data, this.options)
      .map((res: Response) => {
        return res;
      }).catch((error: any) => Observable.throw(error || 'server error'));
  }

}
