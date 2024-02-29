import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { State } from '../entity/state.entity';
import { StateSearchDTO } from '../dto/state-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private readonly apiUrl = `${environment.api}/state`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<State>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<State>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<State>) => {
        return response;
      })
    );
  }

  findByCountryId(countryId: string): Observable<HttpResponse<State[]>> {
    return this.httpClient.get<State[]>(`${this.apiUrl}/by/countryId/${countryId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<State[]>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<State[]>> {
    return this.httpClient.get<State[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<State[]>) => {
        return response;
      })
    );
  }

  searchPage(stateSearchDTO: StateSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, stateSearchDTO, { params, observe: 'response' });
  }

  save(state: State): Observable<HttpResponse<State>> {
    return this.httpClient.post<State>(this.apiUrl, state, { observe: 'response' }).pipe(
      map((response: HttpResponse<State>) => {
        return response;
      })
    );
  }

  update(state: State): Observable<HttpResponse<State>> {
    const url = `${this.apiUrl}/${state.stateId}`;
    return this.httpClient.put<State>(url, state, { observe: 'response' }).pipe(
      map((response: HttpResponse<State>) => {
        return response;
      })
    );
  }

  delete(id: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${id}`;
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