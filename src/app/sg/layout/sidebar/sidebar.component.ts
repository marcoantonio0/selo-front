import { AuthenticationService } from './../../../_services/authentication.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private url;
  public user;
  profileDefault: string;
  constructor(
    private route: Router,
    private sAuth: AuthenticationService
  ) {
    this.user = this.sAuth.currentUserValue;
    this.profileDefault =  this.profileDefaultAssign(this.user.fantasy_name);
    this.route.events.subscribe((val) => {
      this.url = this.route.url;
    });
  }

  ngOnInit(): void { }

  private profileDefaultAssign(name: string): string {
    const nameSplit = name.split(' ');
    if(nameSplit.length > 1){
      return `${nameSplit[0].charAt(0).toLocaleUpperCase()}${nameSplit[1].charAt(0).toLocaleUpperCase()}`;
    } else {
      return nameSplit[0].charAt(0).toLocaleUpperCase();
    }
  }

  checkUrl(type: string){
    if(type === ''){
      if(this.url === '/app'){
        return true;
      } else {
        return false;
      }
    } else {
      if(this.url.includes(type)) return true;
      else return false;
    }
  }


  logout(){
    this.sAuth.logout();
    this.route.navigate(['/']);
  }
}
