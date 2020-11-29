import { NgxMaskModule } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [AdminComponent, SidebarComponent, HeaderComponent, LayoutComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    NgxMaskModule.forRoot()
  ]
})
export class AdminModule { }
