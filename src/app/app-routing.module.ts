import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerListComponent } from './components/servers-list/servers-list.component';
import { ServerDetailComponent } from './components/server-detail/server-detail.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'servers-list', component: ServerListComponent },
  { path: 'server-detail/:id', component: ServerDetailComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
