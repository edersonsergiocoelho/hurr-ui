import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerWithdrawalRequest } from '../entity/customer-withdrawal-request.entity';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerWithdrawalRequestSearchDTO } from '../dto/customer-withdrawal-request-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerWithdrawalRequestService {

  private readonly apiUrl = `${environment.api}/customer-withdrawal-request`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerWithdrawalRequestId: string): Observable<HttpResponse<CustomerWithdrawalRequest>> {
    const url = `${this.apiUrl}/${customerWithdrawalRequestId}`;
    return this.httpClient.get<CustomerWithdrawalRequest>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequest>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerWithdrawalRequest[]>> {
    return this.httpClient.get<CustomerWithdrawalRequest[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequest[]>) => {
        return response;
      })
    );
  }

  searchPage(customerWithdrawalRequestSearchDTO: CustomerWithdrawalRequestSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerWithdrawalRequestSearchDTO, { params, observe: 'response' });
  }

  customerVehicleSearchPage(customerWithdrawalRequestSearchDTO: CustomerWithdrawalRequestSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerWithdrawalRequestSearchDTO, { params, observe: 'response' });
  }

  save(customerWithdrawalRequest: CustomerWithdrawalRequest): Observable<HttpResponse<CustomerWithdrawalRequest>> {
    return this.httpClient.post<CustomerWithdrawalRequest>(this.apiUrl, customerWithdrawalRequest, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequest>) => {
        return response;
      })
    );
  }

  update(customerWithdrawalRequest: CustomerWithdrawalRequest): Observable<HttpResponse<CustomerWithdrawalRequest>> {
    const url = `${this.apiUrl}/${customerWithdrawalRequest.customerWithdrawalRequestId}`;
    return this.httpClient.put<CustomerWithdrawalRequest>(url, customerWithdrawalRequest, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequest>) => {
        return response;
      })
    );
  }

  delete(customerWithdrawalRequestId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerWithdrawalRequestId}`;
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