import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerVehicleAddress } from '../entity/customer-vehicle-address.entity';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleAddressService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-address`;

  constructor(private readonly http: HttpClient) {}

  findById(id: string): Observable<HttpResponse<CustomerVehicleAddress>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CustomerVehicleAddress>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleAddress[]>> {
    return this.http.get<CustomerVehicleAddress[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress[]>) => {
        return response;
      })
    );
  }

  findAllByCustomerVehicleId(customerVehicleId): Observable<HttpResponse<CustomerVehicleAddress[]>> {
    return this.http.get<CustomerVehicleAddress[]>(`${this.apiUrl}/by/customer-vehicle/${customerVehicleId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress[]>) => {
        return response;
      })
    );
  }

  findAllByCustomerVehicleIdAndAddressType(customerVehicleId, addressType): Observable<HttpResponse<CustomerVehicleAddress[]>> {
    return this.http.get<CustomerVehicleAddress[]>(`${this.apiUrl}/by/customer-vehicle/${customerVehicleId}/address-type/${addressType}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress[]>) => {
        return response;
      })
    );
  }

  save(customerVehicleAddress: CustomerVehicleAddress): Observable<HttpResponse<CustomerVehicleAddress>> {
    return this.http.post<CustomerVehicleAddress>(this.apiUrl, customerVehicleAddress, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress>) => {
        return response;
      })
    );
  }

  update(customerVehicleAddress: CustomerVehicleAddress): Observable<HttpResponse<CustomerVehicleAddress>> {
    const url = `${this.apiUrl}/${customerVehicleAddress.customerVehicleAddressId}`;
    return this.http.put<CustomerVehicleAddress>(url, customerVehicleAddress, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleAddress>) => {
        return response;
      })
    );
  }

  delete(id: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { observe: 'response' }).pipe(
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