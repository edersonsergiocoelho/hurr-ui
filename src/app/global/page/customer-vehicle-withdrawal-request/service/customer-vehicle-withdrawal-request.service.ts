import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerVehicleWithdrawalRequest } from '../entity/customer-vehicle-withdrawal-request.entity';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerVehicleWithdrawalRequestSearchDTO } from '../dto/customer-vehicle-withdrawal-request-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleWithdrawalRequestService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-withdrawal-request`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerVehicleWithdrawalRequestId: string): Observable<HttpResponse<CustomerVehicleWithdrawalRequest>> {
    const url = `${this.apiUrl}/${customerVehicleWithdrawalRequestId}`;
    return this.httpClient.get<CustomerVehicleWithdrawalRequest>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleWithdrawalRequest>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleWithdrawalRequest[]>> {
    return this.httpClient.get<CustomerVehicleWithdrawalRequest[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleWithdrawalRequest[]>) => {
        return response;
      })
    );
  }

  searchPage(customerVehicleWithdrawalRequestSearchDTO: CustomerVehicleWithdrawalRequestSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleWithdrawalRequestSearchDTO, { params, observe: 'response' });
  }

  customerVehicleSearchPage(customerVehicleWithdrawalRequestSearchDTO: CustomerVehicleWithdrawalRequestSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleWithdrawalRequestSearchDTO, { params, observe: 'response' });
  }

  save(customerVehicleWithdrawalRequest: CustomerVehicleWithdrawalRequest): Observable<HttpResponse<CustomerVehicleWithdrawalRequest>> {
    return this.httpClient.post<CustomerVehicleWithdrawalRequest>(this.apiUrl, customerVehicleWithdrawalRequest, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleWithdrawalRequest>) => {
        return response;
      })
    );
  }

  saveAll(customerVehicleWithdrawalRequests: Array<CustomerVehicleWithdrawalRequest>): Observable<HttpResponse<CustomerVehicleWithdrawalRequest>> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.post<CustomerVehicleWithdrawalRequest>(url, customerVehicleWithdrawalRequests, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleWithdrawalRequest>) => {
        return response;
      })
    );
  }

  update(customerVehicleWithdrawalRequest: CustomerVehicleWithdrawalRequest): Observable<HttpResponse<CustomerVehicleWithdrawalRequest>> {
    const url = `${this.apiUrl}/${customerVehicleWithdrawalRequest.customerVehicleWithdrawalRequestId}`;
    return this.httpClient.put<CustomerVehicleWithdrawalRequest>(url, customerVehicleWithdrawalRequest, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleWithdrawalRequest>) => {
        return response;
      })
    );
  }

  approval(customerVehicleWithdrawalRequestId: string): Observable<HttpResponse<CustomerVehicleWithdrawalRequest>> {
    const url = `${this.apiUrl}/approval/${customerVehicleWithdrawalRequestId}`;
    return this.httpClient.put<CustomerVehicleWithdrawalRequest>(url, null, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleWithdrawalRequest>) => {
        return response;
      })
    );
  }

  delete(customerVehicleWithdrawalRequestId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerVehicleWithdrawalRequestId}`;
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