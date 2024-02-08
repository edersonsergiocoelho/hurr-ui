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

  constructor(private readonly httpClient: HttpClient) {}

  findById(id: string): Observable<HttpResponse<Customer>> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Customer>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  findByEmail(email: string): Observable<HttpResponse<Customer>> {
    const url = `${this.apiUrl}/by/email/${email}`;
    return this.httpClient.get<Customer>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  findAll(): Observable<HttpResponse<Customer[]>> {
    return this.httpClient.get<Customer[]>(this.apiUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer[]>) => {
        return response;
      })
    );
  }

  emailVerificationCode(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.httpClient.post<Customer>(`${this.apiUrl}/emailVerificationCode`, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  emailValidateCode(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.httpClient.post<Customer>(`${this.apiUrl}/emailValidateCode`, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  phoneVerificationCodeSMS(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.httpClient.post<Customer>(`${this.apiUrl}/phoneVerificationCodeSMS`, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  phoneVerificationCodeTelegram(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.httpClient.post<Customer>(`${this.apiUrl}/phoneVerificationCodeTelegram`, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  phoneVerificationCodeWhatsApp(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.httpClient.post<Customer>(`${this.apiUrl}/phoneVerificationCodeWhatsApp`, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  phoneValidateCode(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.httpClient.post<Customer>(`${this.apiUrl}/phoneValidateCode`, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  uploadIdentityNumber(file: File): Observable<HttpResponse<Customer>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<Customer>(`${this.apiUrl}/uploadIdentityNumber`, formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  uploadDriverLicense(file: File): Observable<HttpResponse<Customer>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<Customer>(`${this.apiUrl}/uploadDriverLicense`, formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  save(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.httpClient.post<Customer>(this.apiUrl, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
        return response;
      })
    );
  }

  update(customer: Customer): Observable<HttpResponse<Customer>> {
    const url = `${this.apiUrl}/${customer.customerId}`;
    return this.httpClient.put<Customer>(url, customer, { observe: 'response' }).pipe(
      map((response: HttpResponse<Customer>) => {
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