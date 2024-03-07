import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { MpPaymentService } from 'src/app/page-custom/mercado-pago/service/payment/mp-payment.service';
import { CustomerVehicleBookingSuccessUIDTO } from './dto/customer-vehicle-booking-sucess-ui-dto.dto';
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { CustomerVehicleService } from '../../../customer-vehicle/service/customer-vehicle.service';
import { MpPreferenceService } from 'src/app/page-custom/mercado-pago/service/preference/mp-preference.service';
import { DecimalPipeService } from 'src/app/utils/service/rate-utils-service copy';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-vehicle-booking-success',
  templateUrl: './customer-vehicle-booking-success.component.html',
  styleUrls: ['./customer-vehicle-booking-success.component.css']
})
export class CustomerVehicleBookingSuccessComponent implements OnInit {

  customerVehicleBookingSuccessUIDTO: CustomerVehicleBookingSuccessUIDTO;

  decimalPipe: DecimalPipeService;

  constructor(
    private route: ActivatedRoute,
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private decimalPipeService: DecimalPipeService,
    private ngxSpinnerService: NgxSpinnerService,
    private mpPaymentService: MpPaymentService,
    private mpPreferenceService: MpPreferenceService,
    private messageService: MessageService,
    private rateUtilsService: RateUtilsService,
    private translateService: TranslateService
  ) { 
    this.decimalPipe = decimalPipeService;
  }

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleBookingSuccessUIDTO = new CustomerVehicleBookingSuccessUIDTO();

    this.route.queryParams.subscribe(params => {

      this.customerVehicleBookingSuccessUIDTO.collectionId = params['collection_id'];
      this.customerVehicleBookingSuccessUIDTO.collectionStatus = params['collection_status'];
      this.customerVehicleBookingSuccessUIDTO.paymentId = params['payment_id'];
      this.customerVehicleBookingSuccessUIDTO.status = params['status'];
      this.customerVehicleBookingSuccessUIDTO.externalReference = params['external_reference'];
      this.customerVehicleBookingSuccessUIDTO.paymentType = params['payment_type'];
      this.customerVehicleBookingSuccessUIDTO.merchantOrderId = params['merchant_order_id'];
      this.customerVehicleBookingSuccessUIDTO.preferenceId = params['preference_id'];
      this.customerVehicleBookingSuccessUIDTO.siteId = params['site_id'];
      this.customerVehicleBookingSuccessUIDTO.processingMode = params['processing_mode'];
      this.customerVehicleBookingSuccessUIDTO.merchantAccountId = params['merchant_account_id'];
    });

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleBookingSuccessUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleBookingSuccessUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const resultMpPaymentServiceFindById = await firstValueFrom(this.mpPaymentService.findById(this.customerVehicleBookingSuccessUIDTO.paymentId).pipe(first()));

      if (resultMpPaymentServiceFindById.status == 200) {

        if (resultMpPaymentServiceFindById.body != null) {

          this.customerVehicleBookingSuccessUIDTO.payment = resultMpPaymentServiceFindById.body;

          this.customerVehicleBookingSuccessUIDTO.paymentMetadata = resultMpPaymentServiceFindById.body.metadata;

          if (this.customerVehicleBookingSuccessUIDTO.paymentMetadata !== null) {
            const {
              booking_end_date,
              booking_end_time,
              booking_start_date,
              booking_start_time,
              customer_id,
              customer_vehicle_id,
              preference_id,
              total_booking_value
            } = this.customerVehicleBookingSuccessUIDTO.paymentMetadata;
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.customerVehicleBookingSuccessUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {

      if (this.customerVehicleBookingSuccessUIDTO.preferenceId != null) {

        const resultMpPreferenceServiceFindById = await firstValueFrom(this.mpPreferenceService.findById(this.customerVehicleBookingSuccessUIDTO.preferenceId).pipe(first()));
  
        if (resultMpPreferenceServiceFindById.status == 200) {
  
          if (resultMpPreferenceServiceFindById.body != null) {
  
            this.customerVehicleBookingSuccessUIDTO.preference = resultMpPreferenceServiceFindById.body;
  
            this.customerVehicleBookingSuccessUIDTO.preferenceMetadata = resultMpPreferenceServiceFindById.body.metadata;
  
            if (this.customerVehicleBookingSuccessUIDTO.preferenceMetadata !== null) {
              const {
                booking_end_date,
                booking_end_time,
                booking_start_date,
                booking_start_time,
                customer_id,
                customer_vehicle_id,
                customer_vehicle_booking_id,
                preference_id,
                total_booking_value
              } = this.customerVehicleBookingSuccessUIDTO.preferenceMetadata;
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.customerVehicleBookingSuccessUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {

      const resultCustomerVehicleBookingServiceFindById = await firstValueFrom(this.customerVehicleBookingService.findById(this.customerVehicleBookingSuccessUIDTO.preferenceMetadata.customerVehicleBookingId).pipe(first()));

      if (resultCustomerVehicleBookingServiceFindById.status == 200) {

        if (resultCustomerVehicleBookingServiceFindById.body != null) {
          this.customerVehicleBookingSuccessUIDTO.customerVehicleBooking = resultCustomerVehicleBookingServiceFindById.body;

          const bookingStartDate = moment(this.customerVehicleBookingSuccessUIDTO.customerVehicleBooking.bookingStartDate);
          const bookingEndDate = moment(this.customerVehicleBookingSuccessUIDTO.customerVehicleBooking.bookingEndDate);

          this.customerVehicleBookingSuccessUIDTO.days = bookingEndDate.diff(bookingStartDate, 'days');
        }
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.customerVehicleBookingSuccessUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }
  }
}