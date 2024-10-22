import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPreferenceComponent } from '../ui/user-preference/user-preference.component';

const routes: Routes = [
  {path: 'settings/preference', component: UserPreferenceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPreferenceRoutingModule { }
