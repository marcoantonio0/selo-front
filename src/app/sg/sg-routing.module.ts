import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    {
      path: '',
      component: DashboardComponent
    },
    { path: 'user',  loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    { path: 'configuration',  loadChildren: () => import('./meu-site/meu-site.module').then(m => m.MeuSiteModule) },
    { path: 'payment',  loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SgRoutingModule { }
