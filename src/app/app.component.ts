import { AuthenticationService } from './_services/authentication.service';
import { Component } from '@angular/core';
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
    private sAuth: AuthenticationService
    ) {
    this.title.setTitle(environment.pageTitle);
    this.sAuth.getSession().subscribe(r => {
      console.log('Session!');
    });
  }
}
