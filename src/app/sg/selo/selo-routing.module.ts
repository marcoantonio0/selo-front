import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeloComponent } from './selo.component';

const routes: Routes = [{ path: '', component: SeloComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeloRoutingModule { }
