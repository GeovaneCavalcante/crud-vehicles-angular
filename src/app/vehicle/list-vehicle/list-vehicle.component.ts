import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { Vehicle } from '../shared/vehicle.model';
import { VehicleService } from '../shared/vehicle.service';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {

  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['board', 'chassis', 'renavam', 'model', 'brand', 'year', 'edit', 'delete'];

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getVechicles();
  }

  getVechicles(): void {
    this.vehicleService.getAll().subscribe(
      (vehicles) => {
        console.log(vehicles)
        this.vehicles = vehicles;
      },
      (error) => { console.log('Error ao carregar a lista');  }
    );
  }

  private deleteVehicle(vehicle){
    this.vehicleService.delete(vehicle.id)
    .subscribe(
      (msg) => {
        this.vehicles = this.vehicles.filter(
          (element) => element !== vehicle
        );

        Swal.fire({
          title: 'Deletado com sucesso!',
          text: 'Aperte ok para continuar',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      },
      (error) => { console.log('Error ao carregar a lista');  }
    )
  }

  private editVehicle(id: string) : void {
    this.router.navigate([`/${id}/edit`]);
  }

}
