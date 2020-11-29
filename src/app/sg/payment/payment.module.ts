import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [PaymentComponent, PaymentsComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    PaymentRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PaymentModule { }
