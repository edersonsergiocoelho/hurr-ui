import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileApproved } from '../entity/file-approved.entity';

@Injectable({
  providedIn: 'root'
})
export class FileApprovedService {

  private readonly apiUrl = `${environment.api}/file-approved`;

  constructor(private readonly http: HttpClient) {}

  findById(id: string): Observable<HttpResponse<FileApproved>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<FileApproved>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<FileApproved>) => {
        return response;
      })
    );
  }

  findByFileId(id: string): Observable<HttpResponse<FileApproved>> {
    const url = `${this.apiUrl}/by/fileId/${id}`;
    return this.http.get<FileApproved>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<FileApproved>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<FileApproved[]>> {
    return this.http.get<FileApproved[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<FileApproved[]>) => {
        return response;
      })
    );
  }

  save(fileApproved: FileApproved): Observable<HttpResponse<FileApproved>> {
    return this.http.post<FileApproved>(this.apiUrl, fileApproved, { observe: 'response' }).pipe(
      map((response: HttpResponse<FileApproved>) => {
        return response;
      })
    );
  }

  update(fileApproved: FileApproved): Observable<HttpResponse<FileApproved>> {
    const url = `${this.apiUrl}/${fileApproved.fileApprovedId}`;
    return this.http.put<FileApproved>(url, fileApproved, { observe: 'response' }).pipe(
      map((response: HttpResponse<FileApproved>) => {
        return response;
      })
    );
  }

  delete(id: string): Observable<HttpResponse<void> | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { observe: 'response' }).pipe(
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