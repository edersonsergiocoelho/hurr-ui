import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Vehicle } from '../entity/vehicle.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  private readonly apiUrl = `${environment.api}/vehicle`;

  constructor(private readonly http: HttpClient) {}

  getAllVehicles(): Observable<HttpResponse<Vehicle[]>> {
    return this.http.get<Vehicle[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Vehicle[]>) => {
        return response;
      })
    );
  }

  getVehiclesByBrandId(brandId: string): Observable<HttpResponse<Vehicle[]>> {
    const url = `${this.apiUrl}/vehicle-brand/${brandId}`;
    return this.http.get<Vehicle[]>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Vehicle[]>) => {
        return response;
      })
    );
  }

  getVehicleById(vehicleId: string): Observable<HttpResponse<Vehicle>> {
    const url = `${this.apiUrl}/${vehicleId}`;
    return this.http.get<Vehicle>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Vehicle>) => {
        return response;
      })
    );
  }

  createVehicle(vehicle: Vehicle): Observable<HttpResponse<Vehicle>> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle, { observe: 'response' }).pipe(
      map((response: HttpResponse<Vehicle>) => {
        return response;
      })
    );
  }

  updateVehicle(vehicle: Vehicle): Observable<HttpResponse<Vehicle>> {
    const url = `${this.apiUrl}/${vehicle.vehicleId}`;
    return this.http.put<Vehicle>(url, vehicle, { observe: 'response' }).pipe(
      map((response: HttpResponse<Vehicle>) => {
        return response;
      })
    );
  }

  deleteVehicle(vehicleId: string): Observable<HttpResponse<void> | null> {
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