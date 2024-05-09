import { Component, OnInit } from '@angular/core';
import { CustomerVehicleBookingCustomerVehicleSearchUIDTO } from './dto/customer-vehicle-booking-customer-vehicle-search-ui-dto.dto';
import { CustomerVehicleBooking } from '../../entity/customer-vehicle-booking.entity';
import { CustomerVehicleBookingSearchDTO } from '../../dto/customer-vehicle-booking-search-dto.dto';
import { DecimalPipeService } from 'src/app/utils/service/rate-utils-service copy';
import { CustomerService } from '../../../customer/service/customer.service';
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent } from '../customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog/customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog.component';

@Component({
  selector: 'app-customer-vehicle-booking-customer-vehicle-search',
  templateUrl: './customer-vehicle-booking-customer-vehicle-search.component.html',
  styleUrls: ['./customer-vehicle-booking-customer-vehicle-search.component.css']
})
export class CustomerVehicleBookingCustomerVehicleSearchComponent implements OnInit {

  customerVehicleBookingCustomerVehicleSearchUIDTO: CustomerVehicleBookingCustomerVehicleSearchUIDTO;

  // Utils
  decimalPipe: DecimalPipeService;

  constructor(
    private customerService: CustomerService,
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private decimalPipeService: DecimalPipeService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService,
  ) {
      this.decimalPipe = decimalPipeService;
  }
  
  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleBookingCustomerVehicleSearchUIDTO = new CustomerVehicleBookingCustomerVehicleSearchUIDTO();

    this.customerVehicleBookingCustomerVehicleSearchUIDTO.customerVehicleBookings = new Array<CustomerVehicleBooking>;
    this.customerVehicleBookingCustomerVehicleSearchUIDTO.customerVehicleBookingSearchDTO = new CustomerVehicleBookingSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'label_created_date_option_1_CustomerVehicleBookingSearch',
        'label_created_date_option_2_CustomerVehicleBookingSearch',
        'header_CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialog_CustomerVehicleBookingCustomerVehicleSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleBookingCustomerVehicleSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.label_created_date_option_1_CustomerVehicleBookingSearch = translations['label_created_date_option_1_CustomerVehicleBookingSearch'];
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.label_created_date_option_2_CustomerVehicleBookingSearch = translations['label_created_date_option_2_CustomerVehicleBookingSearch'];
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.header_CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialog_CustomerVehicleBookingCustomerVehicleSearch = translations['header_CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialog_CustomerVehicleBookingCustomerVehicleSearch'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleBookingCustomerVehicleSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortOptions = [
      { label: '' + this.customerVehicleBookingCustomerVehicleSearchUIDTO.label_created_date_option_1_CustomerVehicleBookingSearch, value: '!createdDate' },
      { label: '' + this.customerVehicleBookingCustomerVehicleSearchUIDTO.label_created_date_option_2_CustomerVehicleBookingSearch, value: 'createdDate' }
    ];

    this.ngxSpinnerService.show();
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortOrder = -1;
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortField = value.substring(1, value.length);
    } else {
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortOrder = 1;
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortField = value;
    }
  }

  search(event: DataViewLazyLoadEvent) {

    if (event && event.sortField) {
      this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortDir = "ASC";
      }
    }
  
    this.customerVehicleBookingService.customerVehicleSearchPage(this.customerVehicleBookingCustomerVehicleSearchUIDTO.customerVehicleBookingSearchDTO, this.customerVehicleBookingCustomerVehicleSearchUIDTO.page, this.customerVehicleBookingCustomerVehicleSearchUIDTO.size, this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortDir, this.customerVehicleBookingCustomerVehicleSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {
        this.customerVehicleBookingCustomerVehicleSearchUIDTO.customerVehicleBookings = data.body.content;
        this.customerVehicleBookingCustomerVehicleSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: '' + this.customerVehicleBookingCustomerVehicleSearchUIDTO.error_message_service_Generic, detail: error.error.message });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  paginate(event: any) {
    this.customerVehicleBookingCustomerVehicleSearchUIDTO.size = event.rows;
    this.customerVehicleBookingCustomerVehicleSearchUIDTO.page = event.first / event.rows;
  }

  clickCustomerVehicleFinalizeBooking(customerVehicleBooking: CustomerVehicleBooking) {
    const ref = this.dialogService.open(CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent, {
      header: '' + this.customerVehicleBookingCustomerVehicleSearchUIDTO.header_CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialog_CustomerVehicleBookingCustomerVehicleSearch,
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow-y': 'auto' },
      baseZIndex: 10000,
      style: { 'max-height': '90%', 'overflow-y': 'auto' },
      closable: true,
      data: {
        customerVehicleBooking: customerVehicleBooking
      }
    });
  
    ref.onClose.subscribe((result: any) => {

    });
  }
}