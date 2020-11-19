import { RateService } from './../_services/rate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public company;
  public rates;
  private id;
  private offset = 0;
  private limit = 5;
  private page = 1;
  public total;
  public loadingRates = false;
  public allVotes = [];
  public session;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public rateService: RateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id){
        this.id = params.id;
        this.userService.getUser(params.id).subscribe(r => {
          this.company = r;

          this.rateService.getById(params.id).subscribe(r => {
            this.session = this.rateService.getCurrentSession();
            this.setAllVotes();
            this.rates = r.rates;
            this.total = r.total;
          });

        }, e => {
          this.router.navigate(['/']);
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  setAllVotes(): void {
    for (const likes of this.session.likes) {
      this.allVotes.push(likes)
    }
    for (const deslikes of this.session.deslikes) {
      this.allVotes.push(deslikes);
    }
  }

  checkHasVoted(_id): boolean {
    const index = this.allVotes.findIndex(x => x === _id);
    if(index >= 0) return true;
    else return false;
  }

  checkVotes(_id, type: string): boolean {
    const indexLikes = this.session.likes.findIndex(x => x === _id);
    const indexDeslikes = this.session.deslikes.findIndex(x => x === _id);
    if(type == 'likes'){
      if(indexLikes >= 0){
        console.log(true);
        return true;
      } else {
        return false;
      }
    }
    if(type == 'deslikes') {
      if(indexDeslikes >= 0){
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  like(_id, index): void {
    this.rateService.setLike(_id).subscribe(r => {
      this.rates[index].like = this.rates[index].like + 1;
      this.allVotes.push(_id);
      this.session.likes.push(_id);
      console.log(this.session.likes);
    }, e => {
      console.log(e);
    });
  }

  deslike(_id, index): void {
    this.rateService.setDeslike(_id).subscribe(r => {
      this.rates[index].deslike = this.rates[index].deslike + 1;
      this.allVotes.push(_id);
      this.session.deslikes.push(_id);
    }, e => {
      console.log(e);
    });
  }

  getMoreRates(): void {
    this.page = this.page + 1;
    this.offset =  ((5 * this.page) - 5);
    this.loadingRates = true;
    this.rateService.getById(this.id, this.offset).subscribe(r => {
      this.loadingRates = false;
      for (const rate of r.rates) {
        this.rates.push(rate);
      }
    }, e => {
      this.loadingRates = false;
    });
  }

}
