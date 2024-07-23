import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerVehicleFileInsurance } from '../entity/customer-vehicle-file-insurance.entity';
import { CustomerVehicleFileInsuranceSearchDTO } from '../dto/customer-vehicle-file-insurance-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleFileInsuranceService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-file-insurance`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerVehicleFileInsuranceId: string): Observable<HttpResponse<CustomerVehicleFileInsurance>> {
    const url = `${this.apiUrl}/${customerVehicleFileInsuranceId}`;
    return this.httpClient.get<CustomerVehicleFileInsurance>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFileInsurance>) => {
        return response;
      })
    );
  }

  findByCustomerVehicle(customerVehicleId: string): Observable<HttpResponse<CustomerVehicleFileInsurance[]>> {
    const url = `${this.apiUrl}/by/customer-vehicle/${customerVehicleId}`;
    return this.httpClient.get<CustomerVehicleFileInsurance[]>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFileInsurance[]>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleFileInsurance[]>> {
    return this.httpClient.get<CustomerVehicleFileInsurance[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFileInsurance[]>) => {
        return response;
      })
    );
  }

  searchPage(customerVehicleFileInsuranceSearchDTO: CustomerVehicleFileInsuranceSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleFileInsuranceSearchDTO, { params, observe: 'response' });
  }

  save(customerVehicleFileInsurance: CustomerVehicleFileInsurance): Observable<HttpResponse<CustomerVehicleFileInsurance>> {
    return this.httpClient.post<CustomerVehicleFileInsurance>(this.apiUrl, customerVehicleFileInsurance, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFileInsurance>) => {
        return response;
      })
    );
  }

  finalizeBooking(customerVehicleFileInsurance: CustomerVehicleFileInsurance): Observable<HttpResponse<CustomerVehicleFileInsurance>> {
    const url = `${this.apiUrl}/finalize-booking/${customerVehicleFileInsurance.customerVehicleFileInsuranceId}`;
    return this.httpClient.put<CustomerVehicleFileInsurance>(url, customerVehicleFileInsurance, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFileInsurance>) => {
        return response;
      })
    );
  }

  update(customerVehicleFileInsurance: CustomerVehicleFileInsurance): Observable<HttpResponse<CustomerVehicleFileInsurance>> {
    const url = `${this.apiUrl}/${customerVehicleFileInsurance.customerVehicleFileInsuranceId}`;
    return this.httpClient.put<CustomerVehicleFileInsurance>(url, customerVehicleFileInsurance, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFileInsurance>) => {
        return response;
      })
    );
  }

  delete(customerVehicleFileInsuranceId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerVehicleFileInsuranceId}`;
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