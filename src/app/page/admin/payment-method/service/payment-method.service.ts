import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../entity/payment-method.entity';
import { PaymentMethodSearchDTO } from '../dto/payment-method-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private readonly apiUrl = `${environment.api}/payment-method`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(paymentMethodId: string): Observable<HttpResponse<PaymentMethod>> {
    const url = `${this.apiUrl}/${paymentMethodId}`;
    return this.httpClient.get<PaymentMethod>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentMethod>) => {
        return response;
      })
    );
  }

  findByPaymentMethodName(paymentMethodName: string): Observable<HttpResponse<PaymentMethod>> {
    const url = `${this.apiUrl}/by/payment-method-name/${paymentMethodName}`;
    return this.httpClient.get<PaymentMethod>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentMethod>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<PaymentMethod[]>> {
    return this.httpClient.get<PaymentMethod[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentMethod[]>) => {
        return response;
      })
    );
  }

  searchPage(paymentMethodSearchDTO: PaymentMethodSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, paymentMethodSearchDTO, { params, observe: 'response' });
  }

  save(paymentMethod: PaymentMethod): Observable<HttpResponse<PaymentMethod>> {
    return this.httpClient.post<PaymentMethod>(this.apiUrl, paymentMethod, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentMethod>) => {
        return response;
      })
    );
  }

  update(paymentMethod: PaymentMethod): Observable<HttpResponse<PaymentMethod>> {
    const url = `${this.apiUrl}/${paymentMethod.paymentMethodId}`;
    return this.httpClient.put<PaymentMethod>(url, paymentMethod, { observe: 'response' }).pipe(
      map((response: HttpResponse<PaymentMethod>) => {
        return response;
      })
    );
  }

  delete(paymentMethodId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${paymentMethodId}`;
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
  deleteAll(paymentMethodIds: string[]): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.delete<void>(url, {
      body: paymentMethodIds,
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