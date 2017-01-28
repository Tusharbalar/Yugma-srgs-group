import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

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
  }

  header() {
    return this.headers;
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

  public Server: string = "https://yugmasrgstesting.appspot.com";

  setUrl(url) {
    this.Server = "https://yugmasrgstesting.appspot.com/parent/" + this.getParentId() + "/" + url;
  }

}
