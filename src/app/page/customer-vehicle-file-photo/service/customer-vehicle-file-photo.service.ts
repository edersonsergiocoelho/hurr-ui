import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerVehicleFilePhoto } from '../entity/customer-vehicle-file-photo.entity';
import { CustomerVehicleFilePhotoSearchDTO } from '../dto/customer-vehicle-file-photo-search-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerVehicleFilePhotoService {

  private readonly apiUrl = `${environment.api}/customer-vehicle-file-photo`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(customerVehicleFilePhotoId: string): Observable<HttpResponse<CustomerVehicleFilePhoto>> {
    const url = `${this.apiUrl}/${customerVehicleFilePhotoId}`;
    return this.httpClient.get<CustomerVehicleFilePhoto>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFilePhoto>) => {
        return response;
      })
    );
  }

  findByCustomerVehicle(customerVehicleId: string): Observable<HttpResponse<CustomerVehicleFilePhoto[]>> {
    const url = `${this.apiUrl}/by/customer-vehicle/${customerVehicleId}`;
    return this.httpClient.get<CustomerVehicleFilePhoto[]>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFilePhoto[]>) => {
        return response;
      })
    );
  }

  findByCustomerVehicleAndCoverPhoto(customerVehicleId: string): Observable<HttpResponse<CustomerVehicleFilePhoto>> {
    const url = `${this.apiUrl}/by/customer-vehicle/${customerVehicleId}/and/cover-photo`;
    return this.httpClient.get<CustomerVehicleFilePhoto>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFilePhoto>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<CustomerVehicleFilePhoto[]>> {
    return this.httpClient.get<CustomerVehicleFilePhoto[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFilePhoto[]>) => {
        return response;
      })
    );
  }

  searchPage(customerVehicleFilePhotoSearchDTO: CustomerVehicleFilePhotoSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.httpClient.post<any>(url, customerVehicleFilePhotoSearchDTO, { params, observe: 'response' });
  }

  customerVehicleSearchPage(customerVehicleFilePhotoSearchDTO: CustomerVehicleFilePhotoSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/customer-vehicle/search/page`;

    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortDir', sortDir);

    if (typeof sortBy === 'string') {
      params = params.set('sortBy', sortBy);
    } else if (Array.isArray(sortBy) && sortBy.length > 0) {
      params = params.set('sortBy', sortBy.join(','));
    }

    return this.httpClient.post<any>(url, customerVehicleFilePhotoSearchDTO, { params, observe: 'response' });
  }

  save(customerVehicleFilePhoto: CustomerVehicleFilePhoto): Observable<HttpResponse<CustomerVehicleFilePhoto>> {
    return this.httpClient.post<CustomerVehicleFilePhoto>(this.apiUrl, customerVehicleFilePhoto, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFilePhoto>) => {
        return response;
      })
    );
  }

  saveAll(customerVehicleFilePhotos: Array<CustomerVehicleFilePhoto>): Observable<HttpResponse<CustomerVehicleFilePhoto>> {
    const url = `${this.apiUrl}/all`;
    return this.httpClient.post<CustomerVehicleFilePhoto>(url, customerVehicleFilePhotos, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFilePhoto>) => {
        return response;
      })
    );
  }

  update(customerVehicleFilePhoto: CustomerVehicleFilePhoto): Observable<HttpResponse<CustomerVehicleFilePhoto>> {
    const url = `${this.apiUrl}/${customerVehicleFilePhoto.customerVehicleFilePhotoId}`;
    return this.httpClient.put<CustomerVehicleFilePhoto>(url, customerVehicleFilePhoto, { observe: 'response' }).pipe(
      map((response: HttpResponse<CustomerVehicleFilePhoto>) => {
        return response;
      })
    );
  }

  delete(customerVehicleFilePhotoId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${customerVehicleFilePhotoId}`;
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

  deleteByCustomerVehicle(customerVehicleId: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/by/customer-vehicle/${customerVehicleId}`;
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