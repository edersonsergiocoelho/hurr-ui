import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleComponent } from '../ui/user-role/user-role.component';

const routes: Routes = [
  {path: 'user-role', component: UserRoleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleRoutingModule { }
