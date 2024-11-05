import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InterIncluirPIXDTO } from '../../dto/inter-incluir-pix-dto.dto';

@Injectable({
  providedIn: 'root'
})
export class InterPIXService {

  private readonly apiUrl = `${environment.api}/inter/pix`;

  constructor(private readonly httpClient: HttpClient) {}

  save(interIncluirPIXDTO: InterIncluirPIXDTO): Observable<HttpResponse<InterIncluirPIXDTO>> {
    return this.httpClient.post<InterIncluirPIXDTO>(this.apiUrl, interIncluirPIXDTO, { observe: 'response' }).pipe(
      map((response: HttpResponse<InterIncluirPIXDTO>) => {
        return response;
      })
    );
  }
}