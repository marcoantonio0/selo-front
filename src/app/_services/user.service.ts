import { api } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public create(json: any): Observable<any> {
    console.log(api.url + 'user/register');
    return this.http.post(api.url + '/user/register', json);
  }

  public cep(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }

  public getUser(id: any): Observable<any> {
    return this.http.get(api.url + '/user/' + id);
  }

}
