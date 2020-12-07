import { NewComponent } from './new/new.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'edit/:id', component: EditProductComponent },
  { path: 'new', component: NewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
