import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {
  showEmail = false;
  public address;
  constructor(
    public sAuth: AuthenticationService,
    private sUser: UserService
  ) {
    this.sUser.getAddress(this.sAuth.currentUserValue.id).subscribe(r => {
      this.address = r;
    }, e => {
      console.log('Erro ao encontrar endereço.');
    });
  }

  ngOnInit(): void {
  }

  emailShow(email: string): string {
    if(email){
      if(!this.showEmail){
        const split = email.split('@');
        const emailBefore = split[0];
        const emailAfter = split[1];
        let totalHidden = '';
        for (let i = 0; i < emailBefore.length; i++) {
          totalHidden += '*';
        }
        return totalHidden + '@' + emailAfter;
      } else{
        return email;
      }
    } else {
      return '';
    }
  }


}
