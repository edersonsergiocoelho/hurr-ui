import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { VehicleModel } from '../entity/vehicle-model.entity';

@Injectable({
  providedIn: 'root',
})
export class VehicleModelService {

  private readonly apiUrl = `${environment.api}/vehicle-model`;

  constructor(private readonly http: HttpClient) {}

  getAllVehicleModels(): Observable<HttpResponse<VehicleModel[]>> {
    return this.http.get<VehicleModel[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleModel[]>) => {
        return response;
      })
    );
  }

  getVehicleModelsByVehicleId(brandId: string): Observable<HttpResponse<VehicleModel[]>> {
    const url = `${this.apiUrl}/vehicle/${brandId}`;
    return this.http.get<VehicleModel[]>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleModel[]>) => {
        return response;
      })
    );
  }

  getVehicleModelById(vehicleId: string): Observable<HttpResponse<VehicleModel>> {
    const url = `${this.apiUrl}/${vehicleId}`;
    return this.http.get<VehicleModel>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleModel>) => {
        return response;
      })
    );
  }

  createVehicleModel(vehicle: VehicleModel): Observable<HttpResponse<VehicleModel>> {
    return this.http.post<VehicleModel>(this.apiUrl, vehicle, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleModel>) => {
        return response;
      })
    );
  }

  updateVehicleModel(vehicle: VehicleModel): Observable<HttpResponse<VehicleModel>> {
    const url = `${this.apiUrl}/${vehicle.vehicle.vehicleId}`;
    return this.http.put<VehicleModel>(url, vehicle, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleModel>) => {
        return response;
      })
    );
  }

  deleteVehicleModel(vehicleId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${vehicleId}`;
    return this.http.delete<void>(url, { observe: 'response' }).pipe(
      catchError((error: any) => {
        if (error.status === 404) {
          return of(null);
        } else {
          throw error;
        }
      })
    );
  }
}