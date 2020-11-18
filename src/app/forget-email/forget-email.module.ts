import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetEmailRoutingModule } from './forget-email-routing.module';
import { ForgetEmailComponent } from './forget-email.component';


@NgModule({
  declarations: [ForgetEmailComponent],
  imports: [
    CommonModule,
    ForgetEmailRoutingModule
  ]
})
export class ForgetEmailModule { }
