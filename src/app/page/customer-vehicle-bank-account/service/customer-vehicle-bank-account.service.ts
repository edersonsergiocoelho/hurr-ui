import { Injectable } from '@angular/core';
import { CustomerVehicleBankAccount } from '../entity/customer-vehicle-bank-account.entity';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerVehicleBankAccountSearchDTO } from '../dto/customer-vehicle-bank-account-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleBankAccountService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-bank-account`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerVehicleBankAccountId: string): Observable<HttpResponse<CustomerVehicleBankAccount>> {
    const url = `${this.apiUrl}/${customerVehicleBankAccountId}`;
    return this.httpClient.get<CustomerVehicleBankAccount>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBankAccount>) => {
        return response;
      })
    );
  }

  findByCustomerVehicleBankAccountName(customerVehicleBankAccountName: string): Observable<HttpResponse<CustomerVehicleBankAccount>> {
    const url = `${this.apiUrl}/by/customer-vehicle-bank-account-name/${customerVehicleBankAccountName}`;
    return this.httpClient.get<CustomerVehicleBankAccount>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBankAccount>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleBankAccount[]>> {
    return this.httpClient.get<CustomerVehicleBankAccount[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBankAccount[]>) => {
        return response;
      })
    );
  }

  searchPage(customerVehicleBankAccountSearchDTO: CustomerVehicleBankAccountSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleBankAccountSearchDTO, { params, observe: 'response' });
  }

  save(customerVehicleBankAccount: CustomerVehicleBankAccount): Observable<HttpResponse<CustomerVehicleBankAccount>> {
    return this.httpClient.post<CustomerVehicleBankAccount>(this.apiUrl, customerVehicleBankAccount, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBankAccount>) => {
        return response;
      })
    );
  }

  update(customerVehicleBankAccount: CustomerVehicleBankAccount): Observable<HttpResponse<CustomerVehicleBankAccount>> {
    const url = `${this.apiUrl}/${customerVehicleBankAccount.customerVehicleBankAccountId}`;
    return this.httpClient.put<CustomerVehicleBankAccount>(url, customerVehicleBankAccount, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBankAccount>) => {
        return response;
      })
    );
  }

  delete(customerVehicleBankAccountId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerVehicleBankAccountId}`;
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

  // Novo método para deletar múltiplos registros
  deleteAll(customerVehicleBankAccountIds: string[]): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.delete<void>(url, {
      body: customerVehicleBankAccountIds,
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