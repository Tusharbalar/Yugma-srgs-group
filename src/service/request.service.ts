import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Configuration } from './app.constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RequestService {

  private serverUrl: string;
  public options;

  constructor(private _http : Http,
              private _configuration: Configuration) {
  }

  public getHeader() {
    let access_token = localStorage.getItem("access_token");
    this.serverUrl = this._configuration.getRequestUrl();
    this.options = this._configuration.getHeader(access_token);
  }

  public getRequests(pageNo): Observable<any> {
    this.getHeader();
    return this._http.get(this.serverUrl + "/page/" + pageNo, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public closeComplaint(complaintId, complaintReason) {
    return this._http.put(this.serverUrl + "/" + complaintId + "/close", complaintReason, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public satisfiedComplaint(complaintId) {
    return this._http.put(this.serverUrl + "/" + complaintId + "/satisfied", {}, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public reopenComplaint(complaintId, reopenData) {
    return this._http.put(this.serverUrl + "/" + complaintId + "/reopen", reopenData, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public postComment(complaintId, comment) {
    return this._http.post(this.serverUrl + "/" + complaintId + "/comment", comment, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getComments(complaintId) {
    return this._http.get(this.serverUrl + "/" + complaintId + "/comment", this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getCategories() {
    return this._http.get(this.serverUrl + "/category", this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public saveRequest(complaintData): any {
    return this._http.post(this.serverUrl, complaintData, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getRequestByStatus(statusId, page) {
    return this._http.get(this.serverUrl + "/status/" + statusId + "/page/" + page, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public editInfo(): Observable<any> {
    this.getHeader();
    return this._http.get(this.serverUrl + "/edit-info", this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public editRequest(id, data): Observable<any> {
    return this._http.put(this.serverUrl + "/" + id, data, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getFullRequest(id): Observable<any> {
    this.getHeader();
    return this._http.get(this.serverUrl + "/" + id, this.options).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

}
