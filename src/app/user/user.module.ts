import { NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { MeuSiteComponent } from './meu-site/meu-site.component';
import { PrivacyComponent } from './privacy/privacy.component';


@NgModule({
  declarations: [UserComponent, MinhaContaComponent, MeuSiteComponent, PrivacyComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatRippleModule,
    MatButtonModule,
    NgxMaskModule.forRoot()
  ]
})
export class UserModule { }
