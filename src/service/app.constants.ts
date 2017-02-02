import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Configuration {

  constructor(public http: Http) {

  }

  headers;
  options;

  getHeader() {
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
    });
    this.options = new RequestOptions({
      headers : this.headers
    });
    this.getUserId();
  }

  header() {
    console.log("DSADSADSAD", localStorage.getItem("access_token"))
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
    });
    this.options = new RequestOptions({
      headers : this.headers
    });
    return this.options;
  }

  userId;

  getUserId() {
    this.userId = localStorage.getItem("id");
    return this.userId;
  }

  public getParentId(): string {
    if (localStorage.getItem("id") != null) {
      return localStorage.getItem("id");
    }
  }

  public getAccessToken(): string {
    if (localStorage.getItem("access_token") != null) {
      return localStorage.getItem("access_token");
    }
  }

  public Server: string = "https://yugmatesting01.appspot.com";

  getRequestUrl() {
    this.userId = localStorage.getItem("id");
    return "https://yugmatesting01.appspot.com/franchise/" + this.userId + "/request";
  }

  tokenUpdate(tokenId) {
    const notificationToken = {
      notificationToken: tokenId
    }
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
    });
    this.options = new RequestOptions({
      headers : this.header()
    });
    return this.http.put(this.Server + "/franchise/" + this.getParentId(), notificationToken, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }


}
