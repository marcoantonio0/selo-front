import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetEmailComponent } from './forget-email.component';

const routes: Routes = [{ path: '', component: ForgetEmailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetEmailRoutingModule { }
