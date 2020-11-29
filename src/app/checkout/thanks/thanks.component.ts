import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {
  private id  = '';
  public payment;
  public total;
  constructor(
    private router: ActivatedRoute,
    private sPayment: PaymentService
  ) {
    this.router.params.subscribe(params => {
      if(params.id){
        this.id = params.id;
        this.sPayment.getPayment(this.id).subscribe(r => {
          this.total = r.amount - r.discount;
          this.payment = r;
        });
      }
    });
  }


  ngOnInit(): void {
  }

}
