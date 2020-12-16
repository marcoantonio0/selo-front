import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  private url: string;
  constructor(
    private route: Router,
    private title: Title,
    public sAuth: AuthenticationService
  ) {
    this.title.setTitle('Pagamentos');
    this.route.events.subscribe((val) => {
      // see also
      this.url = this.route.url;
      // console.log(val instanceof NavigationEnd);
    });
  }

  ngOnInit(): void {
  }

  checkUrl(type: string){
    if(type === ''){
      if(this.url === '/app/payment'){
        return true;
      } else {
        return false;
      }
    } else {
      if(this.url.includes(type)) return true;
      else return false;
    }
  }

}
