import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public sAtuth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.sAtuth.logout();
  }

}
