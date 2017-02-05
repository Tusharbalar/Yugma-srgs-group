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
  public header;

  constructor(private _http : Http,
              private _configuration: Configuration) {

  }

  getHeader() {
    this.serverUrl = this._configuration.Server;;
    this.header = this._configuration.header();
  }

  getRequests(pageNo): Observable<any> {
    this.getHeader();
    return this._http.get(this.serverUrl + "/page/" + pageNo, this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public closeComplaint(complaintId, complaintReason) {
    return this._http.put(this.serverUrl + "/" + complaintId + "/close", complaintReason, this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public satisfiedComplaint(complaintId) {
    return this._http.put(this.serverUrl + "/" + complaintId + "/satisfied", {}, this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public reopenComplaint(complaintId, reopenData) {
    return this._http.put(this.serverUrl + "/" + complaintId + "/reopen", reopenData, this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public postComment(complaintId, comment) {
    return this._http.post(this.serverUrl + "/" + complaintId + "/comment", comment, this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getComments(complaintId) {
    return this._http.get(this.serverUrl + "/" + complaintId + "/comment", this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public getCategories() {
    return this._http.get(this.serverUrl + "/category", this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public saveRequest(complaintData): any {
    return this._http.post(this.serverUrl, complaintData, this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  getRequestByStatus(statusId, page) {
    return this._http.get(this.serverUrl + "/status/" + statusId + "/page/" + page, this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  editInfo(): Observable<any> {
    this.getHeader();
    return this._http.get(this.serverUrl + "/edit-info", this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  editRequest(id, data): Observable<any> {
    return this._http.put(this.serverUrl + "/" + id, data, this.header).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

}
