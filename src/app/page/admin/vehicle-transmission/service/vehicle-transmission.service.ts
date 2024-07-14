import { Injectable } from '@angular/core';
import { VehicleTransmission } from '../entity/vehicle-transmission.entity';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { VehicleTransmissionSearchDTO } from '../dto/vehicle-transmission-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class VehicleTransmissionService {

  private readonly apiUrl = `${environment.api}/vehicle-transmission`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(vehicleTransmissionId: string): Observable<HttpResponse<VehicleTransmission>> {
    const url = `${this.apiUrl}/${vehicleTransmissionId}`;
    return this.httpClient.get<VehicleTransmission>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleTransmission>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<VehicleTransmission[]>> {
    return this.httpClient.get<VehicleTransmission[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleTransmission[]>) => {
        return response;
      })
    );
  }

  searchPage(vehicleTransmissionSearchDTO: VehicleTransmissionSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, vehicleTransmissionSearchDTO, { params, observe: 'response' });
  }

  save(vehicleTransmission: VehicleTransmission): Observable<HttpResponse<VehicleTransmission>> {
    return this.httpClient.post<VehicleTransmission>(this.apiUrl, vehicleTransmission, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleTransmission>) => {
        return response;
      })
    );
  }

  update(vehicleTransmission: VehicleTransmission): Observable<HttpResponse<VehicleTransmission>> {
    const url = `${this.apiUrl}/${vehicleTransmission.vehicleTransmissionId}`;
    return this.httpClient.put<VehicleTransmission>(url, vehicleTransmission, { observe: 'response' }).pipe(
      map((response: HttpResponse<VehicleTransmission>) => {
        return response;
      })
    );
  }

  delete(vehicleTransmissionId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${vehicleTransmissionId}`;
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