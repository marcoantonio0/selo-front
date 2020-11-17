import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }

  public getById(id: number, offset?: number): Observable<any> {
    return this.http.get(`${api.url}/rate/${id}${offset ? '?offset=' + offset : ''}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post(api.url + '/rate', data);
  }

  public setLike(_id: string): Observable<any> {
    return this.http.post(api.url + '/rate/like', { _id });
  }

  public setDeslike(_id: string): Observable<any> {
    return this.http.post(api.url + '/rate/deslike', { _id });
  }

  public startsHTML(stars: number) {
    const totalStars = 5 - stars;
    const startActive  = '<span class="material-icons star active">grade</span>';
    const startInactive  = '<span class="material-icons star">grade</span>';
    let starts = '';
    for (let index = 0; index < stars; index++) {
      starts += startActive;
    }
    for (let index = 0; index < totalStars; index++) {
      starts += startInactive;
    }
    return starts;
  }

}
