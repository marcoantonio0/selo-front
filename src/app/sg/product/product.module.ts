import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";
import {MatTreeModule} from '@angular/material/tree';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NewComponent } from './new/new.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ProductComponent, EditProductComponent, NewComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    NgxCurrencyModule,
    ProductRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    MatMenuModule,
    MatTreeModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class ProductModule { }
