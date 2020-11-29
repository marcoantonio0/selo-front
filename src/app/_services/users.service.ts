import { Observable } from 'rxjs';
import { AuthenticationAdminService } from './authentication-admin.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private headers: HttpHeaders;
  private users = api.url+'/admin/users';
  private user = api.url+'/admin/user/';
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationAdminService
  ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue?.access_token
    });
  }

  public list(): Observable<any>{
    return this.http.get(this.users, { headers: this.headers });
  }

  public active(id: any): Observable<any> {
    return this.http.put(this.user + id + '/active', '', { headers: this.headers });
  }

  public inactive(id: any): Observable<any> {
    return this.http.put(this.user + id + '/inactive', '',{ headers: this.headers });
  }

}
