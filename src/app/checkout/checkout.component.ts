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
    card: new FormControl(''),
    cvv: new FormControl(''),
    expired: new FormControl('')
  })
  constructor() { }

  ngOnInit(): void {
  }

}
