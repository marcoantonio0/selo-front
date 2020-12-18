import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { MatRippleModule } from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsComponent } from './products/products.component';
import { StoreComponent } from './store/store.component';


@NgModule({
  declarations: [CompanyComponent, ProductsComponent, StoreComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxContentLoadingModule,
    MatRadioModule,
    NgxMaskModule.forRoot()
  ]
})
export class CompanyModule { }
