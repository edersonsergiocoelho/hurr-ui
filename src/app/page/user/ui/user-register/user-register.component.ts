import { Component, OnInit } from '@angular/core';
import { UserRegisterUIDTO } from './dto/user-register-ui-dto.dto';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { first, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthSignUpDTO } from 'src/app/core/auth/dto/auth-sign-up-dto.dto';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userRegisterUIDTO: UserRegisterUIDTO;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetCustomerValidationForm();
  }

  resetCustomerValidationForm () {

    this.userRegisterUIDTO = new UserRegisterUIDTO();

    this.userRegisterUIDTO.authSignUpDTO = new AuthSignUpDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'save_message_service_Generic',
        'save_success_message_service_UserRegister'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.userRegisterUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.userRegisterUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.userRegisterUIDTO.save_message_service_Generic = translations['save_message_service_Generic'];
      this.userRegisterUIDTO.save_success_message_service_UserRegister = translations['save_success_message_service_UserRegister'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.userRegisterUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.ngxSpinnerService.hide();
  }

  signup() {

    this.userRegisterUIDTO.authSignUpDTO.socialProvider = 'LOCAL';

    this.authService.signup(this.userRegisterUIDTO.authSignUpDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {

          this.messageService.add({ 
            severity: 'success', 
            summary: '' + this.userRegisterUIDTO.save_message_service_Generic, 
            detail: '' + this.userRegisterUIDTO.save_success_message_service_UserRegister 
          });

          this.router.navigate(['user/login']);
        }

      },
      error: (error) => {

        if (error.status == 400) {
          this.messageService.add({
            severity: 'warn',
            summary: '' + this.userRegisterUIDTO.error_message_service_Generic,
            detail: '' + error.error.message,
          });
        }

        if (error.status == 500) {
          this.messageService.add({
            severity: 'error',
            summary: '' + this.userRegisterUIDTO.error_message_service_Generic,
            detail: '' + error.error.message,
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }
}