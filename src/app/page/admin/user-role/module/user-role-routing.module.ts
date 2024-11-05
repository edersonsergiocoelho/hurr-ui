import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleComponent } from '../ui/user-role/user-role.component';
import { UserRoleEditRoleComponentComponent } from '../ui/user-role-edit-role-component/user-role-edit-role-component.component';

const routes: Routes = [
  {path: 'user-role', component: UserRoleComponent},
  {path: 'user-role/edit/role', component: UserRoleEditRoleComponentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleRoutingModule { }
