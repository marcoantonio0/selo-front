import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PaymentService } from '../../_services/payment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { api } from 'src/environments/environment';
import { ClassElement } from 'typescript';
declare var DirectCheckout: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public alerts = [];
  public cartForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    cvc: new FormControl('', [Validators.required]),
    expired: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required])
  });
  @ViewChild('cardBrand', { static: true }) private cardBrand: ElementRef<HTMLDivElement>;
  public checkout;
  public plans: any[];
  public user: any;
  public cardType: string;
  public cardHash: string;
  public loading = false;
  constructor(
    private sPayment: PaymentService,
    private sAuth: AuthenticationService,
    private router: Router
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

  public showError(error, type: 'warning'|'danger'): void {
    this.alerts.pop();
    this.alerts.push({type, error});
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

  checkForm(){
    if(this.cartForm.value.product == ''){
      return 'Selecione um plano para continuar.';
    } else if (this.cartForm.value.name == '') {
      return 'Insira o nome impresso no cartão.';
    } else if (this.cartForm.value.number == '') {
      return 'Insira número do cartão.';
    } else if (this.cartForm.value.expired == '') {
      return 'Insira a validade do cartão.';
    } else if (this.cartForm.value.cvc == '') {
      return 'Insira o código de segurança do cartão.';
    }
    return true;
  }

  close(index) {
    this.alerts.splice(index, 1);
  }

  getError(formControl: FormControl): string {
    if(formControl.touched){
      if (formControl.errors.required){
        return 'Este campo é requirido.';
       }
      if (formControl.errors.maxlength){
      return `Máximo ${formControl.errors.maxlength.requiredLength} caracteres.`;
      }
      if (formControl.errors.minlength){
      return `Mínimo ${formControl.errors.minlength.requiredLength} caracteres.`;
      }
    }
   }

  pay(){
    if(this.checkForm() === true){
      if(!this.cartForm.invalid){
        this.cartForm.disable();
        this.loading = true;
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
          this.router.navigate(['/checkout/thanks/' + r._id]);
          console.log(r);
        }, e => {
          this.showError(e, 'danger');
          this.loading = false;
          this.cartForm.enable();
        });
      }
    } else {
      this.showError(this.checkForm(), 'warning');
    }

  }

}
