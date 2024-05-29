import { Component, OnInit } from '@angular/core';
import { EarningsUIDTO } from '../dto/earnings-ui.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleBookingService } from 'src/app/global/page/customer-vehicle-booking/service/customer-vehicle-booking.service';
import { CustomerVehicleBookingSearchDTO } from 'src/app/global/page/customer-vehicle-booking/dto/customer-vehicle-booking-search-dto.dto';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {

  earningsUIDTO: EarningsUIDTO;

  withdrawableBalance: any;

  constructor(
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.earningsUIDTO = new EarningsUIDTO();

    this.earningsUIDTO.customerVehicleBookingSearchDTO = new CustomerVehicleBookingSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.earningsUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];

    } catch (error: any) {

      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {
        
      const customerVehicleBookingServiceSumCustomerVehicleTotalBookingValue = await firstValueFrom(this.customerVehicleBookingService.sumCustomerVehicleTotalBookingValue(this.earningsUIDTO.customerVehicleBookingSearchDTO).pipe(first()));
      
      if (customerVehicleBookingServiceSumCustomerVehicleTotalBookingValue.status == 200 && customerVehicleBookingServiceSumCustomerVehicleTotalBookingValue.body != null) {
        debugger;
        this.earningsUIDTO.totalBookingValue = customerVehicleBookingServiceSumCustomerVehicleTotalBookingValue.body;
      }
      
    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.earningsUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }
  
    this.ngxSpinnerService.hide();
  }

  clickWithdrawMoney() {

  }
}