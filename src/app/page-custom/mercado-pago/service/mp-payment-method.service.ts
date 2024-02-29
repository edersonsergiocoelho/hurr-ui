import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MpPaymentMethodService {

  private readonly apiUrl = `${environment.api}/mercado-pago/payment-method`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      })
    );
  }
}