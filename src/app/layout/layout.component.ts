import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private sAuth: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.sAuth.getSession().subscribe();
    setInterval(() => {
      if(isPlatformBrowser(this.platformId)){
        if(!localStorage.getItem('session')){
          this.sAuth.getSession().subscribe();
        }
      }
    }, 150);
  }

  ngOnInit(): void {
  }

}
