import { AuthenticationService } from './authentication.service';
import { api } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders;
  private register = api.url + '/user/register';
  private user = api.url + '/user/';
  private address = api.url + '/user/address/';
  private website = api.url + '/user/website/';
  private category = api.url + '/user/category/';
  private description = api.url + '/user/description/';
  private owners = api.url + '/user/owners/';
  private store = api.url + '/user';
  constructor(
    private http: HttpClient,
    private sAuth: AuthenticationService
    ) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.sAuth.currentUserValue?.access_token
    });
  }

  public create(json: any): Observable<any> {
    return this.http.post(this.register, json);
  }

  public cep(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }

  public getUser(id: any): Observable<any> {
    return this.http.get(this.user + id);
  }

  public getAddress(id: any): Observable<any> {
    return this.http.get(this.address + id);
  }

  public getOwners(id: any): Observable<any> {
    return this.http.get(this.owners + id, { headers: this.headers });
  }

  public getWebsite(id: any): Observable<any> {
    return this.http.get(this.website + id, { headers: this.headers });
  }

  public putCategories(id: any, data: any): Observable<any> {
    return this.http.put(this.category + id, data, { headers: this.headers });
  }

  public putDescription(id: any, data: any): Observable<any> {
    return this.http.put(this.description + id, data, { headers: this.headers });
  }

  public putAddress(id: any, data): Observable<any> {
    return this.http.put(this.address + id, data, { headers: this.headers });
  }

  public putOwners(id: any, data): Observable<any> {
    return this.http.put(this.owners + id, data, { headers: this.headers });
  }

  public getStores(offset?: any, category?: any, media?: any): Observable<any> {
    let hasQuery = '';
    if (offset || category || media){
      hasQuery = '?';
    }
    const offsetValue = offset ? `offset=${offset}${category ? '&' : ''}` : '';
    const categoryValue = category ? `category=${category}${media ? '&' : ''}` : '';
    const mediaValue = media ? `media=${media}` : '';
    return this.http.get(this.store + hasQuery + offsetValue + categoryValue + mediaValue);
  }

}
