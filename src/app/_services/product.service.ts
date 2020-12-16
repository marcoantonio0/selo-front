import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers: HttpHeaders;
  private products = api.url+'/product/';
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.sAuth.currentUserValue?.access_token
    });
  }

  getProducts(id: string): Observable<any> {
    return this.http.get(this.products + 'user/' + id, { headers: this.headers });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(this.products + id, { headers: this.headers });
  }

  getProductsSG(id: string, offset = 0): Observable<any> {
    return this.http.get(this.products + id + '/sg?offset='+offset, { headers: this.headers });
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put(this.products + id, data, { headers: this.headers });
  }

  create(data: any): Observable<any> {
    return this.http.post(this.products, data, { headers: this.headers });
  }

  inactive(id: string): Observable<any> {
    return this.http.put(this.products + id + '/inactive', {}, { headers: this.headers });
  }

  active(id: string): Observable<any> {
    return this.http.put(this.products + id + '/active', {}, { headers: this.headers });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.products + id + '/delete', { headers: this.headers });
  }

  deleteMany(ids: string[]): Observable<any> {
    return this.http.put(this.products + 'delete/many', { id: ids }, { headers: this.headers });
  }

}
