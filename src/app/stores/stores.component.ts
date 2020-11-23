import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RateService } from './../_services/rate.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  public stores: [];
  public categories = [];
  public rates = [];
  public filters: any;
  public page = 1;
  public offset = 0;
  public link;
  private rotaBase;
  private totalItems;
  public pages = [];
  constructor(
    private sUser: UserService,
    public sRate: RateService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.route.params.subscribe(params => {
      this.title.setTitle('Lojas');
      this.rotaBase = '/stores/';
      // Gera JSON do filtros
      let filtrosString = '{';
      if (params.ref && params.ref != ''){
        filtrosString += `"${params.ref}":"${params.val}"${params.ref1 ? ',' : ''}`;
      }
      if (params.ref1 && params.ref1 != ''){
        filtrosString += `"${params.ref1}":"${params.val1}"${params.ref2 ? ',' : ''}`;
      }
      if (params.ref2 && params.ref2 != ''){
        filtrosString += `"${params.ref2}":"${params.val2}"`;
      }
      filtrosString += '}';
      this.filters = JSON.parse(filtrosString);
      this.link = '/' + Object.entries(this.filters).join().split(',').join('/');

      if (this.filters.p){
        this.offset =  ((15 * this.filters.p) - 15);
      } else {
        this.filters.p = 1;
        this.offset = 0;
      }

      this.sUser.getStores(this.offset, this.filters?.c, this.filters?.m).subscribe(r => {
        this.stores = r.stores;
        this.categories = r.filters.category;
        this.rates = r.filters.media;
        this.totalItems = r.total;
        this.pages = [];
        const totalPages = Math.floor(this.totalItems / 15);
        for (let i = 0; i < (totalPages == 0 ? 1 : totalPages); i++) {
          this.pages.push(i + 1);
        }

      }, e => {
        console.log(e);
      });

    });


  }

  getFiltersCategory(){
    if (this.filters.c && this.categories){
      const array = [];
      const filters = this.filters.c.split('-');
      for (const category of this.categories) {
        for (const categoryfiltered of filters) {
            if (category._id === categoryfiltered){
              array.push(category);
            }
        }
      }
      return array;
    }
    return null;
  }

  getFiltersRate(){
    if (this.filters.m){
      const array = [];
      for (const rate of this.filters.m.split('-')) {
        array.push(parseFloat(rate));
      }
      return array;
    }
    return null;
  }

  setFilter(referencia, valor: any){
    if (referencia === 'c'){
      if (this.filters.c){
        const array: any[] = this.filters.c.split('-');
        const index = array.findIndex(x => (x === valor));
        if (index >= 0){
          array.splice(index, 1);
          if (array.length <= 0){
            delete this.filters.c;
          } else {
            this.filters.c = array.join('-');
          }
        } else {
          array.push(valor);
          this.filters.c = array.join('-');
        }
      } else {
        this.filters.c = valor;
      }
     }
    if (referencia === 'm'){
        this.filters.m = valor;
     }
    this.link = '/' + Object.entries(this.filters).join().split(',').join('/');
    const url = this.rotaBase + this.link;
    this.router.navigate([url]);
  }

  removeMedia(){
    delete this.filters.m;
    this.link = '/' + Object.entries(this.filters).join().split(',').join('/');
    const url = this.rotaBase + this.link;
    this.router.navigate([url]);
  }

  checkActiveCategory(id){
    if (this.filters.c){
      const index = this.filters.c.split('-').indexOf(id);
      if (index >= 0){
        return true;
      }
      return false;
    }
  }

  checkActiveMedia(media){
    if(this.filters.m){
     const index = this.filters.m.split('-').findIndex(x => x === media.toString());
     if(index >= 0){
       return true;
     }
     return false;
    }
    return false;
  }

  pageChanged(page){
    this.filters.p = page;
    this.link = Object.entries(this.filters).join().split(',').join('/');
    const url = this.rotaBase + this.link;
    this.router.navigate([url]);
  }

  nextPage(){
    this.filters.p = parseFloat(this.filters.p) + 1;
    this.link = Object.entries(this.filters).join().split(',').join('/');
    const url = this.rotaBase + this.link;
    this.router.navigate([url]);
  }

  previousPage(){
    this.filters.p = parseFloat(this.filters.p) - 1;
    this.link = Object.entries(this.filters).join().split(',').join('/');
    const url = this.rotaBase + this.link;
    this.router.navigate([url]);
  }

  getPageArray(){

  }

  ngOnInit(): void {
  }



}
