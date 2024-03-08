import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../entity/city.entity';
import { CitySearchDTO } from '../dto/city-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private readonly apiUrl = `${environment.api}/city`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<City>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<City>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<City>) => {
        return response;
      })
    );
  }

  findByStateId(stateId: string): Observable<HttpResponse<City[]>> {
    return this.httpClient.get<City[]>(`${this.apiUrl}/by/stateId/${stateId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<City[]>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<City[]>> {
    return this.httpClient.get<City[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<City[]>) => {
        return response;
      })
    );
  }

  searchPage(citySearchDTO: CitySearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, citySearchDTO, { params, observe: 'response' });
  }

  save(city: City): Observable<HttpResponse<City>> {
    return this.httpClient.post<City>(this.apiUrl, city, { observe: 'response' }).pipe(
      map((response: HttpResponse<City>) => {
        return response;
      })
    );
  }

  update(city: City): Observable<HttpResponse<City>> {
    const url = `${this.apiUrl}/${city.cityId}`;
    return this.httpClient.put<City>(url, city, { observe: 'response' }).pipe(
      map((response: HttpResponse<City>) => {
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