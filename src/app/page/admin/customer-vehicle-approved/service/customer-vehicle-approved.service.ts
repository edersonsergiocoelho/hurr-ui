import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerVehicleApproved } from '../entity/customer-vehicle-approved.entity';
import { CustomerVehicleApprovedSearchDTO } from '../dto/customer-vehicle-approved-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleApprovedService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-approved`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerVehicleApprovedId: string): Observable<HttpResponse<CustomerVehicleApproved>> {
    const url = `${this.apiUrl}/${customerVehicleApprovedId}`;
    return this.httpClient.get<CustomerVehicleApproved>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleApproved>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleApproved[]>> {
    return this.httpClient.get<CustomerVehicleApproved[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleApproved[]>) => {
        return response;
      })
    );
  }

  searchPage(customerVehicleApprovedSearchDTO: CustomerVehicleApprovedSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleApprovedSearchDTO, { params, observe: 'response' });
  }

  customerVehicleSearchPage(customerVehicleApprovedSearchDTO: CustomerVehicleApprovedSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleApprovedSearchDTO, { params, observe: 'response' });
  }

  save(customerVehicleApproved: CustomerVehicleApproved): Observable<HttpResponse<CustomerVehicleApproved>> {
    return this.httpClient.post<CustomerVehicleApproved>(this.apiUrl, customerVehicleApproved, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleApproved>) => {
        return response;
      })
    );
  }

  saveAll(customerVehicleApproveds: Array<CustomerVehicleApproved>): Observable<HttpResponse<CustomerVehicleApproved>> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.post<CustomerVehicleApproved>(url, customerVehicleApproveds, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleApproved>) => {
        return response;
      })
    );
  }

  update(customerVehicleApproved: CustomerVehicleApproved): Observable<HttpResponse<CustomerVehicleApproved>> {
    const url = `${this.apiUrl}/${customerVehicleApproved.customerVehicleApprovedId}`;
    return this.httpClient.put<CustomerVehicleApproved>(url, customerVehicleApproved, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleApproved>) => {
        return response;
      })
    );
  }

  approval(customerVehicleApprovedId: string): Observable<HttpResponse<CustomerVehicleApproved>> {
    const url = `${this.apiUrl}/approval/${customerVehicleApprovedId}`;
    return this.httpClient.put<CustomerVehicleApproved>(url, null, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleApproved>) => {
        return response;
      })
    );
  }

  delete(customerVehicleApprovedId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerVehicleApprovedId}`;
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