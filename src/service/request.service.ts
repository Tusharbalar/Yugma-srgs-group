import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

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
    this.serverUrl = _configuration.getRequestUrl();
    this.header = _configuration.header();
  }

  getRequests(pageNo): Observable<any> {
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

}
