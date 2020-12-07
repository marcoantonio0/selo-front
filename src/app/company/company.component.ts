import { RateService } from './../_services/rate.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public company;
  public id;
  public url;
  public notFound: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public rateService: RateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.url = this.route.snapshot.url;
    this.route.params.subscribe(params => {
      if(params.id){
        this.userService.getStore(params.id).subscribe(r => {
          this.company = r;
          this.id = r.id;
        }, e => {
          this.notFound = true;
        });
      } else {
        this.router.navigate(['/']);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        console.log(this.url);
      }
    });
  }

  ngOnInit(): void {}

  checkUrl(val){
    if(val === ''){
      if(this.url === '/company/'+this.id){
        return true;
      }
    } else {
      if(this.url.includes(val)){
        return true;
      }
      return false;
    }
  }

}
