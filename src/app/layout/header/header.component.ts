import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchStatus: boolean = false;
  public searchForm = new FormGroup({
    search: new FormControl('', [Validators.required])
  });
  constructor(
    public sAtuth: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit(): void {
  }

  openSearch(): void {
    if (!this.searchStatus) {
      this.searchStatus = true;
      if(isPlatformBrowser(this.platformId)){
        setTimeout(() => {
          document.getElementById('search').focus();
        }, 5);
      }
    } else {
      this.searchStatus = false;
    }
  }

  logout(){
    this.sAtuth.logout();
  }

}
