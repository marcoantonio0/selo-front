import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from './_services/authentication.service';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private title: Title,
    private sAuth: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId
    ) {
    this.title.setTitle(environment.pageTitle);
    this.sAuth.getSession().subscribe();
    setInterval(() => {
      if(isPlatformBrowser(this.platformId)){
        if(!localStorage.getItem('session')){
          this.sAuth.getSession().subscribe();
        }
      }
    }, 150);
  }
}
