import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddressAddressType } from '../entity/address-address-type.entity';
import { Observable, catchError, map, of } from 'rxjs';
import { AddressAddressTypeSearchDTO } from '../dto/address-address-type-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class AddressAddressTypeService {

  private readonly apiUrl = `${environment.api}/address-address-type`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<AddressAddressType>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<AddressAddressType>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressAddressType>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<AddressAddressType[]>> {
    return this.httpClient.get<AddressAddressType[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressAddressType[]>) => {
        return response;
      })
    );
  }

  findAllByAddressId(addressId: string): Observable<HttpResponse<AddressAddressType[]>> {
    const url = `${this.apiUrl}/all/by/address/${addressId}`;
    return this.httpClient.get<AddressAddressType[]>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressAddressType[]>) => {
        return response;
      })
    );
  }

  searchPage(addressAddressTypeSearchDTO: AddressAddressTypeSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, addressAddressTypeSearchDTO, { params, observe: 'response' });
  }

  save(addressAddressType: AddressAddressType): Observable<HttpResponse<AddressAddressType>> {
    return this.httpClient.post<AddressAddressType>(this.apiUrl, addressAddressType, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressAddressType>) => {
        return response;
      })
    );
  }

  update(addressId: string, addressTypeId: string, addressAddressType: AddressAddressType): Observable<HttpResponse<AddressAddressType>> {
    const url = `${this.apiUrl}/${addressId}/${addressTypeId}`;
    return this.httpClient.put<AddressAddressType>(url, addressAddressType, { observe: 'response' }).pipe(
      map((response: HttpResponse<AddressAddressType>) => {
        return response;
      })
    );
  }

  delete(addressId: string, addressTypeId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${addressId}/${addressTypeId}`;
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