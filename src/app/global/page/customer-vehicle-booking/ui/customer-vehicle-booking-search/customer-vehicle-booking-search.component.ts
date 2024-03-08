import { Component, OnInit } from '@angular/core';
import { CustomerVehicleBookingSearchUIDTO } from './dto/customer-vehicle-booking-search-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { CustomerVehicleBooking } from '../../entity/customer-vehicle-booking.entity';
import { DecimalPipeService } from 'src/app/utils/service/rate-utils-service copy';
import { CustomerService } from '../../../customer/service/customer.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { CustomerVehicleBookingSearchDTO } from '../../dto/customer-vehicle-booking-search-dto.dto';

@Component({
  selector: 'app-customer-vehicle-booking-search',
  templateUrl: './customer-vehicle-booking-search.component.html',
  styleUrls: ['./customer-vehicle-booking-search.component.css']
})
export class CustomerVehicleBookingSearchComponent implements OnInit {

  customerVehicleBookingSearchUIDTO: CustomerVehicleBookingSearchUIDTO;

  // Utils
  decimalPipe: DecimalPipeService;

  constructor(
    private customerService: CustomerService,
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private decimalPipeService: DecimalPipeService,
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

    this.customerVehicleBookingSearchUIDTO = new CustomerVehicleBookingSearchUIDTO();

    this.customerVehicleBookingSearchUIDTO.customerVehicleBookings = new Array<CustomerVehicleBooking>;
    this.customerVehicleBookingSearchUIDTO.customerVehicleBookingSearchDTO = new CustomerVehicleBookingSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'label_created_date_option_1_CustomerVehicleBookingSearch',
        'label_created_date_option_2_CustomerVehicleBookingSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleBookingSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.label_created_date_option_1_CustomerVehicleBookingSearch = translations['label_created_date_option_1_CustomerVehicleBookingSearch'];
      this.customerVehicleBookingSearchUIDTO.label_created_date_option_2_CustomerVehicleBookingSearch = translations['label_created_date_option_2_CustomerVehicleBookingSearch'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.customerVehicleBookingSearchUIDTO.sortOptions = [
      { label: '' + this.customerVehicleBookingSearchUIDTO.label_created_date_option_1_CustomerVehicleBookingSearch, value: '!createdDate' },
      { label: '' + this.customerVehicleBookingSearchUIDTO.label_created_date_option_2_CustomerVehicleBookingSearch, value: 'createdDate' }
    ];

    this.ngxSpinnerService.show();
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.customerVehicleBookingSearchUIDTO.sortOrder = -1;
      this.customerVehicleBookingSearchUIDTO.sortField = value.substring(1, value.length);
    } else {
      this.customerVehicleBookingSearchUIDTO.sortOrder = 1;
      this.customerVehicleBookingSearchUIDTO.sortField = value;
    }
  }

  search(event: DataViewLazyLoadEvent) {

    if (event && event.sortField) {
      this.customerVehicleBookingSearchUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.customerVehicleBookingSearchUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.customerVehicleBookingSearchUIDTO.sortDir = "ASC";
      }
    }
  
    this.customerVehicleBookingService.searchPage(this.customerVehicleBookingSearchUIDTO.customerVehicleBookingSearchDTO, this.customerVehicleBookingSearchUIDTO.page, this.customerVehicleBookingSearchUIDTO.size, this.customerVehicleBookingSearchUIDTO.sortDir, this.customerVehicleBookingSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {
        this.customerVehicleBookingSearchUIDTO.customerVehicleBookings = data.body.content;
        this.customerVehicleBookingSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, detail: error.error.message });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  paginate(event: any) {
    this.customerVehicleBookingSearchUIDTO.size = event.rows;
    this.customerVehicleBookingSearchUIDTO.page = event.first / event.rows;
  }
}