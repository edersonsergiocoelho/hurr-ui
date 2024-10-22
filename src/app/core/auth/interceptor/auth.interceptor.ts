import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first, firstValueFrom, tap } from "rxjs";
import { SessionStorageService } from "../../session-storage/service/session-storage.service";
import { MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { AuthInterceptorDTO } from "./dto/auth-interceptor-dto.dto";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authInterceptorDTO: AuthInterceptorDTO;

  constructor(
    private sessionStorageService: SessionStorageService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authInterceptorDTO = new AuthInterceptorDTO();

    const currentUserPreference = this.sessionStorageService.getUserPreference();

    if (currentUserPreference != null) {
      this.translateService.setDefaultLang(currentUserPreference.language);
    } else {
      this.translateService.setDefaultLang('pt_BR');
    }

    this.getTranslation();

    let authReq = req;
    const loginPath = '/user/login';
    const token = this.sessionStorageService.getToken();

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    return next.handle(authReq).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {

          if (err.status == 0) {

            this.messageService.add({ 
              severity: 'warn', 
              summary: '' + this.authInterceptorDTO.warn_summary_message_service_Generic, 
              detail: '' + this.authInterceptorDTO.no_connection_to_the_api_detail_message_service_Generic 
            });

            return;
          }

          if (err.status !== 401 || window.location.pathname === loginPath) {
            return;
          }
          this.sessionStorageService.signOut();
          window.location.href = loginPath;
        }
      }
    ));
  }

  async getTranslation() {

    try {

      const keys = [
        'error_summary_message_service_Generic',
        'warn_summary_message_service_Generic',
        'no_connection_to_the_api_detail_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.authInterceptorDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.authInterceptorDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.authInterceptorDTO.no_connection_to_the_api_detail_message_service_Generic = translations['no_connection_to_the_api_detail_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: 'error',
          summary: '' + this.authInterceptorDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    }
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];