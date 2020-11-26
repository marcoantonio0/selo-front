import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeuSiteComponent } from './meu-site.component';
import { MeuSiteRoutingModule } from './meu-site-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    MeuSiteComponent
  ],
  imports: [
    CommonModule,
    MeuSiteRoutingModule,
    MatRippleModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    NgbAlertModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot()
  ]
})
export class MeuSiteModule { }
