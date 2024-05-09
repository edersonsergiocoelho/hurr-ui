import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from '../ui/user-login/user-login.component';
import { UserRegisterComponent } from '../ui/user-register/user-register.component';
import { UserForgotPasswordComponent } from '../ui/user-forgot-password/user-forgot-password.component';

const routes: Routes = [
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/login/:token', component: UserLoginComponent },
  {path: 'user/register', component: UserRegisterComponent },
  {path: 'user/forgot-password', component: UserForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
