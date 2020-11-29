import { MatInputModule } from '@angular/material/input';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { OwnersComponent } from './owners/owners.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [UserComponent, MinhaContaComponent, PrivacyComponent, OwnersComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatRippleModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    NgbAlertModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot()
  ]
})
export class UserModule { }
