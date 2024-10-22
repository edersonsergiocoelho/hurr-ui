import { Component, OnInit } from '@angular/core';
import { CustomerVehicleWithdrawalRequestApprovalUIDTO } from './dto/customer-vehicle-withdrawal-request-approval-ui.dto';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';
import { CustomerVehicleWithdrawalRequestService } from '../../service/customer-vehicle-withdrawal-request.service';
import { CustomerVehicleWithdrawalRequestSearchDTO } from '../../dto/customer-vehicle-withdrawal-request-search-dto.dto';
import { PaymentStatusService } from 'src/app/page/admin/payment-status/service/payment-status.service';
import { PaymentMethodService } from 'src/app/page/admin/payment-method/service/payment-method.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleWithdrawalRequestDTO } from '../../dto/customer-vehicle-withdrawal-request-dto.dto';
import { CNAN240Service } from 'src/app/utils/service/cnab240-service';
import { InterPIXService } from 'src/app/page-custom/inter/service/pix/inter-pix.service';
import { InterIncluirPIXDTO } from 'src/app/page-custom/inter/dto/inter-incluir-pix-dto.dto';

@Component({
  selector: 'app-customer-vehicle-withdrawal-request-approval',
  templateUrl: './customer-vehicle-withdrawal-request-approval.component.html',
  styleUrls: ['./customer-vehicle-withdrawal-request-approval.component.css']
})
export class CustomerVehicleWithdrawalRequestApprovalComponent implements OnInit {

  customerVehicleWithdrawalRequestApprovalUIDTO: CustomerVehicleWithdrawalRequestApprovalUIDTO;
  customerVehicleWithdrawalRequestApprovalForm: NgForm;

  constructor(
    private customerVehicleWithdrawalRequestService: CustomerVehicleWithdrawalRequestService,
    private interPIXService: InterPIXService,
    private cnab240Service: CNAN240Service,
    private ngxSpinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private paymentStatusService: PaymentStatusService,
    private paymentMethodService: PaymentMethodService
  ) { }

  ngOnInit(): void {
    this.resetSearchForm();
  }

  resetSearchForm() {

    this.customerVehicleWithdrawalRequestApprovalUIDTO = new CustomerVehicleWithdrawalRequestApprovalUIDTO();

    this.customerVehicleWithdrawalRequestApprovalUIDTO.customerVehicleWithdrawalRequestSearchDTO = new CustomerVehicleWithdrawalRequestSearchDTO();
    
    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic', 
        'warn_message_service_Generic',
        'success_message_service_Generic',
        "success_approval_message_service_CustomerVehicleWithdrawalRequestApproval",
        'table_header_first_name_CustomerVehicleWithdrawalRequestApproval',
        'table_header_last_name_CustomerVehicleWithdrawalRequestApproval',
        'table_header_bank_name_CustomerVehicleWithdrawalRequestApproval',
        'table_header_payment_method_name_CustomerVehicleWithdrawalRequestApproval',
        'table_header_payment_status_name_CustomerVehicleWithdrawalRequestApproval',
        'table_header_withdrawable_booking_value_CustomerVehicleWithdrawalRequestApproval',
        'table_header_created_date_CustomerVehicleWithdrawalRequestApproval',
        'table_header_enabled_CustomerVehicleWithdrawalRequestApproval',
        'table_header_action_CustomerVehicleWithdrawalRequestApproval'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleWithdrawalRequestApprovalUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.success_approval_message_service_CustomerVehicleWithdrawalRequestApproval = translations['success_approval_message_service_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_first_name_CustomerVehicleWithdrawalRequestApproval = translations['table_header_first_name_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_last_name_CustomerVehicleWithdrawalRequestApproval = translations['table_header_last_name_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_bank_name_CustomerVehicleWithdrawalRequestApproval = translations['table_header_bank_name_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_payment_method_name_CustomerVehicleWithdrawalRequestApproval = translations['table_header_payment_method_name_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_payment_status_name_CustomerVehicleWithdrawalRequestApproval = translations['table_header_payment_status_name_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_withdrawable_booking_value_CustomerVehicleWithdrawalRequestApproval = translations['table_header_withdrawable_booking_value_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_created_date_CustomerVehicleWithdrawalRequestApproval = translations['table_header_created_date_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_enabled_CustomerVehicleWithdrawalRequestApproval = translations['table_header_enabled_CustomerVehicleWithdrawalRequestApproval'];
      this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_action_CustomerVehicleWithdrawalRequestApproval = translations['table_header_action_CustomerVehicleWithdrawalRequestApproval'];

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleWithdrawalRequestApprovalUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const paymentMethodServiceFindAll = await firstValueFrom(this.paymentMethodService.findAll().pipe(first()));

      if (paymentMethodServiceFindAll.status == 200) {

        if (paymentMethodServiceFindAll.body != null && paymentMethodServiceFindAll.body.length > 0) {
          this.customerVehicleWithdrawalRequestApprovalUIDTO.paymentMethods = paymentMethodServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleWithdrawalRequestApprovalUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const paymentStatusServiceFindAll = await firstValueFrom(this.paymentStatusService.findAll().pipe(first()));

      if (paymentStatusServiceFindAll.status == 200) {

        if (paymentStatusServiceFindAll.body != null && paymentStatusServiceFindAll.body.length > 0) {
          this.customerVehicleWithdrawalRequestApprovalUIDTO.paymentStatuses = paymentStatusServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleWithdrawalRequestApprovalUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.customerVehicleWithdrawalRequestApprovalUIDTO.columns = [
      { field: 'customer.firstName', sortField: 'customer.firstName', header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_first_name_CustomerVehicleWithdrawalRequestApproval },
      { field: 'customer.lastName', sortField: 'customer.lastName', header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_last_name_CustomerVehicleWithdrawalRequestApproval },
      { field: 'customerBankAccount.bank.bankName', sortField: 'customerBankAccount.bank.bankName', header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_bank_name_CustomerVehicleWithdrawalRequestApproval },
      { field: 'paymentMethod.paymentMethodName', sortField: 'paymentMethod.paymentMethodName', header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_payment_method_name_CustomerVehicleWithdrawalRequestApproval },
      { field: 'paymentStatus.paymentStatusName', sortField: 'paymentStatus.paymentStatusName', header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_payment_status_name_CustomerVehicleWithdrawalRequestApproval },
      { field: 'customerVehicleBooking.withdrawableBookingValue', sortField: 'customerVehicleBooking.withdrawableBookingValue', header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_withdrawable_booking_value_CustomerVehicleWithdrawalRequestApproval },
      { field: 'createdDate', sortField: 'createdDate', header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_created_date_CustomerVehicleWithdrawalRequestApproval },
      { field: 'enabled', sortField: 'enabled', header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_enabled_CustomerVehicleWithdrawalRequestApproval },
      { header: '' + this.customerVehicleWithdrawalRequestApprovalUIDTO.table_header_action_CustomerVehicleWithdrawalRequestApproval },
    ];

    this.ngxSpinnerService.hide();
  }

  clickClean() {
    this.resetSearchForm();
    this.search(null);
  }

  search(event: TableLazyLoadEvent | null) {

    if (event && event.sortField) {
      this.customerVehicleWithdrawalRequestApprovalUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.customerVehicleWithdrawalRequestApprovalUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.customerVehicleWithdrawalRequestApprovalUIDTO.sortDir = "ASC";
      }
    }

    if (this.customerVehicleWithdrawalRequestApprovalUIDTO.selectedPaymentMethod != null) {
      this.customerVehicleWithdrawalRequestApprovalUIDTO.customerVehicleWithdrawalRequestSearchDTO.paymentMethodId = this.customerVehicleWithdrawalRequestApprovalUIDTO.selectedPaymentMethod.paymentMethodId;
    } else {
      this.customerVehicleWithdrawalRequestApprovalUIDTO.customerVehicleWithdrawalRequestSearchDTO.paymentMethodId = null;
    }

    if (this.customerVehicleWithdrawalRequestApprovalUIDTO.selectedPaymentStatus != null) {
      this.customerVehicleWithdrawalRequestApprovalUIDTO.customerVehicleWithdrawalRequestSearchDTO.paymentStatusId = this.customerVehicleWithdrawalRequestApprovalUIDTO.selectedPaymentStatus.paymentStatusId;
    } else {
      this.customerVehicleWithdrawalRequestApprovalUIDTO.customerVehicleWithdrawalRequestSearchDTO.paymentStatusId = null;
    }
  
    this.customerVehicleWithdrawalRequestService.searchPage(this.customerVehicleWithdrawalRequestApprovalUIDTO.customerVehicleWithdrawalRequestSearchDTO, this.customerVehicleWithdrawalRequestApprovalUIDTO.page, this.customerVehicleWithdrawalRequestApprovalUIDTO.size, this.customerVehicleWithdrawalRequestApprovalUIDTO.sortDir, this.customerVehicleWithdrawalRequestApprovalUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerVehicleWithdrawalRequestApprovalUIDTO.customerVehicleWithdrawalRequests = data.body.content;
        this.customerVehicleWithdrawalRequestApprovalUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ 
            severity: SeverityConstants.ERROR, 
            summary: this.customerVehicleWithdrawalRequestApprovalUIDTO.error_message_service_Generic, 
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
    this.customerVehicleWithdrawalRequestApprovalUIDTO.size = event.rows;
    this.customerVehicleWithdrawalRequestApprovalUIDTO.page = event.first / event.rows;
  }

  clickApprovalPIX(rowData) {

    this.ngxSpinnerService.show();

    let interIncluirPIXDTO = new InterIncluirPIXDTO();
    interIncluirPIXDTO.customerVehicleWithdrawalRequestId = rowData.customerVehicleWithdrawalRequestId;
    interIncluirPIXDTO.chave = rowData.customerVehicleBankAccount.pixKey;
    interIncluirPIXDTO.valor = rowData.customerVehicleBooking.withdrawableBookingValue;

    this.interPIXService.save(interIncluirPIXDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {
          this.messageService.add({ 
            severity: SeverityConstants.SUCCESS, 
            summary: this.customerVehicleWithdrawalRequestApprovalUIDTO.success_message_service_Generic, 
            detail: this.customerVehicleWithdrawalRequestApprovalUIDTO.success_approval_message_service_CustomerVehicleWithdrawalRequestApproval 
          });
        }
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ 
            severity: SeverityConstants.ERROR, 
            summary: this.customerVehicleWithdrawalRequestApprovalUIDTO.error_message_service_Generic, 
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

  clickApproval(rowData) {

    this.ngxSpinnerService.show();

    this.customerVehicleWithdrawalRequestService.approval(rowData.customerVehicleWithdrawalRequestId).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {
          this.messageService.add({ 
            severity: SeverityConstants.SUCCESS, 
            summary: this.customerVehicleWithdrawalRequestApprovalUIDTO.success_message_service_Generic, 
            detail: this.customerVehicleWithdrawalRequestApprovalUIDTO.success_approval_message_service_CustomerVehicleWithdrawalRequestApproval 
          });
        }
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ 
            severity: SeverityConstants.ERROR, 
            summary: this.customerVehicleWithdrawalRequestApprovalUIDTO.error_message_service_Generic, 
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

  downloadCNABFile(): void {

    const cnabFile = this.cnab240Service.generateCNAB240File(this.customerVehicleWithdrawalRequestApprovalUIDTO.customerVehicleWithdrawalRequests);

    // Criar um blob de texto para o arquivo
    const blob = new Blob([cnabFile], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
  
    // Criar o link para download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CI240_001_000001.REM'; // Nome do arquivo conforme layout
    a.click();
  
    // Liberar o URL
    window.URL.revokeObjectURL(url);
  }
}  