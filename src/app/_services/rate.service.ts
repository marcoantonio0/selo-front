import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId
    ) { }

  public getById(id: number, offset?: number): Observable<any> {
    return this.http.get(`${api.url}/rate/${id}${offset ? '?offset=' + offset : ''}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post(api.url + '/rate', data);
  }

  public setLike(_id: string): Observable<any> {
    return this.http.post(api.url + '/rate/like', { _id }).pipe(map(like => {
      if (isPlatformBrowser(this.platformId)){
        const cookie = JSON.parse(localStorage.getItem('session'));
        const session = cookie ? cookie : null;
        if(session){
          session.likes.push(_id);
          localStorage.setItem('session', JSON.stringify(session));
        }
      }
    }));
  }

  public getCurrentSession(): Object {
    let cookie;
    if(isPlatformBrowser(this.platformId)){
      cookie = localStorage.getItem('session');
      if(cookie) { return JSON.parse(cookie); }
      else { return null; }
    }
  }

  public setDeslike(_id: string): Observable<any> {
    return this.http.post(api.url + '/rate/deslike', { _id }).pipe(map(deslike => {
      if (isPlatformBrowser(this.platformId)){
        const cookie = JSON.parse(localStorage.getItem('session'));
        const session = cookie ? cookie : null;
        if(session){
          session.deslikes.push(_id);
          localStorage.setItem('session', JSON.stringify(session));
        }
      }
    }))
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
