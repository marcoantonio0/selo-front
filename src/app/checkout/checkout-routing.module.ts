import { ThanksComponent } from './thanks/thanks.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent } from './checkout.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent, children: [
    { path: 'payment', component: PaymentComponent },
    { path: 'thanks/:id', component: ThanksComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
