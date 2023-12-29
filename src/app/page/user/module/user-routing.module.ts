import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from '../ui/user-login/user-login.component';

const routes: Routes = [
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/login/:token', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
