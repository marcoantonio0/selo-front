import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SgRoutingModule } from './sg-routing.module';
import { SgComponent } from './sg.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeuSiteModule } from './meu-site/meu-site.module';
import { NgxMaskModule } from 'ngx-mask';
import { ProductModule } from './product/product.module';


@NgModule({
  declarations: [
    SgComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SgRoutingModule,
    MatIconModule,
    LoginModule,
    ProductModule,
    RegisterModule,
    MeuSiteModule,
    NgxMaskModule.forRoot(),
    ProductModule
  ]
})
export class SgModule { }
