import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';

import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { Customer } from 'src/app/global/page/customer/entity/customer.entity';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/page/user/service/user.service';
import { User } from 'src/app/page/user/entity/user.entity';
import { FileUpload } from 'primeng/fileupload';
import { FileApprovedService } from 'src/app/page/admin/file-approved/service/file-approved.service';
import { TranslateService } from '@ngx-translate/core';
import { CustomerValidationUIDTO } from './dto/customer-validation-ui.dto';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-validation',
  templateUrl: './customer-validation.component.html',
  styleUrls: ['./customer-validation.component.css']
})
export class CustomerValidationComponent implements OnInit {

  customerValidationUIDTO: CustomerValidationUIDTO;

  emailForm: NgForm;
  emailVerificationCodeForm: NgForm;
  phoneForm: NgForm;
  phoneVerificationCodeForm: NgForm;
  identityNumberForm: NgForm;
  driverLicenseForm: NgForm;

  @ViewChild(FileUpload) fileUploadDriverLicense: FileUpload;
  @ViewChild(FileUpload) fileUploadIdentityNumber: FileUpload;
  @ViewChild(FileUpload) fileUploadProfilePicture: FileUpload;

  constructor(private messageService: MessageService,
              private ngxSpinnerService: NgxSpinnerService,
              private sessionStorageService: SessionStorageService,
              private translateService: TranslateService,
              private customerService: CustomerService,
              private fileApprovedService: FileApprovedService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetCustomerValidationForm();
  }

  resetCustomerValidationForm () {

    this.customerValidationUIDTO = new CustomerValidationUIDTO();

    this.customerValidationUIDTO.customer = new Customer();
    this.customerValidationUIDTO.user = new User();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    const currentUser = this.sessionStorageService.getUser();

    this.customerValidationUIDTO.user = currentUser;

    // User
    try {

      const resultUserServiceFindByEmail = await firstValueFrom(this.userService.getCurrentUser().pipe(first()));

      if (resultUserServiceFindByEmail.status == 200) {

        if (resultUserServiceFindByEmail.body != null) {
          this.customerValidationUIDTO.user = resultUserServiceFindByEmail.body;
        }
      }

    } catch (error: any) {

      if (error.status == 404) {;

        this.messageService.add({ severity: 'warn', 
                                  summary: 'Não encontrado dados do cliente.', 
                                  detail: 'Não encontrado dados do cliente, favor seguir os passos para a validação.'
                                });
      }

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    // Customer
    try {

      const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

      if (resultCustomerFindByEmail.status == 200) {

        if (resultCustomerFindByEmail.body != null) {
          this.customerValidationUIDTO.customer = resultCustomerFindByEmail.body;

          if (this.customerValidationUIDTO.customer.dateOfBirth != null) {
            this.customerValidationUIDTO.customer.dateOfBirth = moment(this.customerValidationUIDTO.customer.dateOfBirth).toDate();
          }

          if (this.customerValidationUIDTO.customer.driverLicenseFirstLicenseDate != null) {
            this.customerValidationUIDTO.customer.driverLicenseFirstLicenseDate = moment(this.customerValidationUIDTO.customer.driverLicenseFirstLicenseDate).toDate();
          }

          if (this.customerValidationUIDTO.customer.driverLicenseExpirationDate != null) {
            this.customerValidationUIDTO.customer.driverLicenseExpirationDate = moment(this.customerValidationUIDTO.customer.driverLicenseExpirationDate).toDate();
          }

          if (this.customerValidationUIDTO.customer.driverLicenseIssueDate != null) {
            this.customerValidationUIDTO.customer.driverLicenseIssueDate = moment(this.customerValidationUIDTO.customer.driverLicenseIssueDate).toDate();
          }
        }
      }

    } catch (error: any) {

      if (error.status == 404) {;

        this.messageService.add({ severity: 'warn', 
                                  summary: 'Não encontrado dados do cliente.', 
                                  detail: 'Não encontrado dados do cliente, favor seguir os passos para a validação.'
                                });
      }

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    // Carteira de identidade
    if (this.customerValidationUIDTO.customer.identityNumberFileId != null) {

      try {

        const resultFileApprovedFindByFileId = await firstValueFrom(this.fileApprovedService.findByFileId(this.customerValidationUIDTO.customer.identityNumberFileId).pipe(first()));

        if (resultFileApprovedFindByFileId.status == 200) {

          if (resultFileApprovedFindByFileId.body != null) {
            this.customerValidationUIDTO.fileApprovedIdentityNumber = resultFileApprovedFindByFileId.body;
          }
        }

      } catch (error: any) {

        if (error.status == 404) {

          this.messageService.add({ severity: 'warn', 
                                    summary: 'Não encontrado dados da carteira de identidade.', 
                                    detail: 'Não encontrado dados da carteira de identidade, favor seguir os passos para a validação.'
                                  });
        }

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
        }
      }
    }

    // Carteira de motorista
    if (this.customerValidationUIDTO.customer.driverLicenseFileId != null) {

      try {

        const resultFileApprovedFindByFileId = await firstValueFrom(this.fileApprovedService.findByFileId(this.customerValidationUIDTO.customer.driverLicenseFileId).pipe(first()));

        if (resultFileApprovedFindByFileId.status == 200) {

          if (resultFileApprovedFindByFileId.body != null) {
            this.customerValidationUIDTO.fileApprovedDriverLicense = resultFileApprovedFindByFileId.body;
          }
        }

      } catch (error: any) {

        if (error.status == 404) {

          this.messageService.add({ severity: 'warn', 
                                    summary: 'Não encontrado dados da carteira de motorista.', 
                                    detail: 'Não encontrado dados da carteira de motorista, favor seguir os passos para a validação.'
                                  });
        }

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
        }
      }
    }

    // Foto do perfil
    if (this.customerValidationUIDTO.user.photoFileId != null) {

      try {

        const resultFileApprovedFindByFileId = await firstValueFrom(this.fileApprovedService.findByFileId(this.customerValidationUIDTO.user.photoFileId).pipe(first()));

        if (resultFileApprovedFindByFileId.status == 200) {

          if (resultFileApprovedFindByFileId.body != null) {
            this.customerValidationUIDTO.fileApprovedProfilePicture = resultFileApprovedFindByFileId.body;
          }
        }

      } catch (error: any) {

        if (error.status == 404) {

          this.messageService.add({ severity: 'warn', 
                                    summary: 'Não encontrado dados da foto do perfil.', 
                                    detail: 'Não encontrado dados da foto do perfil, favor seguir os passos para a validação.'
                                  });
        }

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
        }
      }
    }

    this.ngxSpinnerService.hide();
  }

  clickEmailVerificationCode() {

    this.ngxSpinnerService.show();

    this.customerValidationUIDTO.customer.email = this.customerValidationUIDTO.email;

    this.customerService.emailVerificationCode(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerValidationUIDTO.sendEmailVerificationCode = true;

        this.messageService.add({ 
          severity: 'info', 
          summary: 'Email enviado com sucesso.', 
          detail: 'Email enviado com sucesso, verifique seu email.' 
        });

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  clickEmailValidateCode() {

    this.ngxSpinnerService.show();

    this.customerValidationUIDTO.customer.emailVerificationCode = this.customerValidationUIDTO.emailVerificationCode;

    this.customerService.emailValidateCode(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.messageService.add({ 
          severity: 'info', 
          summary: 'Email validado com sucesso.', 
          detail: 'Email validado com sucesso, seu email foi confirmado. Aguarde 10 segundos para carregar o próximo passo.'
        });

        setTimeout(() => {
          window.location.reload();
        }, 10000);

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  clickPhoneVerificationCodeSMS() {

    this.ngxSpinnerService.show();

    this.customerValidationUIDTO.customer.ddiPhone = this.customerValidationUIDTO.ddi;
    this.customerValidationUIDTO.customer.phone = this.customerValidationUIDTO.phone;

    this.customerService.phoneVerificationCodeSMS(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerValidationUIDTO.sendPhoneVerificationCode = true;

        this.messageService.add({ 
          severity: 'info', 
          summary: 'SMS enviado com sucesso.', 
          detail: 'SMS enviado com sucesso, verifique seu celular.' 
        });

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar SMS, tente novamente mais tarde, ou tente outra opção.' });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  clickPhoneVerificationCodeWhatsApp() {

    this.ngxSpinnerService.show();

    this.customerValidationUIDTO.customer.ddiPhone = this.customerValidationUIDTO.ddi;
    this.customerValidationUIDTO.customer.phone = this.customerValidationUIDTO.phone;

    this.customerService.phoneVerificationCodeWhatsApp(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerValidationUIDTO.sendPhoneVerificationCode = true;

        this.messageService.add({ 
          severity: 'info', 
          summary: 'WhatsApp enviado com sucesso.', 
          detail: 'WhatsApp enviado com sucesso, verifique seu celular.'
        });

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar WhatsApp, tente novamente mais tarde, ou tente outra opção.' });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  clickPhoneVerificationCodeTelegram() {

    this.ngxSpinnerService.show();

    this.customerValidationUIDTO.customer.ddiPhone = this.customerValidationUIDTO.ddi;
    this.customerValidationUIDTO.customer.phone = this.customerValidationUIDTO.phone;

    this.customerService.phoneVerificationCodeTelegram(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerValidationUIDTO.sendPhoneVerificationCode = true;

        this.messageService.add({ 
          severity: 'info', 
          summary: 'Telegram enviado com sucesso.', 
          detail: 'Telegram enviado com sucesso, verifique seu celular.'
        });

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar Telegram, tente novamente mais tarde, ou tente outra opção.' });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  clickPhoneValidateCode() {

    this.ngxSpinnerService.show();

    this.customerValidationUIDTO.customer.phoneVerificationCode = this.customerValidationUIDTO.phoneVerificationCode;

    this.customerService.phoneValidateCode(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.messageService.add({ 
          severity: 'info', 
          summary: 'Celular validado com sucesso.', 
          detail: 'Celular validado com sucesso, seu celular foi confirmado. Aguarde 10 segundos para carregar o próximo passo.'
        });

        setTimeout(() => {
          window.location.reload();
        }, 10000);

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  // Carteira de identidade
  uploadHandlerIdentityNumber(event: any) {

    this.fileUploadIdentityNumber.disabled = true;

    this.customerService.uploadIdentityNumber(event.files[0]).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.body != null) {
          this.customerValidationUIDTO.identityNumberFileId = data.body.fileId;
        }

        this.messageService.add({
          severity: 'info',
          summary: 'Upload da Carteira de Identidade concluído',
          detail: 'O upload da Carteira de Identidade foi realizado com sucesso.'
        });
        
        this.customerValidationUIDTO.divButtonIdentityNumber = true;

      },
      error: (error) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erro', 
          detail: 'Ocorreu um erro ao fazer o upload da Carteira de Identidade. Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte técnico.',
        });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  clickIdentityNumberSendInformation() {

    this.customerValidationUIDTO.customer.identityNumberFileId = this.customerValidationUIDTO.identityNumberFileId;

    this.customerService.update(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.messageService.add({ 
          severity: 'info',                           
          summary: 'Carteira de identidade enviada com sucesso.',                          
          detail: 'Carteira de identidade enviada com sucesso. Aguarde a aprovação por parte da nossa equipe. Você será notificado assim que a aprovação for concluída. Aguarde 10 segundos para carregar o próximo passo.'
         });

        setTimeout(() => {
          window.location.reload();
        }, 10000);

      },
      error: (error) => {

        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erro', 
          detail: 'Erro ao enviar Carteira de identidade, tente novamente mais tarde.' 
        });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  toggleApprovalIdentityNumber() {
    this.customerValidationUIDTO.showApprovalMessageIdentityNumber = !this.customerValidationUIDTO.showApprovalMessageIdentityNumber;
  }

  // Carteira de motorista
  uploadHandlerDriverLicense(event: any) {

    this.fileUploadDriverLicense.disabled = true;

    this.customerService.uploadDriverLicense(event.files[0]).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.body != null) {
          this.customerValidationUIDTO.driverLicenseFileId = data.body.fileId;
        }

        this.messageService.add({ 
          severity: 'info', 
          summary: 'Upload da Carteira de Motorista concluído', 
          detail: 'O upload da Carteira de Motorista foi realizado com sucesso.'
        });

        this.customerValidationUIDTO.divButtonDriverLicense = true;

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar Carteira de motorista, tente novamente mais tarde.' });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  clickDriverLicenseSendInformation() {

    this.customerValidationUIDTO.customer.driverLicenseFileId = this.customerValidationUIDTO.driverLicenseFileId;

    this.customerService.update(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.messageService.add({ 
          severity: 'info', 
          summary: 'Carteira de motorista enviada com sucesso.', 
          detail: 'Carteira de motorista enviada com sucesso. Aguarde a aprovação por parte da nossa equipe. Você será notificado assim que a aprovação for concluída. Aguarde 10 segundos para carregar o próximo passo.'
        });

        this.customerValidationUIDTO.divButtonDriverLicense = true;

        setTimeout(() => {
          window.location.reload();
        }, 10000);

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar Carteira de motorista, tente novamente mais tarde.' });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  toggleApprovalMessageDriverLicense() {
    this.customerValidationUIDTO.showApprovalMessageDriverLicense = !this.customerValidationUIDTO.showApprovalMessageDriverLicense;
  }

  // Foto do perfil
  uploadHandlerProfilePicture(event: any) {

    this.fileUploadProfilePicture.disabled = true;

    this.userService.upload(event.files[0]).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.body != null) {
          this.customerValidationUIDTO.user.photoFileId = data.body.fileId;
        }

        this.messageService.add({ 
          severity: 'info', 
          summary: 'Foto do perfil enviada com sucesso.', 
          detail: 'Foto do perfil enviada com sucesso. Aguarde a aprovação por parte da nossa equipe. Você será notificado assim que a aprovação for concluída.'
        });

        setTimeout(() => {
          window.location.reload();
        }, 10000);

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar Foto do perfil, tente novamente mais tarde.' });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  toggleApprovalMessageProfilePicture() {
    this.customerValidationUIDTO.showApprovalMessageProfilePicture = !this.customerValidationUIDTO.showApprovalMessageProfilePicture;
  }
}