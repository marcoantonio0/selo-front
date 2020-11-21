import { api } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private register = api.url + 'user/register';
  private user = api.url + '/user/';
  private address = api.url + '/user/address/';
  constructor(private http: HttpClient) { }

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

}
