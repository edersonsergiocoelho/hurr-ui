import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MpPaymentCreateService {

  private readonly apiUrl = `${environment.api}/mercado-pago/payment-create`;

  constructor(private readonly httpClient: HttpClient) {}

  create(): Observable<HttpResponse<any[]>> {
    return this.httpClient.get<any[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      })
    );
  }

  createTest(fileApproved: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.apiUrl + '/test', fileApproved, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      })
    );
  }
}