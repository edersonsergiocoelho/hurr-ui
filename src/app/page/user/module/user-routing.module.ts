import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from '../ui/user-login/user-login.component';
import { UserRegisterComponent } from '../ui/user-register/user-register.component';

const routes: Routes = [
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/login/:token', component: UserLoginComponent },
  {path: 'user/register', component: UserRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
