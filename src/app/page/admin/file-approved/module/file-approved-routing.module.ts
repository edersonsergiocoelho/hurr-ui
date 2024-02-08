import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileApprovedComponent } from '../ui/file-approved/file-approved.component';
import { FileApprovedDetailComponent } from '../ui/file-approved-detail/file-approved-detail.component';

const routes: Routes = [
  {path: 'file-approved', component: FileApprovedComponent},
  {path: 'file-approved/detail/:fileApprovedId', component: FileApprovedDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileApprovedRoutingModule { }
