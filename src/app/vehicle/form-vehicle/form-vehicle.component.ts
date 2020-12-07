import { Component, OnInit, AfterContentChecked } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

import Swal from 'sweetalert2'

import { Vehicle } from '../shared/vehicle.model';
import { VehicleService } from '../shared/vehicle.service';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
})
export class FormVehicleComponent implements OnInit {

  currentAction: string;
  vehicleForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  vehicle: Vehicle = new Vehicle();

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadVehicle();
    this.buildVehicleForm();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === "new") {
      this.createVehicle();
    } else {
      this.updateVehicle();
    }
  }

  private setCurrentAction() {
    console.log()
    if (this.route.snapshot.url[0].path === "new") {
      this.currentAction = "new";
    } else {
      this.currentAction = "edit";
    }
  }

  private buildVehicleForm() {
    this.vehicleForm = this.formBuilder.group({
      id: [null],
      board: [null, [Validators.required, Validators.minLength(2)]],
      chassis: [null, [Validators.required, Validators.minLength(2)]],
      renavam: [null, [Validators.required, Validators.minLength(2)]],
      model: [null, [Validators.required, Validators.minLength(2)]],
      brand: [null, [Validators.required, Validators.minLength(2)]],
      year: [null, [Validators.required, Validators.minLength(2)]],
    });
  }

  private loadVehicle() {
    if (this.currentAction === "edit") {
      this.route.paramMap
        .pipe(
          switchMap((params) => this.vehicleService.getById(this.route.snapshot.url[0].path))
        )
        .subscribe(
          (vehicle) => {
            this.vehicle = vehicle;
            this.vehicleForm.patchValue(this.vehicle);
          },
          (error) => alert("Ocorreu algum erro ")
        );
    }
  }

  private setPageTitle() {
    if (this.currentAction === "new") {
      this.pageTitle = "Cadastro de novo veículo";
    } else {
      this.pageTitle = `Editado o veículo: ${this.vehicle.board}`;
    }
  }

  private createVehicle() {
    const vehicle: Vehicle = Object.assign(new Vehicle(), {
      ...this.vehicleForm.value,
    });

    this.vehicleService.create(vehicle).subscribe(
      (vehicle) => { this.actionsForSuccess(vehicle) },
      (error) => { this.actionsForError(error) }
    );
  }

  private updateVehicle() {
    const vehicle: Vehicle = Object.assign(new Vehicle(), {
      ...this.vehicleForm.value,
    });

    this.vehicleService.update(vehicle).subscribe(
      (vehicle) => { this.actionsForSuccess(vehicle) },
      (error) => { this.actionsForError(error) }
    );
  }

  private actionsForSuccess(vehicle) {
    Swal.fire({
      title: 'Salvo com sucesso!',
      text: 'Aperte ok para continuar',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(()=>{
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true,
      })
      .then(() => this.router.navigate(["/"]))
      .catch((error) => console.log(error));
    })

  }

  private actionsForError(error) {

    Swal.fire({
      title: 'Erro ao processar',
      text: 'Aperte ok para continuar',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

}
