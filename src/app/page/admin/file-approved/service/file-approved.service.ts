import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileApproved } from '../entity/file-approved.entity';
import { FileApprovedSearchDTO } from '../dto/file-approved-search-dto.dto';

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

  searchPage(fileApprovedSearchDTO: FileApprovedSearchDTO, page: number = 0, size: number = 10, sortDir: string, sortBy: string | string[]): Observable<HttpResponse<any>> {
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

    return this.http.post<any>(url, fileApprovedSearchDTO, { params, observe: 'response' });
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