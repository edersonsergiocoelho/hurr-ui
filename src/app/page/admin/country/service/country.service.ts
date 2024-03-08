import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../entity/country.entity';
import { CountrySearchDTO } from '../dto/country-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly apiUrl = `${environment.api}/country`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<Country>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Country>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Country>) => {
        return response;
      })
    );
  }

  findByFileId(id: string): Observable<HttpResponse<Country>> {
    const url = `${this.apiUrl}/by/fileId/${id}`;
    return this.httpClient.get<Country>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Country>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<Country[]>> {
    return this.httpClient.get<Country[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Country[]>) => {
        return response;
      })
    );
  }

  searchPage(countrySearchDTO: CountrySearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, countrySearchDTO, { params, observe: 'response' });
  }

  save(country: Country): Observable<HttpResponse<Country>> {
    return this.httpClient.post<Country>(this.apiUrl, country, { observe: 'response' }).pipe(
      map((response: HttpResponse<Country>) => {
        return response;
      })
    );
  }

  update(country: Country): Observable<HttpResponse<Country>> {
    const url = `${this.apiUrl}/${country.countryId}`;
    return this.httpClient.put<Country>(url, country, { observe: 'response' }).pipe(
      map((response: HttpResponse<Country>) => {
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