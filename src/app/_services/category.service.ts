import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
    ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue.access_token
    });
  }

  getCategories(): Observable<any> {
    return this.http.get(api.url + '/category', { headers: this.headers });
  }

}
