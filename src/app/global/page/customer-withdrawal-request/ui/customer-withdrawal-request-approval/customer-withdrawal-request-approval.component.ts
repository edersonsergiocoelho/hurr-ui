import { Component, OnInit } from '@angular/core';
import { CustomerWithdrawalRequestApprovalUIDTO } from './dto/customer-withdrawal-request-approval-ui.dto';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';
import { CustomerWithdrawalRequestService } from '../../service/customer-withdrawal-request.service';
import { CustomerWithdrawalRequestSearchDTO } from '../../dto/customer-withdrawal-request-search-dto.dto';
import { PaymentStatusService } from 'src/app/page/admin/payment-status/service/payment-status.service';
import { PaymentMethodService } from 'src/app/page/admin/payment-method/service/payment-method.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-customer-withdrawal-request-approval',
  templateUrl: './customer-withdrawal-request-approval.component.html',
  styleUrls: ['./customer-withdrawal-request-approval.component.css']
})
export class CustomerWithdrawalRequestApprovalComponent implements OnInit {

  customerWithdrawalRequestApprovalUIDTO: CustomerWithdrawalRequestApprovalUIDTO;
  customerWithdrawalRequestApprovalForm: NgForm;

  constructor(
    private customerWithdrawalRequestService: CustomerWithdrawalRequestService,
    private ngxSpinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private paymentStatusService: PaymentStatusService,
    private paymentMethodService: PaymentMethodService
  ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetSearchForm();
  }

  resetSearchForm() {

    this.customerWithdrawalRequestApprovalUIDTO = new CustomerWithdrawalRequestApprovalUIDTO();

    this.customerWithdrawalRequestApprovalUIDTO.customerWithdrawalRequestSearchDTO = new CustomerWithdrawalRequestSearchDTO();
    
    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic', 
        'warn_message_service_Generic',
        'success_message_service_Generic',
        "success_approval_message_service_CustomerWithdrawalRequestApproval",
        'table_header_first_name_CustomerWithdrawalRequestApproval',
        'table_header_last_name_CustomerWithdrawalRequestApproval',
        'table_header_bank_name_CustomerWithdrawalRequestApproval',
        'table_header_payment_method_name_CustomerWithdrawalRequestApproval',
        'table_header_payment_status_name_CustomerWithdrawalRequestApproval',
        'table_header_withdrawable_booking_value_CustomerWithdrawalRequestApproval',
        'table_header_created_date_CustomerWithdrawalRequestApproval',
        'table_header_enabled_CustomerWithdrawalRequestApproval',
        'table_header_action_CustomerWithdrawalRequestApproval'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerWithdrawalRequestApprovalUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerWithdrawalRequestApprovalUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerWithdrawalRequestApprovalUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerWithdrawalRequestApprovalUIDTO.success_approval_message_service_CustomerWithdrawalRequestApproval = translations['success_approval_message_service_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_first_name_CustomerWithdrawalRequestApproval = translations['table_header_first_name_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_last_name_CustomerWithdrawalRequestApproval = translations['table_header_last_name_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_bank_name_CustomerWithdrawalRequestApproval = translations['table_header_bank_name_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_payment_method_name_CustomerWithdrawalRequestApproval = translations['table_header_payment_method_name_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_payment_status_name_CustomerWithdrawalRequestApproval = translations['table_header_payment_status_name_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_withdrawable_booking_value_CustomerWithdrawalRequestApproval = translations['table_header_withdrawable_booking_value_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_created_date_CustomerWithdrawalRequestApproval = translations['table_header_created_date_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_enabled_CustomerWithdrawalRequestApproval = translations['table_header_enabled_CustomerWithdrawalRequestApproval'];
      this.customerWithdrawalRequestApprovalUIDTO.table_header_action_CustomerWithdrawalRequestApproval = translations['table_header_action_CustomerWithdrawalRequestApproval'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerWithdrawalRequestApprovalUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const paymentMethodServiceFindAll = await firstValueFrom(this.paymentMethodService.findAll().pipe(first()));

      if (paymentMethodServiceFindAll.status == 200) {

        if (paymentMethodServiceFindAll.body != null && paymentMethodServiceFindAll.body.length > 0) {
          this.customerWithdrawalRequestApprovalUIDTO.paymentMethods = paymentMethodServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerWithdrawalRequestApprovalUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const paymentStatusServiceFindAll = await firstValueFrom(this.paymentStatusService.findAll().pipe(first()));

      if (paymentStatusServiceFindAll.status == 200) {

        if (paymentStatusServiceFindAll.body != null && paymentStatusServiceFindAll.body.length > 0) {
          this.customerWithdrawalRequestApprovalUIDTO.paymentStatuses = paymentStatusServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerWithdrawalRequestApprovalUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.customerWithdrawalRequestApprovalUIDTO.columns = [
      { field: 'customer.firstName', sortField: 'customer.firstName', header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_first_name_CustomerWithdrawalRequestApproval },
      { field: 'customer.lastName', sortField: 'customer.lastName', header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_last_name_CustomerWithdrawalRequestApproval },
      { field: 'customerBankAccount.bank.bankName', sortField: 'customerBankAccount.bank.bankName', header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_bank_name_CustomerWithdrawalRequestApproval },
      { field: 'paymentMethod.paymentMethodName', sortField: 'paymentMethod.paymentMethodName', header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_payment_method_name_CustomerWithdrawalRequestApproval },
      { field: 'paymentStatus.paymentStatusName', sortField: 'paymentStatus.paymentStatusName', header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_payment_status_name_CustomerWithdrawalRequestApproval },
      { field: 'customerVehicleBooking.withdrawableBookingValue', sortField: 'customerVehicleBooking.withdrawableBookingValue', header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_withdrawable_booking_value_CustomerWithdrawalRequestApproval },
      { field: 'createdDate', sortField: 'createdDate', header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_created_date_CustomerWithdrawalRequestApproval },
      { field: 'enabled', sortField: 'enabled', header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_enabled_CustomerWithdrawalRequestApproval },
      { header: '' + this.customerWithdrawalRequestApprovalUIDTO.table_header_action_CustomerWithdrawalRequestApproval },
    ];

    this.ngxSpinnerService.hide();
  }

  clickClean() {
    this.resetSearchForm();
    this.search(null);
  }

  search(event: TableLazyLoadEvent | null) {

    if (event && event.sortField) {
      this.customerWithdrawalRequestApprovalUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.customerWithdrawalRequestApprovalUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.customerWithdrawalRequestApprovalUIDTO.sortDir = "ASC";
      }
    }

    if (this.customerWithdrawalRequestApprovalUIDTO.selectedPaymentMethod != null) {
      this.customerWithdrawalRequestApprovalUIDTO.customerWithdrawalRequestSearchDTO.paymentMethodId = this.customerWithdrawalRequestApprovalUIDTO.selectedPaymentMethod.paymentMethodId;
    } else {
      this.customerWithdrawalRequestApprovalUIDTO.customerWithdrawalRequestSearchDTO.paymentMethodId = null;
    }

    if (this.customerWithdrawalRequestApprovalUIDTO.selectedPaymentStatus != null) {
      this.customerWithdrawalRequestApprovalUIDTO.customerWithdrawalRequestSearchDTO.paymentStatusId = this.customerWithdrawalRequestApprovalUIDTO.selectedPaymentStatus.paymentStatusId;
    } else {
      this.customerWithdrawalRequestApprovalUIDTO.customerWithdrawalRequestSearchDTO.paymentStatusId = null;
    }
  
    this.customerWithdrawalRequestService.searchPage(this.customerWithdrawalRequestApprovalUIDTO.customerWithdrawalRequestSearchDTO, this.customerWithdrawalRequestApprovalUIDTO.page, this.customerWithdrawalRequestApprovalUIDTO.size, this.customerWithdrawalRequestApprovalUIDTO.sortDir, this.customerWithdrawalRequestApprovalUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerWithdrawalRequestApprovalUIDTO.customerWithdrawalRequests = data.body.content;
        this.customerWithdrawalRequestApprovalUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: '' + this.customerWithdrawalRequestApprovalUIDTO.error_message_service_Generic, detail: error.error.message });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  paginate(event: any) {
    this.customerWithdrawalRequestApprovalUIDTO.size = event.rows;
    this.customerWithdrawalRequestApprovalUIDTO.page = event.first / event.rows;
  }

  clickApproval(rowData) {

    this.ngxSpinnerService.show();

    this.customerWithdrawalRequestService.approval(rowData.customerWithdrawalRequestId).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {
          this.messageService.add({ 
            severity: SeverityConstants.SUCCESS, 
            summary: '' + this.customerWithdrawalRequestApprovalUIDTO.success_message_service_Generic, 
            detail: '' + this.customerWithdrawalRequestApprovalUIDTO.success_approval_message_service_CustomerWithdrawalRequestApproval 
          });
        }
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ 
            severity: 'error', 
            summary: '' + this.customerWithdrawalRequestApprovalUIDTO.error_message_service_Generic, 
            detail: error.error.message 
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
        this.resetSearchForm();
        this.search(null);
      }
    });
  }
}