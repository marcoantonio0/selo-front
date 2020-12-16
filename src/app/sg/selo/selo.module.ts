import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeloRoutingModule } from './selo-routing.module';
import { SeloComponent } from './selo.component';


@NgModule({
  declarations: [SeloComponent],
  imports: [
    CommonModule,
    SeloRoutingModule,
    MatSnackBarModule
  ]
})
export class SeloModule { }
