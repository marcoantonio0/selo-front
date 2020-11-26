import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeuSiteComponent } from './meu-site.component';

const routes: Routes = [
  { path: '', component: MeuSiteComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeuSiteRoutingModule { }
