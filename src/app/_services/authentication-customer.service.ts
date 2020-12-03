import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCustomerService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
constructor(
  private http: HttpClient,
  @Inject(PLATFORM_ID) private platformId,
  private snack: MatSnackBar
) {
  this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentCustomerUser')));
  this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): any {
  return this.currentUserSubject.value;
}

login(email: string, password: string) {
  return this.http.post<any>(`${api.url}/customer/auth`, { email, password })
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentCustomerUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.snack.open('Login efetuado com sucesso!', 'OK', { duration: 4000 });
          return user;
      }));
}

logout(): void {
  // remove user from local storage and set current user to null
  localStorage.removeItem('currentCustomerUser');
  this.currentUserSubject.next(null);
}

}
