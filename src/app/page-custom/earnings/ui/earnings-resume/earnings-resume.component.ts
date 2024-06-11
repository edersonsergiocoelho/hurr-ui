import { Component } from '@angular/core';
import { EarningsResumeUIDTO } from './dto/earnings-resume-dto-ui.dto';
import { CustomerVehicleBookingService } from 'src/app/global/page/customer-vehicle-booking/service/customer-vehicle-booking.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleBookingSearchDTO } from 'src/app/global/page/customer-vehicle-booking/dto/customer-vehicle-booking-search-dto.dto';
import { CustomerWithdrawalRequestService } from 'src/app/global/page/customer-withdrawal-request/service/customer-withdrawal-request.service';

@Component({
  selector: 'app-earnings-resume',
  templateUrl: './earnings-resume.component.html',
  styleUrls: ['./earnings-resume.component.css']
})
export class EarningsResumeComponent {

  earningsResumeUIDTO: EarningsResumeUIDTO;

  constructor(
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private customerWithdrawalRequestService: CustomerWithdrawalRequestService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
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
        severity: 'error', 
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
        severity: 'error', 
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
        severity: 'error', 
        summary: '' + this.earningsResumeUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }
  
    this.ngxSpinnerService.hide();
  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}