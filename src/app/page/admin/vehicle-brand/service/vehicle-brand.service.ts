import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { VehicleBrand } from '../entity/vehicle-brand.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleBrandService {

  private readonly apiUrl = `${environment.api}/vehicle-brand`;

  constructor(private readonly http: HttpClient) {}

  getAllVehicleBrands(): Observable<HttpResponse<VehicleBrand[]>> {
    return this.http.get<VehicleBrand[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand[]>) => {
        return response;
      })
    );
  }

  getVehicleBrandById(brandId: string): Observable<HttpResponse<VehicleBrand>> {
    const url = `${this.apiUrl}/${brandId}`;
    return this.http.get<VehicleBrand>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand>) => {
        return response;
      })
    );
  }

  createVehicleBrand(brand: VehicleBrand): Observable<HttpResponse<VehicleBrand>> {
    return this.http.post<VehicleBrand>(this.apiUrl, brand, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand>) => {
        return response;
      })
    );
  }

  updateVehicleBrand(brand: VehicleBrand): Observable<HttpResponse<VehicleBrand>> {
    const url = `${this.apiUrl}/${brand.vehicleBrandId}`;
    return this.http.put<VehicleBrand>(url, brand, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand>) => {
        return response;
      })
    );
  }

  deleteVehicleBrand(brandId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${brandId}`;
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