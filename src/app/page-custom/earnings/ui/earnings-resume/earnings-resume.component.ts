import { Component } from '@angular/core';
import { EarningsResumeUIDTO } from './dto/earnings-resume-dto-ui.dto';
import { CustomerVehicleBookingService } from 'src/app/global/page/customer-vehicle-booking/service/customer-vehicle-booking.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleBookingSearchDTO } from 'src/app/global/page/customer-vehicle-booking/dto/customer-vehicle-booking-search-dto.dto';
import { CustomerVehicleBankAccountService } from 'src/app/page/customer-vehicle-bank-account/service/customer-vehicle-bank-account.service';
import { PaymentMethodService } from 'src/app/page/admin/payment-method/service/payment-method.service';
import { PaymentStatusService } from 'src/app/page/admin/payment-status/service/payment-status.service';
import { CustomerVehicleWithdrawalRequestService } from 'src/app/global/page/customer-vehicle-withdrawal-request/service/customer-vehicle-withdrawal-request.service';
import { CustomerVehicleWithdrawalRequest } from 'src/app/global/page/customer-vehicle-withdrawal-request/entity/customer-vehicle-withdrawal-request.entity';

@Component({
  selector: 'app-earnings-resume',
  templateUrl: './earnings-resume.component.html',
  styleUrls: ['./earnings-resume.component.css']
})
export class EarningsResumeComponent {

  earningsResumeUIDTO: EarningsResumeUIDTO;

  constructor(
    private customerVehicleBankAccountService: CustomerVehicleBankAccountService,
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private customerVehicleWithdrawalRequestService: CustomerVehicleWithdrawalRequestService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private paymentMethodService: PaymentMethodService,
    private paymentStatusService: PaymentStatusService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.earningsResumeUIDTO = new EarningsResumeUIDTO();

    this.earningsResumeUIDTO.customerVehicleBookingSearchDTO = new CustomerVehicleBookingSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.earningsResumeUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];

    } catch (error: any) {

      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {
        
      const customerVehicleBookingServiceSumCustomerVehicleTotalEarnings = await firstValueFrom(this.customerVehicleBookingService.sumCustomerVehicleTotalEarnings(this.earningsResumeUIDTO.customerVehicleBookingSearchDTO).pipe(first()));
      
      if (customerVehicleBookingServiceSumCustomerVehicleTotalEarnings.status == 200 && customerVehicleBookingServiceSumCustomerVehicleTotalEarnings.body != null) {
        this.earningsResumeUIDTO.totalEarnings = customerVehicleBookingServiceSumCustomerVehicleTotalEarnings.body;
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR,
        summary: this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {
        
      const customerVehicleBookingServiceSumCustomerVehicleWithdrawableCurrentBalance = await firstValueFrom(this.customerVehicleBookingService.sumCustomerVehicleWithdrawableCurrentBalance(this.earningsResumeUIDTO.customerVehicleBookingSearchDTO).pipe(first()));
      
      if (customerVehicleBookingServiceSumCustomerVehicleWithdrawableCurrentBalance.status == 200 && customerVehicleBookingServiceSumCustomerVehicleWithdrawableCurrentBalance.body != null) {
        this.earningsResumeUIDTO.withdrawableCurrentBalance = customerVehicleBookingServiceSumCustomerVehicleWithdrawableCurrentBalance.body;
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {
        
      const customerVehicleBookingServiceSumCustomerVehicleWithdrawableBalance = await firstValueFrom(this.customerVehicleBookingService.sumCustomerVehicleWithdrawableBalance(this.earningsResumeUIDTO.customerVehicleBookingSearchDTO).pipe(first()));
      
      if (customerVehicleBookingServiceSumCustomerVehicleWithdrawableBalance.status == 200 && customerVehicleBookingServiceSumCustomerVehicleWithdrawableBalance.body != null) {
        this.earningsResumeUIDTO.withdrawableBalance = customerVehicleBookingServiceSumCustomerVehicleWithdrawableBalance.body;
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {
        
      const paymentMethodServiceFindAll = await firstValueFrom(this.paymentMethodService.findAll().pipe(first()));
      
      if (paymentMethodServiceFindAll.status == 200 && paymentMethodServiceFindAll.body != null) {
        this.earningsResumeUIDTO.paymentMethods = paymentMethodServiceFindAll.body;
        for (let paymentMethod of this.earningsResumeUIDTO.paymentMethods) {
          if (paymentMethod.file != null) {
            paymentMethod.dataURI = `data:${paymentMethod.file.contentType};base64,${paymentMethod.file.dataAsByteArray}`;
          }
        }
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {
        
      const paymentStatusServiceFindByPaymentStatusName = await firstValueFrom(this.paymentStatusService.findByPaymentStatusName("PENDING").pipe(first()));
      
      if (paymentStatusServiceFindByPaymentStatusName.status == 200 && paymentStatusServiceFindByPaymentStatusName.body != null) {
        this.earningsResumeUIDTO.paymentStatus = paymentStatusServiceFindByPaymentStatusName.body;
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {
        
      const customerVehicleBankAccountServiceFindAll = await firstValueFrom(this.customerVehicleBankAccountService.findAll().pipe(first()));
      
      if (customerVehicleBankAccountServiceFindAll.status == 200 && customerVehicleBankAccountServiceFindAll.body != null) {
        this.earningsResumeUIDTO.customerVehicleBankAccounts = customerVehicleBankAccountServiceFindAll.body;

        for (let customerVehicleBankAccount of this.earningsResumeUIDTO.customerVehicleBankAccounts) {
          if (customerVehicleBankAccount.bank.file != null) {
            customerVehicleBankAccount.bank.dataURI = `data:${customerVehicleBankAccount.bank.file.contentType};base64,${customerVehicleBankAccount.bank.file.dataAsByteArray}`;
          }
        }
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {
      
      const customerVehicleBookingServiceFindByCustomerVehicleWithdrawableBalance = await firstValueFrom(this.customerVehicleBookingService.findByCustomerVehicleWithdrawableBalance().pipe(first()));
      
      if (customerVehicleBookingServiceFindByCustomerVehicleWithdrawableBalance.status == 200 && customerVehicleBookingServiceFindByCustomerVehicleWithdrawableBalance.body != null) {
        this.earningsResumeUIDTO.customerVehicleBookings = customerVehicleBookingServiceFindByCustomerVehicleWithdrawableBalance.body;
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }
  
    this.ngxSpinnerService.hide();
  }

  showDialog() {
      this.earningsResumeUIDTO.visibleDialog = true;
  }

  nextStepDialog() {
    this.earningsResumeUIDTO.stepDialog++;
  }

  previousStepDialog() {
    this.earningsResumeUIDTO.stepDialog--;
  }

  ngModelChangeSelectAllCustomerVehicleBookings() {

    if (this.earningsResumeUIDTO.selectAllCustomerVehicleBookings) {
        this.earningsResumeUIDTO.selectedCustomerVehicleBookings = [...this.earningsResumeUIDTO.customerVehicleBookings];
    } else {
        this.earningsResumeUIDTO.selectedCustomerVehicleBookings = [];
    }
  }

  ngModelChangeSelectedCustomerVehicleBookings() {

    const selectedLength = this.earningsResumeUIDTO.selectedCustomerVehicleBookings.length;
    const totalLength = this.earningsResumeUIDTO.customerVehicleBookings.length;

    this.earningsResumeUIDTO.selectAllCustomerVehicleBookings = selectedLength === totalLength;
  }

  requestMoney() {

    if (!this.earningsResumeUIDTO.customerVehicleBookings || this.earningsResumeUIDTO.customerVehicleBookings.length === 0) {
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: 'Erro',
          detail: 'Nenhuma reserva selecionada para solicitação de retirada.'
        });
        return;
    }

    this.ngxSpinnerService.show();

    let customerVehicleWithdrawalRequests: Array<CustomerVehicleWithdrawalRequest> = new Array<CustomerVehicleWithdrawalRequest>;

    this.earningsResumeUIDTO.customerVehicleBookings.forEach((customerVehicleBooking: any) => {

      let customerVehicleWithdrawalRequest: CustomerVehicleWithdrawalRequest = new CustomerVehicleWithdrawalRequest();
      
      customerVehicleWithdrawalRequest.customer = this.earningsResumeUIDTO.selectedCustomerVehicleBankAccount.customer;
      customerVehicleWithdrawalRequest.customerVehicleBankAccount = this.earningsResumeUIDTO.selectedCustomerVehicleBankAccount;
      customerVehicleWithdrawalRequest.paymentMethod = this.earningsResumeUIDTO.selectedPaymentMethod;
      customerVehicleWithdrawalRequest.paymentStatus = this.earningsResumeUIDTO.paymentStatus;
      customerVehicleWithdrawalRequest.customerVehicleBooking = customerVehicleBooking;

      customerVehicleWithdrawalRequests.push(customerVehicleWithdrawalRequest);
    });

    this.customerVehicleWithdrawalRequestService.saveAll(customerVehicleWithdrawalRequests).pipe(first()).subscribe({
      next: (data: any) => {
        if (data.status == 201) {
          this.messageService.add({
            severity: SeverityConstants.SUCCESS,
            summary: 'Solicitação de retirada concluída',
            detail: 'A solicitação de retirada foi realizada com sucesso.'
          });
        }
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({
            severity: SeverityConstants.ERROR,
            summary: 'Erro',
            detail: 'Erro ao solicitar retirada, tente novamente mais tarde.'
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