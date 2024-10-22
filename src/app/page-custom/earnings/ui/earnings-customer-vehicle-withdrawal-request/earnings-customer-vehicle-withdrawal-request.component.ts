import { Component, OnInit } from '@angular/core';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { first, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { EarningsCustomerVehicleWithdrawalRequestUIDTO } from './dto/earnings-customer-vehicle-withdrawal-request-ui-dto.dto';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { CustomerVehicleWithdrawalRequestService } from 'src/app/global/page/customer-vehicle-withdrawal-request/service/customer-vehicle-withdrawal-request.service';
import { CustomerVehicleWithdrawalRequestSearchDTO } from 'src/app/global/page/customer-vehicle-withdrawal-request/dto/customer-vehicle-withdrawal-request-search-dto.dto';

@Component({
  selector: 'app-earnings-customer-vehicle-withdrawal-request',
  templateUrl: './earnings-customer-vehicle-withdrawal-request.component.html',
  styleUrls: ['./earnings-customer-vehicle-withdrawal-request.component.css']
})
export class EarningsCustomerVehicleWithdrawalRequestComponent implements OnInit {

  earningsCustomerVehicleWithdrawalRequestUIDTO: EarningsCustomerVehicleWithdrawalRequestUIDTO;

  constructor(
    private customerVehicleWithdrawalRequestService: CustomerVehicleWithdrawalRequestService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {

    this.earningsCustomerVehicleWithdrawalRequestUIDTO = new EarningsCustomerVehicleWithdrawalRequestUIDTO();

    this.earningsCustomerVehicleWithdrawalRequestUIDTO.customerVehicleWithdrawalRequestSearchDTO = new CustomerVehicleWithdrawalRequestSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'label_created_date_option_1_EarningsCustomerVehicleWithdrawalRequest',
        'label_created_date_option_2_EarningsCustomerVehicleWithdrawalRequest'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.earningsCustomerVehicleWithdrawalRequestUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.earningsCustomerVehicleWithdrawalRequestUIDTO.label_created_date_option_1_EarningsCustomerVehicleWithdrawalRequest = translations['label_created_date_option_1_EarningsCustomerVehicleWithdrawalRequest'];
      this.earningsCustomerVehicleWithdrawalRequestUIDTO.label_created_date_option_2_EarningsCustomerVehicleWithdrawalRequest = translations['label_created_date_option_2_EarningsCustomerVehicleWithdrawalRequest'];

    } catch (error: any) {

      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsCustomerVehicleWithdrawalRequestUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortOptions = [
      { label: '' + this.earningsCustomerVehicleWithdrawalRequestUIDTO.label_created_date_option_1_EarningsCustomerVehicleWithdrawalRequest, value: 'createdDate' },
      { label: '' + this.earningsCustomerVehicleWithdrawalRequestUIDTO.label_created_date_option_2_EarningsCustomerVehicleWithdrawalRequest, value: '!createdDate' }
    ];

    this.ngxSpinnerService.hide();
  }

  search(event: DataViewLazyLoadEvent | null) {

    this.ngxSpinnerService.show();

    if (event && event.sortField) {
      this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortBy = event.sortField;
    }
    
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortDir = "ASC";
      }
    }
      
    this.customerVehicleWithdrawalRequestService.searchPage(this.earningsCustomerVehicleWithdrawalRequestUIDTO.customerVehicleWithdrawalRequestSearchDTO, this.earningsCustomerVehicleWithdrawalRequestUIDTO.page, this.earningsCustomerVehicleWithdrawalRequestUIDTO.size, this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortDir, this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {
        this.earningsCustomerVehicleWithdrawalRequestUIDTO.customerVehicleWithdrawalRequests = data.body.content;
        this.earningsCustomerVehicleWithdrawalRequestUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({ 
            severity: SeverityConstants.ERROR, 
            summary: '' + this.earningsCustomerVehicleWithdrawalRequestUIDTO.error_message_service_Generic, 
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
    this.earningsCustomerVehicleWithdrawalRequestUIDTO.size = event.rows;
    this.earningsCustomerVehicleWithdrawalRequestUIDTO.page = event.first / event.rows;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortOrder = -1;
        this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortField = value.substring(1, value.length);
    } else {
        this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortOrder = 1;
        this.earningsCustomerVehicleWithdrawalRequestUIDTO.sortField = value;
    }
  }
}