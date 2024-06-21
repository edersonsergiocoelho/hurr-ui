import { Component } from '@angular/core';
import { EarningsResumeUIDTO } from './dto/earnings-resume-dto-ui.dto';
import { CustomerVehicleBookingService } from 'src/app/global/page/customer-vehicle-booking/service/customer-vehicle-booking.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleBookingSearchDTO } from 'src/app/global/page/customer-vehicle-booking/dto/customer-vehicle-booking-search-dto.dto';
import { CustomerBankAccountService } from 'src/app/page/customer-bank-account/service/customer-bank-account.service';
import { PaymentMethodService } from 'src/app/page/admin/payment-method/service/payment-method.service';
import { CustomerWithdrawalRequestService } from 'src/app/global/page/customer-withdrawal-request/service/customer-withdrawal-request.service';
import { CustomerWithdrawalRequest } from 'src/app/global/page/customer-withdrawal-request/entity/customer-withdrawal-request.entity';
import { PaymentStatusService } from 'src/app/page/admin/payment-status/service/payment-status.service';

@Component({
  selector: 'app-earnings-resume',
  templateUrl: './earnings-resume.component.html',
  styleUrls: ['./earnings-resume.component.css']
})
export class EarningsResumeComponent {

  earningsResumeUIDTO: EarningsResumeUIDTO;

  constructor(
    private customerBankAccountService: CustomerBankAccountService,
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private customerWithdrawalRequestService: CustomerWithdrawalRequestService,
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
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
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
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
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
        
      const customerBankAccountServiceFindAll = await firstValueFrom(this.customerBankAccountService.findAll().pipe(first()));
      
      if (customerBankAccountServiceFindAll.status == 200 && customerBankAccountServiceFindAll.body != null) {
        this.earningsResumeUIDTO.customerBankAccounts = customerBankAccountServiceFindAll.body;
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

    let customerWithdrawalRequests: Array<CustomerWithdrawalRequest> = new Array<CustomerWithdrawalRequest>;

    this.earningsResumeUIDTO.customerVehicleBookings.forEach((customerVehicleBooking: any) => {

      let customerWithdrawalRequest: CustomerWithdrawalRequest = new CustomerWithdrawalRequest();
      
      customerWithdrawalRequest.customer = this.earningsResumeUIDTO.selectedCustomerBankAccount.customer;
      customerWithdrawalRequest.customerBankAccount = this.earningsResumeUIDTO.selectedCustomerBankAccount;
      customerWithdrawalRequest.paymentMethod = this.earningsResumeUIDTO.selectedPaymentMethod;
      customerWithdrawalRequest.paymentStatus = this.earningsResumeUIDTO.paymentStatus;
      customerWithdrawalRequest.customerVehicleBooking = customerVehicleBooking;

      customerWithdrawalRequests.push(customerWithdrawalRequest);
    });

    this.customerWithdrawalRequestService.saveAll(customerWithdrawalRequests).pipe(first()).subscribe({
      next: (data: any) => {
        if (data.status == 201) {
          this.messageService.add({
            severity: SeverityConstants.INFO,
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