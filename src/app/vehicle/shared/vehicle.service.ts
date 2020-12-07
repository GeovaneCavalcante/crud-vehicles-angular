import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Vehicle } from "./vehicle.model";
import { environment as env } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiPath: string = env.urlApi + "/vehicles";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Vehicle[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToVehicles));
  }

  getById(id: string): Observable<Vehicle> {
    const url = `${this.apiPath}/${id}`;

    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToVehicle));
  }

  create(Vehicle: Vehicle): Observable<Vehicle> {
    return this.http
      .post(this.apiPath, Vehicle)
      .pipe(catchError(this.handleError), map(this.jsonDataToVehicle));
  }

  update(Vehicle: Vehicle): Observable<Vehicle> {
    const url = `${this.apiPath}/${Vehicle.id}`;
    return this.http.put(url, Vehicle).pipe(
      catchError(this.handleError),
      map(() => Vehicle)
    );
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }
  private jsonDataToVehicles(jsonData: any[]): Vehicle[] {
    const vehicles: Vehicle[] = [];
    jsonData.forEach((element) => vehicles.push(element as Vehicle));
    return vehicles;
  }

  private jsonDataToVehicle(jsonData: any): Vehicle {
    return jsonData as Vehicle;
  }

  private handleError(error: any): Observable<any> {
    console.log("ERROR NA REQUISIÇÃO =>", error);

    return throwError(error);
  }

}
