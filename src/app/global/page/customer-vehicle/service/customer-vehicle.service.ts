import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomerVehicle } from '../entity/customer-vehicle.entity';
import { environment } from 'src/environments/environment';
import { SearchCustomerVehicle } from '../dto/search-customer-vehicle.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerVehicleService {

  private readonly apiUrl = `${environment.api}/customer-vehicle`;

  constructor(private readonly http: HttpClient) {}

  getAllCustomerVehicles(): Observable<HttpResponse<CustomerVehicle[]>> {
    return this.http.get<CustomerVehicle[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle[]>) => {
        return response;
      })
    );
  }

  getCustomerVehicleById(id: string): Observable<HttpResponse<CustomerVehicle>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CustomerVehicle>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle>) => {
        return response;
      })
    );
  }

  searchCustomerVehicles(searchCriteria: any): Observable<HttpResponse<CustomerVehicle[]>> {
    return this.http.post<CustomerVehicle[]>(`${this.apiUrl}/search`, searchCriteria, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle[]>) => {
        return response;
      })
    );
  }

  createCustomerVehicle(customerVehicle: CustomerVehicle): Observable<HttpResponse<CustomerVehicle>> {
    return this.http.post<CustomerVehicle>(this.apiUrl, customerVehicle, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle>) => {
        return response;
      })
    );
  }

  updateCustomerVehicle(customerVehicle: CustomerVehicle): Observable<HttpResponse<CustomerVehicle>> {
    const url = `${this.apiUrl}/${customerVehicle.customerVehicleId}`;
    return this.http.put<CustomerVehicle>(url, customerVehicle, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicle>) => {
        return response;
      })
    );
  }

  deleteCustomerVehicle(id: string): Observable<HttpResponse<void> | null> {
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