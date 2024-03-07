import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MpPreferenceService {

  private readonly apiUrl = `${environment.api}/mercado-pago/preference`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(preferenceId: string): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/${preferenceId}`;
    return this.httpClient.get<any>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      })
    );
  }
}