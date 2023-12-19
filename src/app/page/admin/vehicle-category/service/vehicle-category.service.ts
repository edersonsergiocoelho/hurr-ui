import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { VehicleCategory } from '../entity/vehicle-category.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleCategoryService {

  private readonly apiUrl = `${environment.api}/vehicle-category`;

  constructor(private readonly http: HttpClient) {}

  getAllVehicleCategories(): Observable<HttpResponse<VehicleCategory[]>> {
    return this.http.get<VehicleCategory[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleCategory[]>) => {
        return response;
      })
    );
  }

  getVehicleCategoryById(categoryId: string): Observable<HttpResponse<VehicleCategory>> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<VehicleCategory>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleCategory>) => {
        return response;
      })
    );
  }

  createVehicleCategory(category: VehicleCategory): Observable<HttpResponse<VehicleCategory>> {
    return this.http.post<VehicleCategory>(this.apiUrl, category, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleCategory>) => {
        return response;
      })
    );
  }

  updateVehicleCategory(category: VehicleCategory): Observable<HttpResponse<VehicleCategory>> {
    const url = `${this.apiUrl}/${category.vehicleCategoryId}`;
    return this.http.put<VehicleCategory>(url, category, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleCategory>) => {
        return response;
      })
    );
  }

  deleteVehicleCategory(categoryId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${categoryId}`;
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
