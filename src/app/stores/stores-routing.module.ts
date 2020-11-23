import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './stores.component';

const routes: Routes = [
  { path: '', component: StoresComponent },
  { path: ':ref/:val', component: StoresComponent },
  { path: ':ref/:val/:ref1/:val1', component: StoresComponent },
  { path: ':ref/:val/:ref1/:val1/:ref2/:val2', component: StoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
