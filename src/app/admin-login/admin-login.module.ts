import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    AdminLoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class AdminLoginModule { }
