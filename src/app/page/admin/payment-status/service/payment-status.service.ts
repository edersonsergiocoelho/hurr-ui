import { Injectable } from '@angular/core';
import { PaymentStatus } from '../entity/payment-status.entity';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { PaymentStatusSearchDTO } from '../dto/payment-status-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentStatusService {

  private readonly apiUrl = `${environment.api}/payment-status`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(paymentStatusId: string): Observable<HttpResponse<PaymentStatus>> {
    const url = `${this.apiUrl}/${paymentStatusId}`;
    return this.httpClient.get<PaymentStatus>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentStatus>) => {
        return response;
      })
    );
  }

  findByPaymentStatusName(paymentStatusName: string): Observable<HttpResponse<PaymentStatus>> {
    const url = `${this.apiUrl}/by/payment-status-name/${paymentStatusName}`;
    return this.httpClient.get<PaymentStatus>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentStatus>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<PaymentStatus[]>> {
    return this.httpClient.get<PaymentStatus[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentStatus[]>) => {
        return response;
      })
    );
  }

  searchPage(paymentStatusSearchDTO: PaymentStatusSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, paymentStatusSearchDTO, { params, observe: 'response' });
  }

  save(paymentStatus: PaymentStatus): Observable<HttpResponse<PaymentStatus>> {
    return this.httpClient.post<PaymentStatus>(this.apiUrl, paymentStatus, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentStatus>) => {
        return response;
      })
    );
  }

  finalizeBooking(paymentStatus: PaymentStatus): Observable<HttpResponse<PaymentStatus>> {
    const url = `${this.apiUrl}/finalize-booking/${paymentStatus.paymentStatusId}`;
    return this.httpClient.put<PaymentStatus>(url, paymentStatus, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentStatus>) => {
        return response;
      })
    );
  }

  update(paymentStatus: PaymentStatus): Observable<HttpResponse<PaymentStatus>> {
    const url = `${this.apiUrl}/${paymentStatus.paymentStatusId}`;
    return this.httpClient.put<PaymentStatus>(url, paymentStatus, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentStatus>) => {
        return response;
      })
    );
  }

  delete(paymentStatusId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${paymentStatusId}`;
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