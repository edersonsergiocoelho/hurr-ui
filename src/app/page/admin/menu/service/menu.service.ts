import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../entity/menu.entity';
import { catchError, map, Observable, of } from 'rxjs';
import { MenuSearchDTO } from '../dto/menu-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly apiUrl = `${environment.api}/menu`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(menuId: string): Observable<HttpResponse<Menu>> {
    const url = `${this.apiUrl}/${menuId}`;
    return this.httpClient.get<Menu>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Menu>) => {
        return response;
      })
    );
  }

  findByTypeMenuMeAll(typeMenuName :string): Observable<HttpResponse<Menu[]>> {
    const url = `${this.apiUrl}/by/type-menu/${typeMenuName}/me/all`;
    return this.httpClient.get<Menu[]>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Menu[]>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<Menu[]>> {
    return this.httpClient.get<Menu[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Menu[]>) => {
        return response;
      })
    );
  }

  searchPage(menuSearchDTO: MenuSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, menuSearchDTO, { params, observe: 'response' });
  }

  save(menu: Menu): Observable<HttpResponse<Menu>> {
    return this.httpClient.post<Menu>(this.apiUrl, menu, { observe: 'response' }).pipe(
      map((response: HttpResponse<Menu>) => {
        return response;
      })
    );
  }

  update(menu: Menu): Observable<HttpResponse<Menu>> {
    const url = `${this.apiUrl}/${menu.menuId}`;
    return this.httpClient.put<Menu>(url, menu, { observe: 'response' }).pipe(
      map((response: HttpResponse<Menu>) => {
        return response;
      })
    );
  }

  delete(menuId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${menuId}`;
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