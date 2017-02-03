import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
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
    this.setHeader();
  }

  getRole() {
    this.role = localStorage.getItem("role");
    this.getUserId();
  }

  getUserId() {
    this.userId = localStorage.getItem("id");
    return this.userId;
  }

  setHeader() {
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
    });
    this.options = new RequestOptions({
      headers : this.headers
    });
  }

  header() {
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
    });
    this.options = new RequestOptions({
      headers : this.headers
    });
    return this.options;
  }

  setUrl(url) {
    this.setHeader();
    this.Server = "https://yugmatesting01.appspot-preview.com/" + this.role + "/" + this.userId + "/request";
  }

  getRequestUrl() {
    return "https://yugmatesting01.appspot-preview.com/" + this.role + "/" + this.userId + "/request";
  }

}
