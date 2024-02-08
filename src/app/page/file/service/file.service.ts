import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File } from '../entity/file.entity';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly apiUrl = `${environment.api}/file`;

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<File>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<File>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<File>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<File[]>> {
    return this.httpClient.get<File[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<File[]>) => {
        return response;
      })
    );
  }

  save(fileApproved: File): Observable<HttpResponse<File>> {
    return this.httpClient.post<File>(this.apiUrl, fileApproved, { observe: 'response' }).pipe(
      map((response: HttpResponse<File>) => {
        return response;
      })
    );
  }

  update(fileApproved: File): Observable<HttpResponse<File>> {
    const url = `${this.apiUrl}/${fileApproved.fileId}`;
    return this.httpClient.put<File>(url, fileApproved, { observe: 'response' }).pipe(
      map((response: HttpResponse<File>) => {
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