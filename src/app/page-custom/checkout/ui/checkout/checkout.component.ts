import { Component, OnInit } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CheckoutUIDTO } from './dto/checkout-ui-dto.dto';
import { AddressRegisterDynamicDialogComponent } from 'src/app/global/page/address/ui/address-register-dynamic-dialog/address-register-dynamic-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { CustomerVehicleService } from 'src/app/global/page/customer-vehicle/service/customer-vehicle.service';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';
import * as moment from 'moment';
import { DecimalPipeService } from 'src/app/utils/service/rate-utils-service copy';
import { CustomerAddressService } from 'src/app/global/page/customer-address/service/customer-address.service';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { CustomerAddress } from 'src/app/global/page/customer-address/entity/customer-address.entity';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    DialogService
  ]
})
export class CheckoutComponent implements OnInit {

  checkoutUIDTO: CheckoutUIDTO;

  constructor(
    private customerService: CustomerService,
    private customerAddressService: CustomerAddressService,
    private customerVehicleService: CustomerVehicleService,
    private decimalPipeService: DecimalPipeService,
    private dialogService: DialogService,
    private location: Location,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private rateUtilsService: RateUtilsService,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.checkoutUIDTO = new CheckoutUIDTO();

    const state = this.location.getState() as any;
    
    if (state != null) {

      this.checkoutUIDTO.customerVehicleId = state.customerVehicleId;

      this.checkoutUIDTO.dateInit = state.dateInit;
      this.checkoutUIDTO.selectedHourInit = state.selectedHourInit;
      this.checkoutUIDTO.dateEnd = state.dateEnd;
      this.checkoutUIDTO.selectedHourEnd = state.selectedHourEnd;

      this.checkoutUIDTO.dateCancelFree = new Date(this.checkoutUIDTO.dateInit);
      this.checkoutUIDTO.dateCancelFree.setDate(this.checkoutUIDTO.dateCancelFree.getDate() - 1);
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'header_Address_Checkout'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.checkoutUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.checkoutUIDTO.header_Address_Checkout = translations['header_Address_Checkout'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.checkoutUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const resultCustomerVehicleServiceGetCustomerVehicleById = await firstValueFrom(this.customerVehicleService.getCustomerVehicleById(this.checkoutUIDTO.customerVehicleId).pipe(first()));

      if (resultCustomerVehicleServiceGetCustomerVehicleById.status == 200) {

        if (resultCustomerVehicleServiceGetCustomerVehicleById.body != null) {
          this.checkoutUIDTO.customerVehicle = resultCustomerVehicleServiceGetCustomerVehicleById.body;

          this.checkoutUIDTO.totalBookingValue = this.rateUtilsService.calculateTotalRate(this.checkoutUIDTO.dateInit, this.checkoutUIDTO.dateEnd, this.checkoutUIDTO.customerVehicle.dailyRate);
          this.checkoutUIDTO.totalBookingValueFormat = this.decimalPipeService.formatR$(this.checkoutUIDTO.totalBookingValue);

          const dateInit = moment(this.checkoutUIDTO.dateInit);
          const dateEnd = moment(this.checkoutUIDTO.dateEnd);

          this.checkoutUIDTO.days = dateEnd.diff(dateInit, 'days');

          this.checkoutUIDTO.dailyRateFormat = this.rateUtilsService.formatDailyRateWithComma(this.checkoutUIDTO.customerVehicle.dailyRate);
        }
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.checkoutUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {

      const currentUser = this.sessionStorageService.getUser();
      const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

      if (resultCustomerFindByEmail != null) {

        if (resultCustomerFindByEmail.body != null) {

          this.checkoutUIDTO.customer = resultCustomerFindByEmail.body;

          const resultCustomerAddressServiceFindByCustomerId = await firstValueFrom(this.customerAddressService.findByCustomerId(resultCustomerFindByEmail.body.customerId).pipe(first()));

          if (resultCustomerAddressServiceFindByCustomerId.status == 200) {
    
            if (resultCustomerAddressServiceFindByCustomerId.body != null) {
              this.checkoutUIDTO.customersAddresses = resultCustomerAddressServiceFindByCustomerId.body;
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.checkoutUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    this.ngxSpinnerService.hide();
  }

  newAddressRegisterDynamicDialog(): void {
    const ref = this.dialogService.open(AddressRegisterDynamicDialogComponent, {
      header: '' + this.checkoutUIDTO.header_Address_Checkout,
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow-y': 'auto' },
      baseZIndex: 10000,
      style: { 'max-height': '90%', 'overflow-y': 'auto' },
      closable: true,
      data: {
        newRegister: true
      }
    });
  
    ref.onClose.subscribe((result: any) => {

    });
  }

  editAddressRegisterDynamicDialog(customerAddress: CustomerAddress): void {
    const ref = this.dialogService.open(AddressRegisterDynamicDialogComponent, {
      header: '' + this.checkoutUIDTO.header_Address_Checkout,
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow-y': 'auto' },
      baseZIndex: 10000,
      style: { 'max-height': '90%', 'overflow-y': 'auto' },
      closable: true,
      data: {
        newRegister: false,
        customerAddress: customerAddress
      }
    });
  
    ref.onClose.subscribe((result: any) => {

      this.customerAddressService.findByCustomerId(this.checkoutUIDTO.customer.customerId).pipe(first()).subscribe({
        next: (data: any) => {

          if (data.status == 200) {
            this.checkoutUIDTO.customersAddresses = data.body;
          }
        },
        error: (error) => {

          if (error.status == 500) {

            this.messageService.add({ 
              severity: 'error', 
              summary: '' + this.checkoutUIDTO.error_message_service_Generic,
              detail: error.toString() 
            });
          }
  
          this.ngxSpinnerService.hide();
        },
        complete: () => {
          this.ngxSpinnerService.hide();
        }
      });
      
    });
  }
}