import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleFuelType } from '../entity/vehicle-fuel.type.entity';
import { VehicleFuelTypeSearchDTO } from '../dto/vehicle-fuel-type-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class VehicleFuelTypeService {

  private readonly apiUrl = `${environment.api}/vehicle-fuel-type`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(vehicleFuelTypeId: string): Observable<HttpResponse<VehicleFuelType>> {
    const url = `${this.apiUrl}/${vehicleFuelTypeId}`;
    return this.httpClient.get<VehicleFuelType>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleFuelType>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<VehicleFuelType[]>> {
    return this.httpClient.get<VehicleFuelType[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleFuelType[]>) => {
        return response;
      })
    );
  }

  searchPage(vehicleFuelTypeSearchDTO: VehicleFuelTypeSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/search/page`;

    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortDir', sortDir);

    if (typeof sortBy === 'string') {
      params = params.set('sortBy', sortBy);
    } else if (Array.isArray(sortBy) && sortBy.length > 0) {
      params = params.set('sortBy', sortBy.join(','));
    }

    return this.httpClient.post<any>(url, vehicleFuelTypeSearchDTO, { params, observe: 'response' });
  }

  customerVehicleSearchPage(vehicleFuelTypeSearchDTO: VehicleFuelTypeSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/customer-vehicle/search/page`;

    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortDir', sortDir);

    if (typeof sortBy === 'string') {
      params = params.set('sortBy', sortBy);
    } else if (Array.isArray(sortBy) && sortBy.length > 0) {
      params = params.set('sortBy', sortBy.join(','));
    }

    return this.httpClient.post<any>(url, vehicleFuelTypeSearchDTO, { params, observe: 'response' });
  }

  save(vehicleFuelType: VehicleFuelType): Observable<HttpResponse<VehicleFuelType>> {
    return this.httpClient.post<VehicleFuelType>(this.apiUrl, vehicleFuelType, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleFuelType>) => {
        return response;
      })
    );
  }

  saveAll(vehicleFuelTypes: Array<VehicleFuelType>): Observable<HttpResponse<VehicleFuelType>> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.post<VehicleFuelType>(url, vehicleFuelTypes, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleFuelType>) => {
        return response;
      })
    );
  }

  update(vehicleFuelType: VehicleFuelType): Observable<HttpResponse<VehicleFuelType>> {
    const url = `${this.apiUrl}/${vehicleFuelType.vehicleFuelTypeId}`;
    return this.httpClient.put<VehicleFuelType>(url, vehicleFuelType, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleFuelType>) => {
        return response;
      })
    );
  }

  approval(vehicleFuelTypeId: string): Observable<HttpResponse<VehicleFuelType>> {
    const url = `${this.apiUrl}/approval/${vehicleFuelTypeId}`;
    return this.httpClient.put<VehicleFuelType>(url, null, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleFuelType>) => {
        return response;
      })
    );
  }

  delete(vehicleFuelTypeId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${vehicleFuelTypeId}`;
    return this.httpClient.delete<void>(url, { observe: 'response' }).pipe(
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