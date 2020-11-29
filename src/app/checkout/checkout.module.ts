import { NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { ThanksComponent } from './thanks/thanks.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CheckoutComponent, PaymentComponent, ThanksComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    NgbAlertModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class CheckoutModule { }
