import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../ui/home/home.component';
import { HomeSearchCarsDetailComponent } from '../ui/home-search-cars-detail/home-search-cars-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search-cars-detail', component: HomeSearchCarsDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
