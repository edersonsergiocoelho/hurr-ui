import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomerVehicleReview } from '../entity/customer-vehicle-review.entity';

@Injectable({
  providedIn: 'root',
})
export class CustomerVehicleReviewService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-review`;

  constructor(private readonly http: HttpClient) {}

  findById(id: string): Observable<HttpResponse<CustomerVehicleReview>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CustomerVehicleReview>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleReview>) => {
        return response;
      })
    );
  }

  findByCustomerVehicleIdAndCustomerId(customerVehicleId, customerId): Observable<HttpResponse<CustomerVehicleReview[]>> {
    return this.http.get<CustomerVehicleReview[]>(`${this.apiUrl}/by/customer-vehicle/${customerVehicleId}/customer/${customerId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleReview[]>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleReview[]>> {
    return this.http.get<CustomerVehicleReview[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleReview[]>) => {
        return response;
      })
    );
  }

  findAllByCustomerVehicleId(customerVehicleId): Observable<HttpResponse<CustomerVehicleReview[]>> {
    return this.http.get<CustomerVehicleReview[]>(`${this.apiUrl}/all/by/customer-vehicle/${customerVehicleId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleReview[]>) => {
        return response;
      })
    );
  }

  save(customerVehicleReview: CustomerVehicleReview): Observable<HttpResponse<CustomerVehicleReview>> {
    return this.http.post<CustomerVehicleReview>(this.apiUrl, customerVehicleReview, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleReview>) => {
        return response;
      })
    );
  }

  update(customerVehicleReview: CustomerVehicleReview): Observable<HttpResponse<CustomerVehicleReview>> {
    const url = `${this.apiUrl}/${customerVehicleReview.customerVehicleReviewId}`;
    return this.http.put<CustomerVehicleReview>(url, customerVehicleReview, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleReview>) => {
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