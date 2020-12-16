import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { api } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeloService {
  private selo = api.url + '/selo'
  private headers;

  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      Authorization: 'Bearer ' + this.sAuth.currentUserValue?.access_token
    });
  }

  getSelo(id: any): Observable<any> {
    return this.http.get(this.selo + '/' + id, { headers: this.headers,  responseType: 'text' });
  }

  getSeloInfo(id: any): Observable<any> {
    return this.http.get(this.selo + '/info/' + id, { headers: this.headers });
  }

}
