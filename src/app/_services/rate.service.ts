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

  public getById(id: number, offset?: number, star?: number, type?: string[], order?: number): Observable<any> {
    const qOffset = offset ? 'offset=' + offset : 'offset=0';
    const qStar = star ? 'star=' + star : '';
    const qType = type ? 'type=' + type : '';
    const qOrder = order ? 'order=' + order : 'order=0';
    const url = `
    ?${qOffset ? qOffset : '' }${qType ? '&' : ''}
     ${qType ? qType : ''}${qOrder ? '&' : ''}
     ${qOrder ? qOrder : ''}${qStar ? '&' : ''}
     ${qStar ? qStar : '' }`;
    return this.http.get(`${api.url}/rate/${id}${url.replace(/\s/g,'')}`);
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
    const totalStars = 5 - parseInt(stars.toFixed(0));
    const startActive  = '<span class="material-icons star active">star</span>';
    const startInactive  = '<span class="material-icons star">star</span>';
    let starts = '';
    for (let index = 0; index < parseInt(stars.toFixed(0)); index++) {
      starts += startActive;
    }
    for (let index = 0; index < totalStars; index++) {
      starts += startInactive;
    }
    return starts;
  }


}
