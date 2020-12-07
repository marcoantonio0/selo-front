import { AuthenticationService } from './../../../_services/authentication.service';
import { ProductService } from 'src/app/_services/product.service';
import { FormControl, FormControlName, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  attributes = new FormArray([]);
  public productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    sale_price: new FormControl(''),
    image_link: new FormControl('https://static.berlanda.com.br/berlanda/5f738e94e2dcc20200929194420.jpeg'),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    link: new FormControl('', [Validators.required]),
    discount: new FormControl(''),
    attributes: this.attributes,
    user: new FormControl(''),
    installment: new FormGroup({
      months: new FormControl(''),
      amount: new FormControl('')
    })
  });
  constructor(
    private fb: FormBuilder,
    private sProduct: ProductService,
    private sAuth: AuthenticationService
  ) {
    this.productForm.get('user').setValue(this.sAuth.currentUserValue.id);
    this.attributes.push(this.fb.group({
      name: new FormControl(''),
      description: new FormControl('')
    }));
    this.productForm.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  ngOnInit(): void {
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

  submit(){
    this.sProduct.create(this.productForm.value).subscribe(r => {
      console.log(r);
    }, e => {
      console.log(e);
    })
  }

  removettributes(index){
    this.attributes.controls.splice(index, 1);
  }

}
