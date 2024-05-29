import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerVehicleBooking } from '../entity/customer-vehicle-booking.entity';
import { CustomerVehicleBookingSearchDTO } from '../dto/customer-vehicle-booking-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleBookingService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-booking`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerVehicleBookingId: string): Observable<HttpResponse<CustomerVehicleBooking>> {
    const url = `${this.apiUrl}/${customerVehicleBookingId}`;
    return this.httpClient.get<CustomerVehicleBooking>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBooking>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleBooking[]>> {
    return this.httpClient.get<CustomerVehicleBooking[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBooking[]>) => {
        return response;
      })
    );
  }

  sumCustomerVehicleTotalBookingValue(customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchDTO): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/sum/customer-vehicle/total-booking-value`;

    /*
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortDir', sortDir);

    if (typeof sortBy === 'string') {
      params = params.set('sortBy', sortBy);
    } else if (Array.isArray(sortBy) && sortBy.length > 0) {
      params = params.set('sortBy', sortBy.join(','));
    }
    */

    return this.httpClient.post<any>(url, customerVehicleBookingSearchDTO, { observe: 'response' });
  }

  searchPage(customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleBookingSearchDTO, { params, observe: 'response' });
  }

  customerVehicleSearchPage(customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleBookingSearchDTO, { params, observe: 'response' });
  }

  save(customerVehicleBooking: CustomerVehicleBooking): Observable<HttpResponse<CustomerVehicleBooking>> {
    return this.httpClient.post<CustomerVehicleBooking>(this.apiUrl, customerVehicleBooking, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBooking>) => {
        return response;
      })
    );
  }

  finalizeBooking(customerVehicleBooking: CustomerVehicleBooking): Observable<HttpResponse<CustomerVehicleBooking>> {
    const url = `${this.apiUrl}/finalize-booking/${customerVehicleBooking.customerVehicleBookingId}`;
    return this.httpClient.put<CustomerVehicleBooking>(url, customerVehicleBooking, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBooking>) => {
        return response;
      })
    );
  }

  update(customerVehicleBooking: CustomerVehicleBooking): Observable<HttpResponse<CustomerVehicleBooking>> {
    const url = `${this.apiUrl}/${customerVehicleBooking.customerVehicleBookingId}`;
    return this.httpClient.put<CustomerVehicleBooking>(url, customerVehicleBooking, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleBooking>) => {
        return response;
      })
    );
  }

  delete(customerVehicleBookingId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerVehicleBookingId}`;
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