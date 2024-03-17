import { Component, OnInit } from '@angular/core';
import { CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO } from './dto/customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { CustomerVehicleBooking } from '../../entity/customer-vehicle-booking.entity';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DecimalPipeService } from 'src/app/utils/service/rate-utils-service copy';

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
    private decimalPipeService: DecimalPipeService,
    private dynamicDialogConfig: DynamicDialogConfig,
    private translateService: TranslateService
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

  }
}