import { StoreComponent } from './store/store.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company.component';

const routes: Routes = [
  { path: ':id', component: CompanyComponent, children: [
    { path: '', component: StoreComponent },
    { path: 'products', component: ProductsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
