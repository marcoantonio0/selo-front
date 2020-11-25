import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PaymentService } from './../_services/payment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public cartForm = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    cvc: new FormControl(''),
    expired: new FormControl(''),
    product: new FormControl()
  });
  public products: any[];
  public user: any;
  constructor(
    private sPayment: PaymentService,
    private sAuth: AuthenticationService
  ) {
    this.cartForm.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  ngOnInit(): void {
    this.sPayment.getCheckout(this.sAuth.currentUserValue.id).subscribe(r => {
      this.products = r.products;
      this.user = r.user;
    }, e => {
      console.log(e);
    })
  }

  pay(){
    let json = {
      card: {
        cvc: this.cartForm.value.cvc,
        number: this.cartForm.value.number,
        exp_month: this.cartForm.value.expired.split('/')[0],
        exp_year: this.cartForm.value.expired.split('/')[1]
      },
      customer: this.user.id
    };
    console.log(json);
    this.sPayment.checkoutPayment(this.cartForm.value.product, json).subscribe(r => {
      console.log(r);
    });
  }

}
