import { Component, OnInit } from '@angular/core';
import { CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO } from './dto/customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { CustomerVehicleBooking } from '../../entity/customer-vehicle-booking.entity';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DecimalPipeService } from 'src/app/utils/service/decimal-utils-service';

@Component({
  selector: 'app-customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog',
  templateUrl: './customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog.component.html',
  styleUrls: ['./customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog.component.css']
})
export class CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent implements OnInit {

  customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO: CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO;

  // Utils
  decimalPipe: DecimalPipeService;

  constructor(
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private decimalPipeService: DecimalPipeService,
    private dynamicDialogConfig: DynamicDialogConfig,
    private translateService: TranslateService,
    private ngxSpinnerService: NgxSpinnerService,
    private messageService: MessageService
  ) { 
    this.decimalPipe = decimalPipeService;
  }

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO = new CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO();
    this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking = new CustomerVehicleBooking();

    this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking = this.dynamicDialogConfig.data.customerVehicleBooking;
  
    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.ngxSpinnerService.hide();
  }

  changeBookingEndKM() {

    let subtractBookingKM = this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking.bookingEndKM - this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking.bookingStartKM;

    if (subtractBookingKM > this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking.customerVehicle.limitedMileageIncluded) {
      this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.limitedMileageTotalKM = this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking.bookingEndKM - this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking.bookingStartKM - this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking.customerVehicle.limitedMileageIncluded;
      this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.limitedMileageTotalValue = this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.limitedMileageTotalKM * this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking.customerVehicle.limitedMileageValue;
    } else{
      this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.limitedMileageTotalKM = 0;
      this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.limitedMileageTotalValue = 0;
    }
  }

  finalizeBooking() {

    this.customerVehicleBookingService.finalizeBooking(this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.customerVehicleBooking).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {

          this.messageService.add({ 
            severity: 'success', 
            summary: '' + this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.error_message_service_Generic, 
            detail: '' +  this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.error_message_service_Generic, 
          });
        }

      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({ 
            severity: 'error', 
            summary: '' + this.customerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO.error_message_service_Generic, 
            detail: error.error.message 
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