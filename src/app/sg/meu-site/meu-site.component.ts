import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from 'src/app/_services/category.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-meu-site',
  templateUrl: './meu-site.component.html',
  styleUrls: ['./meu-site.component.scss']
})
export class MeuSiteComponent implements OnInit {
  description = new FormControl('');
  categories: any;
  categoryLoading = false;
  descriptionLoading = false;
  defaultDescription: any;
  userCategories: any;
  timeinterval: any;
  userCategoriesDefault: any;
  alertsCategory = [];
  alertsDescription = [];
  constructor(
    private sCategory: CategoryService,
    private sUser: UserService,
    private sAuth: AuthenticationService,
    private title: Title
  ) {
    this.title.setTitle('Meu site');
    this.sUser.getWebsite(this.sAuth.currentUserValue.id).subscribe(r => {
      this.userCategories = r.category;
      this.userCategoriesDefault = JSON.parse(JSON.stringify(r.category));
      this.description.setValue(r.description);
      this.defaultDescription = r.description;
    })
    this.sCategory.getCategories().subscribe(r => {
      this.categories = r;
    });
  }

  ngOnInit(): void {

  }

  public alertCategory(message, type: 'warning'|'danger'|'success',  timeout = false, clear = false, array?: ''): void {
    if(this.timeinterval){
      clearInterval(this.timeinterval);
    }
    if(clear){
      this.alertsCategory = [];
    }
    this.alertsCategory.push({type, message});
    if(timeout) {
      this.timeinterval = setInterval(() => {
        this.alertsCategory.pop();
      }, 2500);
    }
  }

  public alertDescription(message, type: 'warning'|'danger'|'success',  timeout = false, clear = false, array?: ''): void {
    if(this.timeinterval){
      clearInterval(this.timeinterval);
    }
    if(clear){
      this.alertsDescription = [];
    }
    this.alertsDescription.push({type, message});
    if(timeout) {
      this.timeinterval = setInterval(() => {
        this.alertsDescription.pop();
      }, 2500);
    }
  }

  close(index, type = 1): void {
    if(type == 1){
      this.alertsDescription.splice(index, 1);
    } else {
      this.alertsCategory.splice(index, 1);
    }
  }

  updateDescription(){
    if(this.description.value.length <= 0 || !(this.description.value.length >= 1 && this.description.value.length <= 240)) {
      this.alertDescription('Mínimo 1 e máximo 240 caracteres.', 'warning', true, true);
    }
    else if(this.description.value == this.defaultDescription) {
      this.alertDescription('Nenhuma alteração encontrada.', 'warning', true, true);
    }
    else {
      this.descriptionLoading = true;
      this.sUser.putDescription(this.sAuth.currentUserValue.id, { description: this.description.value }).subscribe(r =>{
        this.descriptionLoading = false;
        this.defaultDescription = this.description.value;
        this.alertDescription(r.message, 'success', true, true);
      }, e => {
        this.descriptionLoading = false;
        this.alertDescription(e, 'danger', false, true);
      });
    }
  }

  removeCategory(id): void {
    const index = this.userCategories.findIndex(x => x._id == id);
    if (index >= 0){
      this.userCategories.splice(index, 1);
    }
  }

  updateCategories(){
    if(this.userCategories.length >= 0 && JSON.stringify(this.userCategories) != JSON.stringify(this.userCategoriesDefault)){
      this.categoryLoading = true;
      const categoryArray = [];
      for (const ct of this.userCategories) {
        categoryArray.push(ct._id);
      }
      this.sUser.putCategories(this.sAuth.currentUserValue.id, { category: categoryArray }).subscribe(r => {
        this.userCategoriesDefault = JSON.parse(JSON.stringify(this.userCategories));
        this.categoryLoading = false;
        this.alertCategory(r.message, 'success', true, true);
      }, e => {
        this.categoryLoading = false;
        this.alertCategory(e, 'danger', true, true);
      });
    } else {
      this.alertCategory('Nenhuma alteração encontrada.', 'warning', false, true);
    }
  }

  addCategory(id): void{
    const index = this.userCategories.findIndex(x => x._id == id);
    if (index == -1){
      if(this.userCategories.length < 6){
        const indexCategory = this.categories.findIndex(x => x._id == id);
        this.userCategories.push(this.categories[indexCategory]);
      }
    } else {
      this.userCategories.splice(index, 1);
    }
  }

  checkSelected(id): boolean {
    const index = this.userCategories?.findIndex(x => x._id == id);
    if(index >= 0){
      return true;
    } else {
      return false;
    }
  }

}
