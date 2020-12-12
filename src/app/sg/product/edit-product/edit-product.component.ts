import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  attributes = new FormArray([]);
  selectCategory;
  public loading = false;
  categorySelected = false;
  alerts: any[] = [];
  categoryLoading = false;
  timeinterval;
  public category = [];
  public treeCategories = [];
  public sidebarCategory: boolean = false;
  public installment = new FormGroup({
    months: new FormControl(''),
    amount: new FormControl('')
  });
  public productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    sale_price: new FormControl(''),
    image_link: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(5000)]),
    link: new FormControl('', [Validators.required]),
    discount: new FormControl(''),
    attributes: this.attributes,
    category: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
    sku: new FormControl(''),
    ean: new FormControl(''),
    status: new FormControl(false),
    installment: this.installment
  });
  public id;

  constructor(
    private fb: FormBuilder,
    private sProduct: ProductService,
    private sAuth: AuthenticationService,
    private sCategory: CategoryService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.route.params.subscribe(param => {
      if(param.id){
        this.id = param.id;
        this.sProduct.getProductById(this.id).subscribe(r => {

          this.productForm.get('title').setValue(r.title);
          this.productForm.get('sale_price').setValue(r.sale_price);
          this.productForm.get('image_link').setValue(r.image_link);
          this.productForm.get('price').setValue(r.price);
          this.productForm.get('description').setValue(r.description);
          this.productForm.get('link').setValue(r.link);
          this.productForm.get('category').setValue(r.category);
          this.productForm.get('user').setValue(r.user);
          this.productForm.get('sku').setValue(r.sku);
          this.productForm.get('ean').setValue(r.ean);
          this.productForm.get('discount').setValue(r.discount);
          this.productForm.get('status').setValue(r.status);
          this.installment.get('months').setValue(r.installment.months);
          this.installment.get('amount').setValue(r.installment.amount);
          if(r.category.length > 0){
            this.category = r.category
            this.getTreeCategories(this.category);
          }
          if(r.attributes.length > 0){
            for (const attribute of r.attributes) {
              this.attributes.push(this.fb.group({
                name: new FormControl(attribute.name),
                description: new FormControl(attribute.description)
              }))
            };
          } else {
            this.addAttributes();
          }
        })
      }
    })

    this.productForm.get('user').setValue(this.sAuth.currentUserValue.id);
  }

  getCategories(event){
    this.category = event;
    this.productForm.get('category').setValue(this.category);
    this.getTreeCategories(this.category);
  }

  ngOnInit(): void {
    this.category.push();

  }

  validation(json){
    if(!json.title){
      return 'O título é obrigatório.';
    }

    if(json.title && json.title > 140){
      return 'A descrição deve contar no máximo 150 caracteres.';
    }

    if(!json.image_link) {
      return 'O link da imagem é obrigatório.';
    }

    if(json.description && json.description.length > 5000){
      return 'A descrição deve contar no máximo 5000 caracteres.';
    }

    if(!json.price){
      return 'O preço é obrigatório.';
    }

    if(!json.link){
      return 'O link do produto é obrigatório.';
    }
    if(json.category.length <= 0){
      return 'A categoria do produto é obrigatória.';
    }
    if(!json.user){
      return 'Insiria o ID do usuário.';
    }
    return true;
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
    if(this.attributes.invalid) return this.alert('Verifique os campos faltantes em atributos.', 'warning', false, true);
    if(this.validation(this.productForm.value) === true){
      this.loading = true;
      this.sProduct.updateProduct(this.id, this.productForm.value).subscribe(r => {
        this.loading = false;
        console.log(r);
      }, e => {
        this.loading = false;
        if(e.length > 0){
          for (const erro of e) {
            this.alert(erro.error, 'danger', false, false);
          }
        } else {
          this.alert(e, 'danger', false, true);
        }
      })
    } else {
      this.alert(this.validation(this.productForm.value), 'warning', false, true);
    }
  }

  removettributes(index){
    this.attributes.removeAt(index);
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
