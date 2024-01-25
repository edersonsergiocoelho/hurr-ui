import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from '../ui/role/role.component';

const routes: Routes = [
  {path: 'role', component: RoleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
