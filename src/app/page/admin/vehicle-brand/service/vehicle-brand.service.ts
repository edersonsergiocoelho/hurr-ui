import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { VehicleBrand } from '../entity/vehicle-brand.entity';
import { environment } from 'src/environments/environment';
import { VehicleBrandSearchDTO } from '../dto/vehicle-brand-search-dto.dto';

@Injectable({
  providedIn: 'root',
})
export class VehicleBrandService {

  private readonly apiUrl = `${environment.api}/vehicle-brand`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(vehicleBrandId: string): Observable<HttpResponse<VehicleBrand>> {
    const url = `${this.apiUrl}/${vehicleBrandId}`;
    return this.httpClient.get<VehicleBrand>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand>) => {
        return response;
      })
    );
  }

  findByVehicleBrandName(vehicleBrandName: string): Observable<HttpResponse<VehicleBrand>> {
    const url = `${this.apiUrl}/by/vehicle-brand-name/${vehicleBrandName}`;
    return this.httpClient.get<VehicleBrand>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<VehicleBrand[]>> {
    return this.httpClient.get<VehicleBrand[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand[]>) => {
        return response;
      })
    );
  }

  searchPage(vehicleBrandSearchDTO: VehicleBrandSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, vehicleBrandSearchDTO, { params, observe: 'response' });
  }

  save(vehicleBrand: VehicleBrand): Observable<HttpResponse<VehicleBrand>> {
    return this.httpClient.post<VehicleBrand>(this.apiUrl, vehicleBrand, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand>) => {
        return response;
      })
    );
  }

  update(vehicleBrand: VehicleBrand): Observable<HttpResponse<VehicleBrand>> {
    const url = `${this.apiUrl}/${vehicleBrand.vehicleBrandId}`;
    return this.httpClient.put<VehicleBrand>(url, vehicleBrand, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleBrand>) => {
        return response;
      })
    );
  }

  delete(vehicleBrandId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${vehicleBrandId}`;
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

  deleteAll(vehicleBrandIds: string[]): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.delete<void>(url, {
      body: vehicleBrandIds,
      observe: 'response'
    }).pipe(
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