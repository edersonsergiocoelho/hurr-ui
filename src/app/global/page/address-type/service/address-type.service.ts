import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressType } from '../entity/address-type.entity';
import { AddressTypeSearchDTO } from '../dto/address-type-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class AddressTypeService {

  private readonly apiUrl = `${environment.api}/address-type`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<AddressType>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<AddressType>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressType>) => {
        return response;
      })
    );
  }

  findByFileId(id: string): Observable<HttpResponse<AddressType>> {
    const url = `${this.apiUrl}/by/fileId/${id}`;
    return this.httpClient.get<AddressType>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressType>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<AddressType[]>> {
    return this.httpClient.get<AddressType[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressType[]>) => {
        return response;
      })
    );
  }

  searchPage(addressTypeSearchDTO: AddressTypeSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, addressTypeSearchDTO, { params, observe: 'response' });
  }

  save(addressType: AddressType): Observable<HttpResponse<AddressType>> {
    return this.httpClient.post<AddressType>(this.apiUrl, addressType, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressType>) => {
        return response;
      })
    );
  }

  update(addressType: AddressType): Observable<HttpResponse<AddressType>> {
    const url = `${this.apiUrl}/${addressType.addressTypeId}`;
    return this.httpClient.put<AddressType>(url, addressType, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressType>) => {
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