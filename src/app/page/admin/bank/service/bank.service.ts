import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bank } from '../entity/bank.entity';
import { BankSearchDTO } from '../dto/bank-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private readonly apiUrl = `${environment.api}/bank`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(bankId: string): Observable<HttpResponse<Bank>> {
    const url = `${this.apiUrl}/${bankId}`;
    return this.httpClient.get<Bank>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Bank>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<Bank[]>> {
    return this.httpClient.get<Bank[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Bank[]>) => {
        return response;
      })
    );
  }

  searchPage(bankSearchDTO: BankSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, bankSearchDTO, { params, observe: 'response' });
  }

  save(bank: Bank): Observable<HttpResponse<Bank>> {
    return this.httpClient.post<Bank>(this.apiUrl, bank, { observe: 'response' }).pipe(
      map((response: HttpResponse<Bank>) => {
        return response;
      })
    );
  }

  update(bank: Bank): Observable<HttpResponse<Bank>> {
    const url = `${this.apiUrl}/${bank.bankId}`;
    return this.httpClient.put<Bank>(url, bank, { observe: 'response' }).pipe(
      map((response: HttpResponse<Bank>) => {
        return response;
      })
    );
  }

  delete(bankId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${bankId}`;
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