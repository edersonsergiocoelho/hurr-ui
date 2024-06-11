import { Injectable } from '@angular/core';
import { CustomerBankAccount } from '../entity/customer-bank-account.entity';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerBankAccountSearchDTO } from '../dto/customer-bank-account-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerBankAccountService {

  private readonly apiUrl = `${environment.api}/customer-bank-account`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerBankAccountId: string): Observable<HttpResponse<CustomerBankAccount>> {
    const url = `${this.apiUrl}/${customerBankAccountId}`;
    return this.httpClient.get<CustomerBankAccount>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerBankAccount>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerBankAccount[]>> {
    return this.httpClient.get<CustomerBankAccount[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerBankAccount[]>) => {
        return response;
      })
    );
  }

  searchPage(customerBankAccountSearchDTO: CustomerBankAccountSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerBankAccountSearchDTO, { params, observe: 'response' });
  }

  save(customerBankAccount: CustomerBankAccount): Observable<HttpResponse<CustomerBankAccount>> {
    return this.httpClient.post<CustomerBankAccount>(this.apiUrl, customerBankAccount, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerBankAccount>) => {
        return response;
      })
    );
  }

  finalizeBooking(customerBankAccount: CustomerBankAccount): Observable<HttpResponse<CustomerBankAccount>> {
    const url = `${this.apiUrl}/finalize-booking/${customerBankAccount.customerBankAccountId}`;
    return this.httpClient.put<CustomerBankAccount>(url, customerBankAccount, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerBankAccount>) => {
        return response;
      })
    );
  }

  update(customerBankAccount: CustomerBankAccount): Observable<HttpResponse<CustomerBankAccount>> {
    const url = `${this.apiUrl}/${customerBankAccount.customerBankAccountId}`;
    return this.httpClient.put<CustomerBankAccount>(url, customerBankAccount, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerBankAccount>) => {
        return response;
      })
    );
  }

  delete(customerBankAccountId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerBankAccountId}`;
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