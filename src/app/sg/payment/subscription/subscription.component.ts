import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  public user;
  public isFree = false;
  constructor(
    private sAuth: AuthenticationService,
    private sUser: UserService
  ) {
    this.sUser.getUserPlan(this.sAuth.currentUserValue.id).subscribe(r => {
      this.user = r;
    }, e => {
      this.isFree = true;
    });
  }

  ngOnInit(): void {

  }

}
