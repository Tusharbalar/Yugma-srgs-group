import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Configuration {

  headers;
  options;
  role;
  userId;

  constructor(public http: Http) {

  }

  public Server: string = "https://yugmatesting01.appspot-preview.com";

  // set access_token after user login
  setAccessToken() {
    this.getRole();
  }

  getHeader(access_token) {
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + access_token
    });
    this.options = new RequestOptions({
      headers : this.headers
    });
    return this.options;
  }

  getRole() {
    this.role = localStorage.getItem("role");
    this.getUserId();
  }

  getUserId() {
    this.userId = localStorage.getItem("id");
    return this.userId;
  }

  getRequestUrl() {
    return "https://yugmatesting01.appspot-preview.com/" + this.role + "/" + this.userId + "/request";
  }

  tokenUpdate(tokenId) {
    const notificationToken = {
      notificationToken: tokenId
    }
    return this.http.put(this.Server + "/management/" + this.userId, notificationToken , this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

}
