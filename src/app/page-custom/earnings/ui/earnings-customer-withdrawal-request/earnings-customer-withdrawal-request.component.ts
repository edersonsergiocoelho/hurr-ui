import { Component, OnInit } from '@angular/core';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { first, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CustomerWithdrawalRequestService } from 'src/app/global/page/customer-withdrawal-request/service/customer-withdrawal-request.service';
import { EarningsCustomerWithdrawalRequestUIDTO } from './dto/earnings-customer-withdrawal-request-ui-dto.dto';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { CustomerWithdrawalRequestSearchDTO } from 'src/app/global/page/customer-withdrawal-request/dto/customer-withdrawal-request-search-dto.dto';

@Component({
  selector: 'app-earnings-customer-withdrawal-request',
  templateUrl: './earnings-customer-withdrawal-request.component.html',
  styleUrls: ['./earnings-customer-withdrawal-request.component.css']
})
export class EarningsCustomerWithdrawalRequestComponent implements OnInit {

  earningsCustomerWithdrawalRequestUIDTO: EarningsCustomerWithdrawalRequestUIDTO;

  constructor(
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

    this.earningsCustomerWithdrawalRequestUIDTO = new EarningsCustomerWithdrawalRequestUIDTO();

    this.earningsCustomerWithdrawalRequestUIDTO.customerWithdrawalRequestSearchDTO = new CustomerWithdrawalRequestSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'label_created_date_option_1_EarningsCustomerWithdrawalRequest',
        'label_created_date_option_2_EarningsCustomerWithdrawalRequest'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.earningsCustomerWithdrawalRequestUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.earningsCustomerWithdrawalRequestUIDTO.label_created_date_option_1_EarningsCustomerWithdrawalRequest = translations['label_created_date_option_1_EarningsCustomerWithdrawalRequest'];
      this.earningsCustomerWithdrawalRequestUIDTO.label_created_date_option_2_EarningsCustomerWithdrawalRequest = translations['label_created_date_option_2_EarningsCustomerWithdrawalRequest'];

    } catch (error: any) {

      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.earningsCustomerWithdrawalRequestUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.earningsCustomerWithdrawalRequestUIDTO.sortOptions = [
      { label: '' + this.earningsCustomerWithdrawalRequestUIDTO.label_created_date_option_1_EarningsCustomerWithdrawalRequest, value: 'createdDate' },
      { label: '' + this.earningsCustomerWithdrawalRequestUIDTO.label_created_date_option_2_EarningsCustomerWithdrawalRequest, value: '!createdDate' }
    ];

    this.ngxSpinnerService.hide();
  }

  search(event: DataViewLazyLoadEvent | null) {

    this.ngxSpinnerService.show();

    if (event && event.sortField) {
      this.earningsCustomerWithdrawalRequestUIDTO.sortBy = event.sortField;
    }
    
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.earningsCustomerWithdrawalRequestUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.earningsCustomerWithdrawalRequestUIDTO.sortDir = "ASC";
      }
    }
      
    this.customerWithdrawalRequestService.searchPage(this.earningsCustomerWithdrawalRequestUIDTO.customerWithdrawalRequestSearchDTO, this.earningsCustomerWithdrawalRequestUIDTO.page, this.earningsCustomerWithdrawalRequestUIDTO.size, this.earningsCustomerWithdrawalRequestUIDTO.sortDir, this.earningsCustomerWithdrawalRequestUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {
        this.earningsCustomerWithdrawalRequestUIDTO.customerWithdrawalRequests = data.body.content;
        this.earningsCustomerWithdrawalRequestUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({ 
            severity: SeverityConstants.ERROR, 
            summary: '' + this.earningsCustomerWithdrawalRequestUIDTO.error_message_service_Generic, 
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
    this.earningsCustomerWithdrawalRequestUIDTO.size = event.rows;
    this.earningsCustomerWithdrawalRequestUIDTO.page = event.first / event.rows;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.earningsCustomerWithdrawalRequestUIDTO.sortOrder = -1;
        this.earningsCustomerWithdrawalRequestUIDTO.sortField = value.substring(1, value.length);
    } else {
        this.earningsCustomerWithdrawalRequestUIDTO.sortOrder = 1;
        this.earningsCustomerWithdrawalRequestUIDTO.sortField = value;
    }
    console.log('onSortChange.sortOrder:' + event?.sortOrder);
    console.log('onSortChange.sortField:' + event?.sortField);
  }
}