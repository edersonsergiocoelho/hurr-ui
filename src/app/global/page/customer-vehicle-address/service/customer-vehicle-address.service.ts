import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerVehicleAddress } from '../entity/customer-vehicle-address.entity';
import { CustomerVehicleAddressSearchDTO } from '../dto/customer-vehicle-address-search-dto.dto';
import { CustomerVehicleAddressSaveAddressDTO } from '../dto/customer-vehicle-address-save-address-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleAddressService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-address`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<CustomerVehicleAddress>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<CustomerVehicleAddress>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleAddress[]>> {
    return this.httpClient.get<CustomerVehicleAddress[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress[]>) => {
        return response;
      })
    );
  }

  findAllByCustomerVehicleId(customerVehicleId): Observable<HttpResponse<CustomerVehicleAddress[]>> {
    return this.httpClient.get<CustomerVehicleAddress[]>(`${this.apiUrl}/by/customer-vehicle/${customerVehicleId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress[]>) => {
        return response;
      })
    );
  }

  findAllByCustomerVehicleIdAndAddressType(customerVehicleId, addressType): Observable<HttpResponse<CustomerVehicleAddress[]>> {
    return this.httpClient.get<CustomerVehicleAddress[]>(`${this.apiUrl}/by/customer-vehicle/${customerVehicleId}/address-type/${addressType}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress[]>) => {
        return response;
      })
    );
  }

  searchPage(customerVehicleAddressSearchDTO: CustomerVehicleAddressSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleAddressSearchDTO, { params, observe: 'response' });
  }

  save(customerVehicleAddress: CustomerVehicleAddress): Observable<HttpResponse<CustomerVehicleAddress>> {
    return this.httpClient.post<CustomerVehicleAddress>(this.apiUrl, customerVehicleAddress, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress>) => {
        return response;
      })
    );
  }

  saveAddress(customerVehicleAddressSaveAddressDTO: CustomerVehicleAddressSaveAddressDTO): Observable<HttpResponse<CustomerVehicleAddress>> {
    const url = `${this.apiUrl}/address`;
    return this.httpClient.post<CustomerVehicleAddress>(url, customerVehicleAddressSaveAddressDTO, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress>) => {
        return response;
      })
    );
  }

  update(customerVehicleAddress: CustomerVehicleAddress): Observable<HttpResponse<CustomerVehicleAddress>> {
    const url = `${this.apiUrl}/${customerVehicleAddress.customerVehicleAddressId}`;
    return this.httpClient.put<CustomerVehicleAddress>(url, customerVehicleAddress, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress>) => {
        return response;
      })
    );
  }

  updateAddress(customerVehicleAddressId: string, customerVehicleAddressSaveAddressDTO: CustomerVehicleAddressSaveAddressDTO): Observable<HttpResponse<CustomerVehicleAddress>> {
    const url = `${this.apiUrl}/${customerVehicleAddressId}/address`;
    return this.httpClient.put<CustomerVehicleAddress>(url, customerVehicleAddressSaveAddressDTO, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress>) => {
        return response;
      })
    );
  }

  delete(customerVehicleAddressId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerVehicleAddressId}`;
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