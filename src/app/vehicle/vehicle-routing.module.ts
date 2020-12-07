import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from '../shared/components/error/error.component';
import { FormVehicleComponent } from './form-vehicle/form-vehicle.component';
import { ListVehicleComponent } from './list-vehicle/list-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: ListVehicleComponent
  },
  {
    path: 'new',
    component: FormVehicleComponent,
  },
  {
    path: ':id/edit',
    component: FormVehicleComponent,
  },
  {
    path: '**', component: ErrorComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
