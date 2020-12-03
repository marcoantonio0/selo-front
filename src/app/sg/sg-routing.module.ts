import { AuthGuard } from './../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
    {
      path: '',
      component: DashboardComponent
    },
    { path: 'user',  loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    { path: 'configuration',  loadChildren: () => import('./meu-site/meu-site.module').then(m => m.MeuSiteModule) },
    { path: 'payment',  loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  ] },
  { path: 'login',  loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register',  loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SgRoutingModule { }
