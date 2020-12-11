import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private productCategories = api.url + '/productcategory';
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
    ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue?.access_token
    });
  }

  getCategories(): Observable<any> {
    return this.http.get(api.url + '/category', { headers: this.headers });
  }

  getProductCategoryList(): Observable<any>{
    return this.http.get(this.productCategories + '/list', { headers: this.headers });
  }

  getProductSub(id): Observable<any>{
    return this.http.get(this.productCategories + '/parent/' + id , { headers: this.headers });
  }

  getTree(id): Observable<any>{
    return this.http.get(this.productCategories + '/tree/' + id , { headers: this.headers });
  }

}
