import { SubscriptionComponent } from './subscription/subscription.component';
import { PaymentsComponent } from './payments/payments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentComponent } from './payment.component';

const routes: Routes = [
  { path: '', component: PaymentComponent, children: [
    { path: '', component: PaymentsComponent },
    { path: 'subscription', component: SubscriptionComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
