import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomerVehicle } from '../entity/customer-vehicle.entity';
import { environment } from 'src/environments/environment';
import { CustomerVehicleSearchDTO } from '../dto/customer-vehicle-search-dto.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerVehicleService {

  private readonly apiUrl = `${environment.api}/customer-vehicle`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<CustomerVehicle>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<CustomerVehicle>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicle[]>> {
    return this.httpClient.get<CustomerVehicle[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle[]>) => {
        return response;
      })
    );
  }

  search(customerVehicleSearchDTO: CustomerVehicleSearchDTO): Observable<HttpResponse<CustomerVehicle>> {
    const url = `${this.apiUrl}/search`;
    return this.httpClient.post<any>(url, customerVehicleSearchDTO, { observe: 'response' });
  }

  searchPage(customerVehicleSearchDTO: CustomerVehicleSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleSearchDTO, { params, observe: 'response' });
  }

  save(customerVehicle: CustomerVehicle): Observable<HttpResponse<CustomerVehicle>> {
    return this.httpClient.post<CustomerVehicle>(this.apiUrl, customerVehicle, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle>) => {
        return response;
      })
    );
  }

  update(customerVehicle: CustomerVehicle): Observable<HttpResponse<CustomerVehicle>> {
    const url = `${this.apiUrl}/${customerVehicle.customerVehicleId}`;
    return this.httpClient.put<CustomerVehicle>(url, customerVehicle, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle>) => {
        return response;
      })
    );
  }

  delete(id: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${id}`;
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