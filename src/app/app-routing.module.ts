import { AuthGuard } from './auth/auth.guard';
import { Error404Component } from './error404/error404.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    {
      path: '',
      component: IndexComponent
    },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
    { path: 'forget-email', loadChildren: () => import('./forget-email/forget-email.module').then(m => m.ForgetEmailModule) },
    { path: 'forget-password', loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
    { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
    { path: 'user', canActivate: [AuthGuard],  loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    {
      path: '**',
      component: Error404Component
    },
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
