import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';
import { AuthenticationCustomerService } from './authentication-customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private headers: HttpHeaders;
  private register = api.url + '/customer';
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationCustomerService
  ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue?.access_token
    });
  }

  public create(json: any): Observable<any> {
    return this.http.post(this.register, json);
  }

}
