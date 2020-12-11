import { isPlatformBrowser } from '@angular/common';
import { CategoryService } from './../../../_services/category.service';
import { AuthenticationService } from './../../../_services/authentication.service';
import { ProductService } from 'src/app/_services/product.service';
import { FormControl, FormControlName, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { isConstructorDeclaration } from 'typescript';
import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  attributes = new FormArray([]);
  selectCategory;
  categorySelected = false;
  alerts: any[] = [];
  categoryLoading = false;
  timeinterval;
  public category = [];
  public treeCategories = [];
  public sidebarCategory: boolean = false;
  public productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    sale_price: new FormControl(''),
    image_link: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    link: new FormControl('', [Validators.required]),
    discount: new FormControl(''),
    attributes: this.attributes,
    category: new FormControl('', Validators.required),
    user: new FormControl(''),
    installment: new FormGroup({
      months: new FormControl(''),
      amount: new FormControl('')
    })
  });


  constructor(
    private fb: FormBuilder,
    private sProduct: ProductService,
    private sAuth: AuthenticationService,
    private sCategory: CategoryService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.productForm.get('user').setValue(this.sAuth.currentUserValue.id);
    this.attributes.push(this.fb.group({
      name: new FormControl(''),
      description: new FormControl('')
    }));
    this.productForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  getCategories(event){
    this.category = event;
    this.productForm.get('category').setValue(this.category);
    this.getTreeCategories(this.category);
  }

  ngOnInit(): void {
    this.category.push();
  }

  getError(formControl: FormControl){
    if (formControl.errors.required){
      return 'Este campo é requirido.';
     }
    if (formControl.errors.email){
      return 'Insira um e-mail válido.';
     }
    if (formControl.errors.maxlength){
      return `Máximo ${formControl.errors.maxlength.requiredLength} caracteres.`;
     }
    if (formControl.errors.minlength){
      return `Mínimo ${formControl.errors.minlength.requiredLength} caracteres.`;
     }
    if(formControl.errors.pattern){
      return `Url inválido. Ex.: www.website.com.br`;
     }
    if(formControl.errors.NoPassswordMatch) {
      return `As senhas não coincidem.`;
     }
  }



  addAttributes(){
    this.attributes.push(this.fb.group({
      name: new FormControl(''),
      description: new FormControl('')
    }));
  }

  getTreeCategories(categoriesId){
    this.categoryLoading = true;
    this.treeCategories = [];
    if(!this.categorySelected){
      this.categorySelected = true;
    }
    for (const id of categoriesId) {
      this.sCategory.getTree(id).subscribe(r => {
        this.categoryLoading = false;
        this.treeCategories.push(r);
      })
    }
    if(this.treeCategories.length === categoriesId.length){
      this.categoryLoading = false;
    }
  }

  openCategory(){
    this.sidebarCategory = true;
  }

  submit(){
    this.sProduct.create(this.productForm.value).subscribe(r => {
      console.log(r);
    }, e => {
      if(e.length > 0){
        for (const erro of e) {
          this.alert(erro.error, 'danger', false, false);
        }
      } else {
        this.alert(e, 'danger', false, true);
      }
    })
  }

  removettributes(index){
    this.attributes.controls.splice(index, 1);
  }

  close(index) {
    this.alerts.splice(index, 1);
  }

  statusCategory(event){
    this.sidebarCategory = event;
  }

  public alert(error, type: 'warning'|'danger'|'success',  timeout = false, clear = false): void {
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo(0 ,0);
    }
    if(this.timeinterval){
      clearInterval(this.timeinterval);
    }
    if(clear){
      this.alerts = [];
    }
    this.alerts.push({type, error});
    if(timeout) {
      this.timeinterval = setInterval(() => {
        this.alerts.pop();
      }, 2500);
    }
  }


}
