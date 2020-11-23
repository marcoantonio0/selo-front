import { OwnersComponent } from './owners/owners.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MeuSiteComponent } from './meu-site/meu-site.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent, children: [
    { path: '', component: MinhaContaComponent },
    { path: 'website', component: MeuSiteComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'owners', component: OwnersComponent }
  ] }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
