import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerVehicleBookingSearchUIDTO } from './dto/customer-vehicle-booking-search-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { CustomerVehicleBooking } from '../../entity/customer-vehicle-booking.entity';
import { CustomerService } from '../../../customer/service/customer.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { CustomerVehicleBookingSearchDTO } from '../../dto/customer-vehicle-booking-search-dto.dto';
import { CustomerVehicleReviewService } from '../../../customer-vehicle-review/service/customer-vehicle-review.service';
import { CustomerVehicleReview } from '../../../customer-vehicle-review/entity/customer-vehicle-review.entity';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DecimalPipeService } from 'src/app/utils/service/decimal-utils-service';

@Component({
  selector: 'app-customer-vehicle-booking-search',
  templateUrl: './customer-vehicle-booking-search.component.html',
  styleUrls: ['./customer-vehicle-booking-search.component.css']
})
export class CustomerVehicleBookingSearchComponent implements OnInit {

  // DTO's
  customerVehicleBookingSearchUIDTO: CustomerVehicleBookingSearchUIDTO;

  // Utils
  decimalPipe: DecimalPipeService;

  // Componentes
  @ViewChild('overlayPanelWriteAReview') overlayPanelWriteAReview: OverlayPanel;

  constructor(
    private customerService: CustomerService,
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private customerVehicleReviewService: CustomerVehicleReviewService,
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

    this.customerVehicleBookingSearchUIDTO.customerVehicleReview = new CustomerVehicleReview();

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
        'save_message_service_Generic',
        'save_success_write_a_review_message_service_CustomerVehicleBookingSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleBookingSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.label_created_date_option_1_CustomerVehicleBookingSearch = translations['label_created_date_option_1_CustomerVehicleBookingSearch'];
      this.customerVehicleBookingSearchUIDTO.label_created_date_option_2_CustomerVehicleBookingSearch = translations['label_created_date_option_2_CustomerVehicleBookingSearch'];
      this.customerVehicleBookingSearchUIDTO.save_message_service_Generic = translations['save_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.save_success_write_a_review_message_service_CustomerVehicleBookingSearch = translations['save_success_write_a_review_message_service_CustomerVehicleBookingSearch'];

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

    this.ngxSpinnerService.hide();
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

  search(event: DataViewLazyLoadEvent | null) {

    this.ngxSpinnerService.show();

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

          this.messageService.add({ 
            severity: 'error', 
            summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
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

  paginate(event: any) {
    this.customerVehicleBookingSearchUIDTO.size = event.rows;
    this.customerVehicleBookingSearchUIDTO.page = event.first / event.rows;
  }

  clickOverlayPanelWriteAReview(event: any, customerVehicleBooking: any) {

    this.customerVehicleReviewService.findByCustomerVehicleIdAndCustomerId(customerVehicleBooking.customerVehicle.customerVehicleId, customerVehicleBooking.customer.customerId).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200 && data.body != null) {

          customerVehicleBooking.customerVehicleReviewId = data.body.customerVehicleReviewId;
          customerVehicleBooking.review = data.body.review;
          customerVehicleBooking.rating = data.body.rating;

          if (this.overlayPanelWriteAReview.overlayVisible) {
            this.overlayPanelWriteAReview.hide();
          } else {
            this.overlayPanelWriteAReview.show(event);
          }
        }

      },
      error: (error) => {

        if (error.status == 404) {

          if (this.overlayPanelWriteAReview.overlayVisible) {
            this.overlayPanelWriteAReview.hide();
          } else {
            this.overlayPanelWriteAReview.show(event);
          }
        }

        if (error.status == 500) {

          this.messageService.add({ 
            severity: 'error', 
            summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
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

  onClickWriteAReview(customerVehicleBooking: any) {

    this.ngxSpinnerService.show();

    this.customerVehicleBookingSearchUIDTO.customerVehicleReview.customerVehicleBooking = customerVehicleBooking;
    this.customerVehicleBookingSearchUIDTO.customerVehicleReview.customer = customerVehicleBooking.customer;
    this.customerVehicleBookingSearchUIDTO.customerVehicleReview.review = customerVehicleBooking.review;
    this.customerVehicleBookingSearchUIDTO.customerVehicleReview.rating = customerVehicleBooking.rating;

    if (customerVehicleBooking.customerVehicleReviewId == null) {

      this.customerVehicleReviewService.save(this.customerVehicleBookingSearchUIDTO.customerVehicleReview).pipe(first()).subscribe({
        next: (data: any) => {
  
          if (data.status == 201) {
  
            this.messageService.add({ 
              severity: 'success', 
              summary: '' + this.customerVehicleBookingSearchUIDTO.save_message_service_Generic, 
              detail: '' +  this.customerVehicleBookingSearchUIDTO.save_success_write_a_review_message_service_CustomerVehicleBookingSearch, 
            });
  
            this.overlayPanelWriteAReview.hide();
          }
  
        },
        error: (error) => {
  
          if (error.status == 500) {
  
            this.messageService.add({ 
              severity: 'error', 
              summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
              detail: error.error.message 
            });
          }
  
          this.ngxSpinnerService.hide();
        },
        complete: () => {
          this.resetForm();
          this.search(null);
          this.ngxSpinnerService.hide();
        }
      });

    } else {

      this.customerVehicleBookingSearchUIDTO.customerVehicleReview.customerVehicleReviewId = customerVehicleBooking.customerVehicleReviewId;

      this.customerVehicleReviewService.update(this.customerVehicleBookingSearchUIDTO.customerVehicleReview).pipe(first()).subscribe({
        next: (data: any) => {

          if (data.status == 200) {

            this.messageService.add({ 
              severity: 'success', 
              summary: '' + this.customerVehicleBookingSearchUIDTO.save_message_service_Generic, 
              detail: '' +  this.customerVehicleBookingSearchUIDTO.save_success_write_a_review_message_service_CustomerVehicleBookingSearch, 
            });

            this.overlayPanelWriteAReview.hide();
          }

        },
        error: (error) => {

          if (error.status == 500) {

            this.messageService.add({ 
              severity: 'error', 
              summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
              detail: error.error.message 
            });
          }

          this.ngxSpinnerService.hide();
        },
        complete: () => {
          this.resetForm();
          this.search(null);
          this.ngxSpinnerService.hide();
        }
      });
    }
  }
}