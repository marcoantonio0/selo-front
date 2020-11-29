import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PaymentService } from './../../../_services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  panelOpenState = false;
  public payments;
  constructor(
    private sPayment: PaymentService,
    private sAuth: AuthenticationService
  ) {
    this.sPayment.getPayments(this.sAuth.currentUserValue.id).subscribe(r => {
      this.payments = r;
    });
  }

  ngOnInit(): void {
  }

}
