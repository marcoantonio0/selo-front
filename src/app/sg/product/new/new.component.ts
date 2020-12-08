import { AuthenticationService } from './../../../_services/authentication.service';
import { ProductService } from 'src/app/_services/product.service';
import { FormControl, FormControlName, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  attributes = new FormArray([]);
  
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  public productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    sale_price: new FormControl(''),
    image_link: new FormControl('', [Validators.required]),
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

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

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
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


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

  todoLeafItemSelectionToggle(node){
    console.log(node);
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
