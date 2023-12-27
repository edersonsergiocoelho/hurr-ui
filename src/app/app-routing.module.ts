import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './global/page/home/ui/home/home.component';
import { HomeSearchCarsComponent } from './global/page/home/ui/home-search-cars/home-search-cars.component';

const routes: Routes = [
  {path: '', component: HomeSearchCarsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
