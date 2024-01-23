import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CustomerValidationUUIDTO } from './dto/customer-validation-ui.dto';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { Customer } from 'src/app/global/page/customer/entity/customer.entity';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/page/user/service/user.service';
import { User } from 'src/app/page/user/entity/user.entity';
import { FileUpload, UploadEvent } from 'primeng/fileupload';
import { FileApprovedService } from 'src/app/page/admin/file-approved/service/file-approved.service';

@Component({
  selector: 'app-customer-validation',
  templateUrl: './customer-validation.component.html',
  styleUrls: ['./customer-validation.component.css']
})
export class CustomerValidationComponent implements OnInit {

  customerValidationUIDTO: CustomerValidationUUIDTO;

  @ViewChild(FileUpload) fileUpload: FileUpload;

  constructor(private messageService: MessageService,
              private ngxSpinnerService: NgxSpinnerService,

              private sessionStorageService: SessionStorageService,

              private customerService: CustomerService,
              private fileApprovedService: FileApprovedService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.resetCustomerValidationForm();
  }

  resetCustomerValidationForm () {

    this.customerValidationUIDTO = new CustomerValidationUUIDTO();

    this.customerValidationUIDTO.customer = new Customer();
    this.customerValidationUIDTO.user = new User();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    const currentUser = this.sessionStorageService.getUser();

    this.customerValidationUIDTO.user = currentUser;

    try {

      const resultCustomerFindByEmail = await firstValueFrom(this.userService.getCurrentUser().pipe(first()));

      if (resultCustomerFindByEmail.status == 200) {

        if (resultCustomerFindByEmail.body != null) {
          this.customerValidationUIDTO.customer = resultCustomerFindByEmail.body;
        }
      }

    } catch (error: any) {

      if (error.status == 404) {;

        this.messageService.add({ severity: 'warn', 
                                  summary: 'Não encontrado dados do cliente.', 
                                  detail: 'Não encontrado dados do cliente, favor seguir os passos para a validação.',
                                  life: 5000 
                                });
      }

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    try {

      const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

      if (resultCustomerFindByEmail.status == 200) {

        if (resultCustomerFindByEmail.body != null) {
          this.customerValidationUIDTO.customer = resultCustomerFindByEmail.body;
        }
      }

    } catch (error: any) {

      if (error.status == 404) {;

        this.messageService.add({ severity: 'warn', 
                                  summary: 'Não encontrado dados do cliente.', 
                                  detail: 'Não encontrado dados do cliente, favor seguir os passos para a validação.',
                                  life: 5000 
                                });
      }

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    if (this.customerValidationUIDTO.user.fileId != null) {

      try {

        const resultFileApprovedFindByFileId = await firstValueFrom(this.fileApprovedService.findByFileId(this.customerValidationUIDTO.user.fileId).pipe(first()));

        if (resultFileApprovedFindByFileId.status == 200) {

          if (resultFileApprovedFindByFileId.body != null) {
            this.customerValidationUIDTO.fileApproved = resultFileApprovedFindByFileId.body;
          }
        }

      } catch (error: any) {

        if (error.status == 404) {

          this.messageService.add({ severity: 'warn', 
                                    summary: 'Não encontrado dados do cliente.', 
                                    detail: 'Não encontrado dados do cliente, favor seguir os passos para a validação.',
                                    life: 5000 
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

    this.customerService.emailVerificationCode(this.customerValidationUIDTO.customer).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerValidationUIDTO.sendEmailVerificationCode = true;

        this.messageService.add({ severity: 'info', 
                                  summary: 'Email enviado com sucesso.', 
                                  detail: 'Email enviado com sucesso, verifique seu email.',
                                  life: 10000 });

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

        this.messageService.add({ severity: 'info', 
                                  summary: 'Email validado com sucesso.', 
                                  detail: 'Email validado com sucesso, seu email foi confirmado, aguarde recarregar a página.',
                                  life: 10000 });

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

        this.messageService.add({ severity: 'info', 
                                  summary: 'SMS enviado com sucesso.', 
                                  detail: 'SMS enviado com sucesso, verifique seu celular.',
                                  life: 10000 });

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

        this.messageService.add({ severity: 'info', 
                                  summary: 'WhatsApp enviado com sucesso.', 
                                  detail: 'WhatsApp enviado com sucesso, verifique seu celular.',
                                  life: 10000 });

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

        this.messageService.add({ severity: 'info', 
                                  summary: 'Telegram enviado com sucesso.', 
                                  detail: 'Telegram enviado com sucesso, verifique seu celular.',
                                  life: 10000 });

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

        this.messageService.add({ severity: 'info', 
                                  summary: 'Celular validado com sucesso.', 
                                  detail: 'Celular validado com sucesso, seu celular foi confirmado, aguarde recarregar a página.',
                                  life: 10000 });

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

  uploadHandler(event: any) {

    this.fileUpload.disabled = true;

    this.userService.uploadFile(event.files[0]).pipe(first()).subscribe({
      next: (data: any) => {

        this.messageService.add({ severity: 'info', 
                                  summary: 'Foto do perfil enviada com sucesso.', 
                                  detail: 'Foto do perfil enviada com sucesso, aguarde a aprovação por parte de nossa equipe.',
                                  life: 10000 });

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
}