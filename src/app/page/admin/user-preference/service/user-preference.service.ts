import { Injectable } from '@angular/core';
import { UserPreference } from '../entity/user-preference.entity';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { UserPreferenceSearchDTO } from '../dto/user-preference-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {

  private readonly apiUrl = `${environment.api}/user-preference`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(userPreferenceId: string): Observable<HttpResponse<UserPreference>> {
    const url = `${this.apiUrl}/${userPreferenceId}`;
    return this.httpClient.get<UserPreference>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserPreference>) => {
        return response;
      })
    );
  }

  findByUserId(userId: string): Observable<HttpResponse<UserPreference>> {
    const url = `${this.apiUrl}/by/user/${userId}`;
    return this.httpClient.get<UserPreference>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserPreference>) => {
        return response;
      })
    );
  }

  findByUserPreferenceName(userPreferenceName: string): Observable<HttpResponse<UserPreference>> {
    const url = `${this.apiUrl}/by/user-preference-name/${userPreferenceName}`;
    return this.httpClient.get<UserPreference>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserPreference>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<UserPreference[]>> {
    return this.httpClient.get<UserPreference[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserPreference[]>) => {
        return response;
      })
    );
  }

  searchPage(userPreferenceSearchDTO: UserPreferenceSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, userPreferenceSearchDTO, { params, observe: 'response' });
  }

  save(userPreference: UserPreference): Observable<HttpResponse<UserPreference>> {
    return this.httpClient.post<UserPreference>(this.apiUrl, userPreference, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserPreference>) => {
        return response;
      })
    );
  }

  update(userPreference: UserPreference): Observable<HttpResponse<UserPreference>> {
    const url = `${this.apiUrl}/${userPreference.userPreferenceId}`;
    return this.httpClient.put<UserPreference>(url, userPreference, { observe: 'response' }).pipe(
      map((response: HttpResponse<UserPreference>) => {
        return response;
      })
    );
  }

  delete(userPreferenceId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${userPreferenceId}`;
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
  deleteAll(userPreferenceIds: string[]): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.delete<void>(url, {
      body: userPreferenceIds,
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