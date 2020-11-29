import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })
export class AuthenticationAdminService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId,
      private snack: MatSnackBar
      ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUserAdmin')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${api.url}/admin/auth`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUserAdmin', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.snack.open('Login efetuado com sucesso!', 'OK', { duration: 4000 });
                return user;
            }));
    }

    logout(): void {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUserAdmin');
        this.currentUserSubject.next(null);
    }

}
