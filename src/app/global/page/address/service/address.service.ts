import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../entity/address.entity';
import { AddressSearchDTO } from '../dto/address-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly apiUrl = `${environment.api}/address`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<Address>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Address>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Address>) => {
        return response;
      })
    );
  }

  findByStateId(stateId: string): Observable<HttpResponse<Address[]>> {
    return this.httpClient.get<Address[]>(`${this.apiUrl}/by/stateId/${stateId}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<Address[]>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<Address[]>> {
    return this.httpClient.get<Address[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Address[]>) => {
        return response;
      })
    );
  }

  searchPage(addressSearchDTO: AddressSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, addressSearchDTO, { params, observe: 'response' });
  }

  save(address: Address): Observable<HttpResponse<Address>> {
    return this.httpClient.post<Address>(this.apiUrl, address, { observe: 'response' }).pipe(
      map((response: HttpResponse<Address>) => {
        return response;
      })
    );
  }

  update(address: Address): Observable<HttpResponse<Address>> {
    const url = `${this.apiUrl}/${address.addressId}`;
    return this.httpClient.put<Address>(url, address, { observe: 'response' }).pipe(
      map((response: HttpResponse<Address>) => {
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