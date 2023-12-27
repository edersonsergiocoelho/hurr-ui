import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../ui/home/home.component';
import { HomeSearchCarsDetailComponent } from '../ui/home-search-cars-detail/home-search-cars-detail.component';
import { HomeSearchCarsComponent } from '../ui/home-search-cars/home-search-cars.component';

const routes: Routes = [
  {path: '', component: HomeSearchCarsComponent},
  {path: 'search-cars-detail', component: HomeSearchCarsDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
