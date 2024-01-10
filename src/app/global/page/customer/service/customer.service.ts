import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../entity/customer.entity';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly apiUrl = `${environment.api}/customer`;

  constructor(private readonly http: HttpClient) {}

  findById(id: string): Observable<HttpResponse<Customer>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  findByEmail(email: string): Observable<HttpResponse<Customer>> {
    const url = `${this.apiUrl}/by/email/${email}`;
    return this.http.get<Customer>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<Customer[]>> {
    return this.http.get<Customer[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer[]>) => {
        return response;
      })
    );
  }

  sendCode(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.http.post<Customer>(`${this.apiUrl}/sendCode`, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  save(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.http.post<Customer>(this.apiUrl, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  update(customer: Customer): Observable<HttpResponse<Customer>> {
    const url = `${this.apiUrl}/${customer.customerId}`;
    return this.http.put<Customer>(url, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
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