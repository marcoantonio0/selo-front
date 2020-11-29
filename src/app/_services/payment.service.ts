import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private headers: HttpHeaders;
  private checkout = api.url + '/payment/checkout/';
  private payment = api.url + '/payment/';
  private listPayment = api.url + '/payment/list/';
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
    ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue?.access_token
    });
  }


  public getCheckout(id: string): Observable<any> {
    return this.http.get(this.checkout + id, { headers: this.headers });
  }

  public checkoutPayment(body: any): Observable<any> {
    return this.http.post(this.payment, body, { headers: this.headers });
  }

  public getPayments(id: string): Observable<any> {
    return this.http.get(this.listPayment + id, { headers: this.headers });
  }

  public getPayment(id: string): Observable<any> {
    return this.http.get(this.payment + id, { headers: this.headers });
  }

}
