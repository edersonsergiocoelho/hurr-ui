import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerWithdrawalRequests } from '../entity/customer-withdrawal-requests.entity';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerWithdrawalRequestsSearchDTO } from '../dto/customer-withdrawal-requests-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerWithdrawalRequestsService {

  private readonly apiUrl = `${environment.api}/customer-withdrawal-requests`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerWithdrawalRequestsId: string): Observable<HttpResponse<CustomerWithdrawalRequests>> {
    const url = `${this.apiUrl}/${customerWithdrawalRequestsId}`;
    return this.httpClient.get<CustomerWithdrawalRequests>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequests>) => {
        return response;
      })
    );
  }

  findByCustomerId(): Observable<HttpResponse<CustomerWithdrawalRequests[]>> {
    return this.httpClient.get<CustomerWithdrawalRequests[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequests[]>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerWithdrawalRequests[]>> {
    return this.httpClient.get<CustomerWithdrawalRequests[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequests[]>) => {
        return response;
      })
    );
  }

  searchPage(customerWithdrawalRequestsSearchDTO: CustomerWithdrawalRequestsSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerWithdrawalRequestsSearchDTO, { params, observe: 'response' });
  }

  customerVehicleSearchPage(customerWithdrawalRequestsSearchDTO: CustomerWithdrawalRequestsSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerWithdrawalRequestsSearchDTO, { params, observe: 'response' });
  }

  save(customerWithdrawalRequests: CustomerWithdrawalRequests): Observable<HttpResponse<CustomerWithdrawalRequests>> {
    return this.httpClient.post<CustomerWithdrawalRequests>(this.apiUrl, customerWithdrawalRequests, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequests>) => {
        return response;
      })
    );
  }

  update(customerWithdrawalRequests: CustomerWithdrawalRequests): Observable<HttpResponse<CustomerWithdrawalRequests>> {
    const url = `${this.apiUrl}/${customerWithdrawalRequests.customerWithdrawalRequestsId}`;
    return this.httpClient.put<CustomerWithdrawalRequests>(url, customerWithdrawalRequests, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerWithdrawalRequests>) => {
        return response;
      })
    );
  }

  delete(customerWithdrawalRequestsId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerWithdrawalRequestsId}`;
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