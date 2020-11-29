import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private url: string;
  constructor(
    private route: Router,
    public sAuth: AuthenticationService
  ) {
    this.route.events.subscribe((val) => {
      // see also
      this.url = this.route.url;
      // console.log(val instanceof NavigationEnd);
    });
  }

  checkUrl(type: string){
    if(type === ''){
      if(this.url === '/app/user'){
        return true;
      } else {
        return false;
      }
    } else {
      if(this.url.includes(type)) return true;
      else return false;
    }
  }

  ngOnInit(): void {

  }

}
