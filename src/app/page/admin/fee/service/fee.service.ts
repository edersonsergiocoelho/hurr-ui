import { Injectable } from '@angular/core';
import { Fee } from '../entity/fee.entity';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { FeeSearchDTO } from '../dto/fe-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  private readonly apiUrl = `${environment.api}/fee`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(feeId: string): Observable<HttpResponse<Fee>> {
    const url = `${this.apiUrl}/${feeId}`;
    return this.httpClient.get<Fee>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Fee>) => {
        return response;
      })
    );
  }

  findByFeeName(feeType: string): Observable<HttpResponse<Fee>> {
    const url = `${this.apiUrl}/by/fee-name/${feeType}`;
    return this.httpClient.get<Fee>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Fee>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<Fee[]>> {
    return this.httpClient.get<Fee[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Fee[]>) => {
        return response;
      })
    );
  }

  searchPage(feeSearchDTO: FeeSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, feeSearchDTO, { params, observe: 'response' });
  }

  save(fee: Fee): Observable<HttpResponse<Fee>> {
    return this.httpClient.post<Fee>(this.apiUrl, fee, { observe: 'response' }).pipe(
      map((response: HttpResponse<Fee>) => {
        return response;
      })
    );
  }

  update(fee: Fee): Observable<HttpResponse<Fee>> {
    const url = `${this.apiUrl}/${fee.feeId}`;
    return this.httpClient.put<Fee>(url, fee, { observe: 'response' }).pipe(
      map((response: HttpResponse<Fee>) => {
        return response;
      })
    );
  }

  delete(feeId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${feeId}`;
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
  deleteAll(feeIds: string[]): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.delete<void>(url, {
      body: feeIds,
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