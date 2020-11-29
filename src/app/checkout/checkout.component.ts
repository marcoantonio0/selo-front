import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PaymentService } from './../_services/payment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { api } from 'src/environments/environment';
import { ClassElement } from 'typescript';
declare var DirectCheckout: any;

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
  @ViewChild('cardBrand', { static: true }) private cardBrand: ElementRef<HTMLDivElement>;
  public checkout;
  public plans: any[];
  public user: any;
  public cardType: string;
  public cardHash: string;
  constructor(
    private sPayment: PaymentService,
    private sAuth: AuthenticationService
  ) {
    this.getTypeCart();
  }

  ngOnInit(): void {
    this.sPayment.getCheckout(this.sAuth.currentUserValue.id).subscribe(r => {
      this.plans = r.plans;
      this.user = r.user;
    }, e => {
      console.log(e);
    });

  }

  generateHashCard(): Observable<any> {
    const card = {
      cardNumber: this.cartForm.value.number.toString(),
      holderName: this.cartForm.value.name,
      securityCode: this.cartForm.value.cvc,
      expirationMonth: this.cartForm.value.expired.split('/')[0],
      expirationYear: this.cartForm.value.expired.split('/')[1]
    };
    return new Observable(sub => {
      this.checkout.getCardHash(card, cardHash => {
          sub.next(cardHash);
      }, error => {
         sub.error(error);
      });
    });

  }

  getTypeCart(){
    this.cartForm.controls.number.valueChanges.subscribe(r => {
      const re = {
        maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
      }

      for(var key in re) {
        if(re[key].test(r)) {
            this.cardType = key;
            return key
        }
      }
      this.cardType = '';
      return '';
    });
  }

  getAmount(value: any){
    const split = value.toString().split('.');

    return `
    <span class="price-real">${split[0]}</span>
    <span class="price-cent">,${split[1].length-1 > 0 ? split[1] : split[1]+'0'}</span>
    `;
  }

  pay(){
    const json = {
      user: this.sAuth.currentUserValue.id,
      plan_id: this.cartForm.value.product,
      card: {
        cvc: this.cartForm.value.cvc,
        number: this.cartForm.value.number,
        exp_month: this.cartForm.value.expired.split('/')[0],
        exp_year:  this.cartForm.value.expired.split('/')[1]
      }
    };

    this.sPayment.checkoutPayment(json).subscribe(r => {
      console.log(r);
    }, e => {
      console.log(e);
    });
  }

}
