import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerAddress } from '../entity/customer-address.entity';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerAddressSearchDTO } from '../dto/customer-address-search-dto.dto';
import { CustomerAddressSaveAddressDTO } from '../dto/customer-address-save-address-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {

  private readonly apiUrl = `${environment.api}/customer-address`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<CustomerAddress>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<CustomerAddress>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerAddress>) => {
        return response;
      })
    );
  }

  findByCustomerId(customerId: string): Observable<HttpResponse<CustomerAddress[]>> {
    return this.httpClient.get<CustomerAddress[]>(`${this.apiUrl}/by/customerId/${customerId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerAddress[]>) => {
        return response;
      })
    );
  }

  findByCustomerIdAndAddressTypeName(customerId: string, addressTypeName: string): Observable<HttpResponse<CustomerAddress[]>> {
    return this.httpClient.get<CustomerAddress[]>(`${this.apiUrl}/by/customerId/${customerId}/and/addressTypeName/${addressTypeName}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerAddress[]>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerAddress[]>> {
    return this.httpClient.get<CustomerAddress[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerAddress[]>) => {
        return response;
      })
    );
  }

  searchPage(customerAddressSearchDTO: CustomerAddressSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerAddressSearchDTO, { params, observe: 'response' });
  }

  save(customerAddress: CustomerAddress): Observable<HttpResponse<CustomerAddress>> {
    return this.httpClient.post<CustomerAddress>(this.apiUrl, customerAddress, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerAddress>) => {
        return response;
      })
    );
  }

  saveAddress(customerAddressSaveAddressDTO: CustomerAddressSaveAddressDTO): Observable<HttpResponse<CustomerAddress>> {
    const url = `${this.apiUrl}/address`;
    return this.httpClient.post<CustomerAddress>(url, customerAddressSaveAddressDTO, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerAddress>) => {
        return response;
      })
    );
  }

  update(customerAddress: CustomerAddress): Observable<HttpResponse<CustomerAddress>> {
    const url = `${this.apiUrl}/${customerAddress.customerAddressId}`;
    return this.httpClient.put<CustomerAddress>(url, customerAddress, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerAddress>) => {
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