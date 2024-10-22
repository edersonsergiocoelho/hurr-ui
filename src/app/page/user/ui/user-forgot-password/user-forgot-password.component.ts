import { Component, OnInit } from '@angular/core';
import { UserForgotPasswordUIDTO } from './dto/user-forgot-password-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { UserForgotPasswordDTO } from '../../dto/user-forgot-password-dto.dto';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {

  userForgotPasswordUIDTO: UserForgotPasswordUIDTO;

  constructor(
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private translateService: TranslateService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.resetForgPassword();
  }

  resetForgPassword () {

    this.userForgotPasswordUIDTO = new UserForgotPasswordUIDTO();

    this.userForgotPasswordUIDTO.userForgotPasswordDTO = new UserForgotPasswordDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_summary_message_service_Generic',
        'warn_summary_message_service_Generic',
        'forgot_password_verification_code_summary_message_service_UserForgotPassword',
        'forgot_password_verification_code_detail_message_service_UserForgotPassword',
        'forgot_password_validated_code_summary_message_service_UserForgotPassword',
        'forgot_password_validated_code_detail_message_service_UserForgotPassword',
        'update_forgot_password_summary_message_service_UserForgotPassword',
        'update_forgot_password_detail_message_service_UserForgotPassword'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.userForgotPasswordUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.userForgotPasswordUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.userForgotPasswordUIDTO.forgot_password_verification_code_summary_message_service_UserForgotPassword = translations['forgot_password_verification_code_summary_message_service_UserForgotPassword'];
      this.userForgotPasswordUIDTO.forgot_password_verification_code_detail_message_service_UserForgotPassword = translations['forgot_password_verification_code_detail_message_service_UserForgotPassword'];
      this.userForgotPasswordUIDTO.forgot_password_validated_code_summary_message_service_UserForgotPassword = translations['forgot_password_validated_code_summary_message_service_UserForgotPassword'];
      this.userForgotPasswordUIDTO.forgot_password_validated_code_detail_message_service_UserForgotPassword = translations['forgot_password_validated_code_detail_message_service_UserForgotPassword'];
      this.userForgotPasswordUIDTO.update_forgot_password_summary_message_service_UserForgotPassword = translations['update_forgot_password_summary_message_service_UserForgotPassword'];
      this.userForgotPasswordUIDTO.update_forgot_password_detail_message_service_UserForgotPassword = translations['update_forgot_password_detail_message_service_UserForgotPassword'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.userForgotPasswordUIDTO.error_summary_message_service_Generic,
        detail: error.toString()
      });
    }

    this.ngxSpinnerService.hide();
  }

  clickForgotPasswordVerificationCode() {

    this.ngxSpinnerService.show();

    this.userService.forgotPasswordVerificationCode(this.userForgotPasswordUIDTO.userForgotPasswordDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {

          this.messageService.add({ 
            severity: 'success', 
            summary: '' + this.userForgotPasswordUIDTO.forgot_password_verification_code_summary_message_service_UserForgotPassword, 
            detail: '' + this.userForgotPasswordUIDTO.forgot_password_verification_code_detail_message_service_UserForgotPassword
          });

          this.userForgotPasswordUIDTO.forgotPasswordVerificationCodeScreenControl = true;

        }

      },
      error: (error) => {

        if (error.status == 400) {
          this.messageService.add({
            severity: 'warn',
            summary: '' + this.userForgotPasswordUIDTO.warn_summary_message_service_Generic,
            detail: '' + error.error.message,
          });
        }

        if (error.status == 500) {
          this.messageService.add({
            severity: 'error',
            summary: '' + this.userForgotPasswordUIDTO.error_summary_message_service_Generic,
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

  clickForgotPasswordValidated() {

    this.ngxSpinnerService.show();

    this.userService.forgotPasswordValidated(this.userForgotPasswordUIDTO.userForgotPasswordDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {

          this.messageService.add({ 
            severity: 'success', 
            summary: '' + this.userForgotPasswordUIDTO.forgot_password_validated_code_summary_message_service_UserForgotPassword, 
            detail: '' + this.userForgotPasswordUIDTO.forgot_password_validated_code_detail_message_service_UserForgotPassword
          });

          this.userForgotPasswordUIDTO.forgotPasswordValidatedScreenControl = true;

        }

      },
      error: (error) => {

        if (error.status == 400) {
          this.messageService.add({
            severity: 'warn',
            summary: '' + this.userForgotPasswordUIDTO.warn_summary_message_service_Generic,
            detail: '' + error.error.message,
          });
        }

        if (error.status == 500) {
          this.messageService.add({
            severity: 'error',
            summary: '' + this.userForgotPasswordUIDTO.error_summary_message_service_Generic,
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

  clickForgotPassword() {

    this.userService.forgotPassword(this.userForgotPasswordUIDTO.userForgotPasswordDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {

          this.messageService.add({ 
            severity: 'success', 
            summary: '' + this.userForgotPasswordUIDTO.update_forgot_password_summary_message_service_UserForgotPassword, 
            detail: '' + this.userForgotPasswordUIDTO.update_forgot_password_detail_message_service_UserForgotPassword 
          });

          this.router.navigate(['user/login']);
        }

      },
      error: (error) => {

        if (error.status == 400) {
          this.messageService.add({
            severity: 'warn',
            summary: '' + this.userForgotPasswordUIDTO.warn_summary_message_service_Generic,
            detail: '' + error.error.message,
          });
        }

        if (error.status == 500) {
          this.messageService.add({
            severity: 'error',
            summary: '' + this.userForgotPasswordUIDTO.error_summary_message_service_Generic,
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