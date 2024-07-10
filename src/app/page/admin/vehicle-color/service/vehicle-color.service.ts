import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleColor } from '../entity/vehicle-color.entity';
import { VehicleColorSearchDTO } from '../dto/vehicle-color-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class VehicleColorService {

  private readonly apiUrl = `${environment.api}/vehicle-color`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(vehicleColorId: string): Observable<HttpResponse<VehicleColor>> {
    const url = `${this.apiUrl}/${vehicleColorId}`;
    return this.httpClient.get<VehicleColor>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleColor>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<VehicleColor[]>> {
    return this.httpClient.get<VehicleColor[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleColor[]>) => {
        return response;
      })
    );
  }

  searchPage(vehicleColorSearchDTO: VehicleColorSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, vehicleColorSearchDTO, { params, observe: 'response' });
  }

  customerVehicleSearchPage(vehicleColorSearchDTO: VehicleColorSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, vehicleColorSearchDTO, { params, observe: 'response' });
  }

  save(vehicleColor: VehicleColor): Observable<HttpResponse<VehicleColor>> {
    return this.httpClient.post<VehicleColor>(this.apiUrl, vehicleColor, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleColor>) => {
        return response;
      })
    );
  }

  saveAll(vehicleColors: Array<VehicleColor>): Observable<HttpResponse<VehicleColor>> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.post<VehicleColor>(url, vehicleColors, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleColor>) => {
        return response;
      })
    );
  }

  update(vehicleColor: VehicleColor): Observable<HttpResponse<VehicleColor>> {
    const url = `${this.apiUrl}/${vehicleColor.vehicleColorId}`;
    return this.httpClient.put<VehicleColor>(url, vehicleColor, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleColor>) => {
        return response;
      })
    );
  }

  approval(vehicleColorId: string): Observable<HttpResponse<VehicleColor>> {
    const url = `${this.apiUrl}/approval/${vehicleColorId}`;
    return this.httpClient.put<VehicleColor>(url, null, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleColor>) => {
        return response;
      })
    );
  }

  delete(vehicleColorId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${vehicleColorId}`;
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