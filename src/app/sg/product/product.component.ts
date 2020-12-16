import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService } from './../../_services/authentication.service';
import { ProductService } from 'src/app/_services/product.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products = new FormArray([]);
  public checkedAll = false;
  public isSelected = false;
  public offset = 0;
  public p;
  public totalSelected = 0;
  public selectedAll = new FormControl(false);
  public total = 0;
  constructor(
    private title: Title,
    private sProduct: ProductService,
    private sAuth: AuthenticationService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.title.setTitle('Produtos');
    this.checkAll();
    this.products.valueChanges.subscribe(value => {
      this.checkSelected();
      console.log( this.totalSelected);
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  checkSelected(){
    let selecteds = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products.controls[i].get('selected').value === true){
        selecteds.push(this.products.controls[i].get('selected'));
      }
    }
    this.totalSelected = selecteds.length;

    if(selecteds.length >= 1){
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }

  checkItem(index: number) {
   if(!this.products.controls[index].value.selected){
    this.products.controls[index].get('selected').setValue(true);
  } else {
    this.products.controls[index].get('selected').setValue(false);
   }
  }

  checkAll(){
    this.selectedAll.valueChanges.subscribe(value => {
      if(value === true){
        this.checkedAll = true;
        for (let i = 0; i < this.products.controls.length; i++) {
          this.products.controls[i].get('selected').setValue(true);
        }
      } else {
          for (let i = 0; i < this.products.controls.length; i++) {
            this.products.controls[i].get('selected').setValue(false);
          }
          this.checkedAll = false;
      }
    });
  }

  status(index) {
    if(this.products.controls[index].get('status').value === true){
      this.sProduct.inactive(this.products.controls[index].get('_id').value).subscribe(r => {
        this.products.controls[index].get('status').setValue(false);
      })
    } else {
      this.sProduct.active(this.products.controls[index].get('_id').value).subscribe(r => {
        this.products.controls[index].get('status').setValue(true);
      });
    }
  }

  delete(index) {
    Swal.fire({
      text: `Tem certeza que deseja excluir o produto ${this.products.controls[index].get('title').value}?`,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não' }).then(result => {
      if(result.isConfirmed){
        this.sProduct.delete(this.products.controls[index].get('_id').value).subscribe(r => {
          this.products.controls.splice(index, 1);
          this.getProducts();
          this.snack.open('Produto excluido com sucesso!', 'OK', { duration: 2500 });
        }, e => {
          console.log('Houve um erro ao deletar produto');
        });
      }
    })
  }

  deleteSelecteds(){
    let ids = [];
    for (let i = 0; i < this.products.controls.length; i++) {
      if(this.products.controls[i].get('selected').value === true){
        ids.push(this.products.controls[i].get('_id').value)
      }
    }
    Swal.fire({
      text: `Tem certeza que deseja excluir ${ids.length} produtos ?`,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não' }).then(result => {
        if(result.isConfirmed){
          this.sProduct.deleteMany(ids).subscribe(r => {
            this.total  = this.total - ids.length;
            this.getProducts();
            this.snack.open(`${ids.length} produtos excluido com sucesso!`, 'OK', { duration: 2500 });
          });
          for (let i = 0; i < this.products.controls.length; i++) {
           for (const id of ids) {
            if(this.products.controls[i].get('_id').value === id){
              this.products.controls.splice(i, 1);
            }
           }
          }
        }
      });
  }

  getProducts() {
    this.sProduct.getProductsSG(this.sAuth.currentUserValue.id, this.offset).subscribe(r => {
      this.total = r.total;
      this.products.clear();
      for (const product of r.products) {
        this.products.push(this.fb.group({
          attributes: new FormControl(product.attributes),
          category: new FormControl(product.category),
          image_link: new FormControl(product.image_link),
          price: new FormControl(product.price),
          sale_price: new FormControl(product.sale_price),
          status: new FormControl(product.status),
          title: new FormControl(product.title),
          user: new FormControl(product.user),
          _id: new FormControl(product._id),
          discount: new FormControl(product.discount),
          selected: new FormControl(false)
        }));
      }
    });
  }

  changePage(page: number){
    this.p = page;
    this.offset =  ((20 * this.p) - 20);
    this.getProducts();
  }

}
