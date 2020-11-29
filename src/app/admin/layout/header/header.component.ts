import { AuthenticationAdminService } from 'src/app/_services/authentication-admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user;
  profileDefault: string;
  constructor(
    private sAuth: AuthenticationAdminService
  ) {
    this.user = this.sAuth.currentUserValue;
    this.profileDefault =  this.profileDefaultAssign(this.user.first_name);
  }

  ngOnInit(): void {
  }

  private profileDefaultAssign(name: string): string {
    const nameSplit = name.split(' ');
    if(nameSplit.length > 1){
      return `${nameSplit[0].charAt(0).toLocaleUpperCase()}${nameSplit[1].charAt(0).toLocaleUpperCase()}`;
    } else {
      return nameSplit[0].charAt(0).toLocaleUpperCase();
    }
  }

}
