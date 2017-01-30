import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

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
    this.getRole();
  }

  header() {
    return this.options;
  }

  role;
  userId;

  getRole() {
    this.role = localStorage.getItem("role");
    this.getUserId();
  }

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

  public Server: string = "https://yugma-ut.appspot.com";

  setUrl(url) {
    this.Server = "https://yugma-ut.appspot.com/parent/" + this.getParentId() + "/" + url;
  }

  getRequestUrl() {
    return "https://yugma-ut.appspot.com/" + this.role + "/" + this.userId + "/complaint";
  }


}
