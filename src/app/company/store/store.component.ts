import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RateService } from 'src/app/_services/rate.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  public company;
  public rates = [];
  private id;
  private offset = 0;
  private limit = 5;
  private page = 1;
  public total;
  public typeFilter = false;
  public starFilter = false;
  public votedFilter = false;
  public loadingRates = false;
  public homeCompany;
  public allVotes = [];
  public star = 0;
  public order = 0;
  public isRateLoading = true;
  public type = [];
  private offsetChange = 0;
  public stars = [1, 2, 3, 4, 5];
  public session;
  typeArray = new FormArray([]);
  public filter = new FormGroup({
    type:  this.typeArray,
    offset: new FormControl(0),
    star: new FormControl(0),
    order: new FormControl(0)
  });
  selectedTypes = [];
  public types = [
    {
      type: 'praise',
      name: 'Avaliação'
    },
    {
      type: 'claim',
      name: 'Reclamação'
    },
    {
      type: 'suggestion',
      name: 'Sugestão'
    }
  ];
  public orders = [
    {
      type: 0,
      name: 'Recentes'
    },
    {
      type: 1,
      name: 'Mais votados'
    },
    {
      type: 2,
      name: 'Menos votados'
    }
  ];
  public notFound: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public rateService: RateService,
    private router: Router,
    private fb: FormBuilder,
    public sRate: RateService,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.filterChange();
    this.typeChanges();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id){
        this.userService.getStore(params.id).subscribe(r => {
          this.isRateLoading = false;
          this.company = r;
          this.id = r.id;
          this.rateService.getById(this.id).subscribe(r => {
            this.session = this.rateService.getCurrentSession();
            this.setAllVotes();
            this.rates = r.rates;
            this.total = r.total;
          });
        }, e => {
          this.isRateLoading = false;
          this.notFound = true;
        });
      }
    });
  }

  filterChange(){
    this.filter.valueChanges.subscribe(value => {
      let isChange = false;
      if(value.offset != this.offsetChange){
        this.loadingRates = true;
        this.offsetChange = value.offset;
      }
      if(value.star != this.star  || value.type.length != this.type.length || value.order != this.order){
        isChange = true;
        this.offset = 0;
        this.offsetChange = 0;
        this.page = 1;
        this.star = value.star;
        this.type = value.type.join('-');
        this.order = value.order;
        this.isRateLoading = true;
      }
      this.rateService.getById(
        this.id,
        this.offset,
        this.star,
        this.type,
        value.order
      ).subscribe(r => {
        if(isChange){
          this.isRateLoading = false;
          this.rates = [];
          this.loadingRates = false;
          for (const rate of r.rates) {
            this.rates.push(rate);
          }
        } else {
          if(this.loadingRates){
            this.loadingRates = false;
            for (const rate of r.rates) {
              this.rates.push(rate);
            }
          }
        }
        this.setAllVotes();
        this.total = r.total;
      }, e => {
        this.isRateLoading = false;
        this.notFound = true;
      });
    })
  }

  clearStar(){
    this.filter.controls.star.setValue(0);
    this.star = 0;
  }

  typeChanges(){
    this.typeArray.valueChanges.subscribe(value => {
      this.selectedTypes = [];
      for (const type of this.types) {
        const index = value.findIndex(x => x == type.type);
        if(index >= 0){
          this.selectedTypes.push(type);
        }
      }
    })
  }

  orderName(){
    return this.orders[this.orders.findIndex(x => x.type == this.filter.value.order)];
  }

  toggleValueType(value){
    const index = this.typeArray.controls.findIndex(x => x.value == value);
    if(index >= 0){
      this.typeArray.removeAt(index);
    } else {
      this.typeArray.push(this.fb.control(value));
    }
    console.log(this.typeArray.value);
  }

  checkSelectedType(value){
    const index = this.typeArray.controls.findIndex(x => x.value == value);
    if(index >= 0){
      return true;
    }
    return false;
  }

  toggleType(type: string) {
    if(type == 'type'){
      if(!this.typeFilter){
        this.typeFilter = true;
      } else {
        this.typeFilter = false;
      }
    }
    if(type == 'star'){
      if(!this.starFilter){
        this.starFilter = true;
      } else {
        this.starFilter = false;
      }
    }
    if(type == 'order'){
      if(!this.votedFilter){
        this.votedFilter = true;
      } else {
        this.votedFilter = false;
      }
    }
  }

  closeType(type: string) {
    if(type == 'type'){
      this.typeFilter = false;
    }
    if(type == 'star'){
      this.starFilter = false;
    }
    if(type == 'voted'){
      this.votedFilter = false;
    }
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
    this.filter.get('offset').setValue(this.offset);
  }
}
