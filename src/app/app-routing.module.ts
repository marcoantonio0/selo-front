import { Error404Component } from './error404/error404.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AuthAdminGuard } from './auth/auth-admin.guard';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    {
      path: '',
      component: IndexComponent
    },
    { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
    { path: 'forget-email', loadChildren: () => import('./forget-email/forget-email.module').then(m => m.ForgetEmailModule) },
    { path: 'forget-password', loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
    { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
    { path: 'stores', loadChildren: () => import('./stores/stores.module').then(m => m.StoresModule) },
  ]},
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'app', loadChildren: () => import('./sg/sg.module').then(m => m.SgModule) },
  { path: 'admin', canActivate: [AuthAdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'admin/login', loadChildren: () => import('./admin-login/admin-login.module').then(m => m.AdminLoginModule) },
  { path: 'users', loadChildren: () => import('./admin/users/users.module').then(m => m.UsersModule) },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
