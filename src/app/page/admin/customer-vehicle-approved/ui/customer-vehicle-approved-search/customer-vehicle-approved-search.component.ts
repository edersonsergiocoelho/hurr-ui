import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first, firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { UserService } from 'src/app/page/user/service/user.service';
import { Router } from '@angular/router';
import { CustomerVehicleApprovedSearchUIDTO } from './dto/customer-vehicle-approved-search-ui-dto.dto';
import { CustomerVehicleApprovedService } from '../../service/customer-vehicle-approved.service';
import { CustomerVehicleApprovedSearchDTO } from '../../dto/customer-vehicle-approved-search-dto.dto';

@Component({
  selector: 'app-customer-vehicle-approved-search',
  templateUrl: './customer-vehicle-approved-search.component.html',
  styleUrls: ['./customer-vehicle-approved-search.component.css']
})
export class CustomerVehicleApprovedSearchComponent implements OnInit {

  customerVehicleApprovedSearchUIDTO: CustomerVehicleApprovedSearchUIDTO;
  customerVehicleApprovedSearchForm: NgForm;

  constructor(private router: Router,
              private ngxSpinnerService: NgxSpinnerService,
              private messageService: MessageService,
              private translateService: TranslateService,
              private customerVehicleApprovedService: CustomerVehicleApprovedService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetSearchForm();
  }

  resetSearchForm() {

    this.customerVehicleApprovedSearchUIDTO = new CustomerVehicleApprovedSearchUIDTO();
    
    this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO = new CustomerVehicleApprovedSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    this.customerVehicleApprovedSearchUIDTO.fileTables = [
      { name: 'CUSTOMER', code: 'CUSTOMER' },
      { name: 'USER', code: 'USER' }
    ];

    this.customerVehicleApprovedSearchUIDTO.fileTypes = [
      { name: 'DRIVER_LICENSE', code: 'DRIVER_LICENSE' },
      { name: 'IDENTITY_NUMBER', code: 'IDENTITY_NUMBER' },
      { name: 'PROFILE_PICTURE', code: 'PROFILE_PICTURE' }
    ];

    try {

      const keys = [
        'error_message_service_Generic', 
        'warn_message_service_Generic',
        'table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch',
        'table_header_first_name_CustomerVehicleApprovedSearch',
        'table_header_last_name_CustomerVehicleApprovedSearch',
        'table_header_cpf_CustomerVehicleApprovedSearch',
        'table_header_created_date_CustomerVehicleApprovedSearch',
        'table_header_enabled_CustomerVehicleApprovedSearch',
        'table_header_action_CustomerVehicleApprovedSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleApprovedSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleApprovedSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleApprovedSearchUIDTO.table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch = translations['table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_first_name_CustomerVehicleApprovedSearch = translations['table_header_first_name_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_last_name_CustomerVehicleApprovedSearch = translations['table_header_last_name_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_cpf_CustomerVehicleApprovedSearch = translations['table_header_cpf_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_created_date_CustomerVehicleApprovedSearch = translations['table_header_created_date_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_enabled_CustomerVehicleApprovedSearch = translations['table_header_enabled_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_action_CustomerVehicleApprovedSearch = translations['table_header_action_CustomerVehicleApprovedSearch'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleApprovedSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const userServiceFindAll = await firstValueFrom(this.userService.findAll().pipe(first()));

      if (userServiceFindAll.status == 200) {

        if (userServiceFindAll.body != null && userServiceFindAll.body.length > 0) {
          this.customerVehicleApprovedSearchUIDTO.approvedByUsers = userServiceFindAll.body;
          this.customerVehicleApprovedSearchUIDTO.reprovedByUsers = userServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleApprovedSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.customerVehicleApprovedSearchUIDTO.columns = [
      { field: 'customerVehicleApprovedId', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch },
      { field: 'fileTable', sortField: 'fileTable', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_first_name_CustomerVehicleApprovedSearch },
      { field: 'fileType', sortField: 'fileType', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_last_name_CustomerVehicleApprovedSearch },
      { field: 'customerVehicle.customer.cpf', sortField: 'customerVehicle.customer.cpf', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_cpf_CustomerVehicleApprovedSearch },
      { field: 'createdDate', sortField: 'createdDate', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_created_date_CustomerVehicleApprovedSearch },
      { field: 'enabled', sortField: 'enabled', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_enabled_CustomerVehicleApprovedSearch },
      { header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_action_CustomerVehicleApprovedSearch },
    ];

    this.ngxSpinnerService.hide();
  }

  search(event: TableLazyLoadEvent) {

    if (event && event.sortField) {
      this.customerVehicleApprovedSearchUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.customerVehicleApprovedSearchUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.customerVehicleApprovedSearchUIDTO.sortDir = "ASC";
      }
    }

    /*
    if (this.customerVehicleApprovedSearchUIDTO.enabledValue != null) {
      if (this.customerVehicleApprovedSearchUIDTO.enabledValue == 'ALL') {
        this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.enabled = null;
      } else if (this.customerVehicleApprovedSearchUIDTO.enabledValue == 'ON') {
        this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.enabled = true;
      } else if (this.customerVehicleApprovedSearchUIDTO.enabledValue == 'OFF') {
        this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.enabled = false;
      }
    }

    if (this.customerVehicleApprovedSearchUIDTO.filterValue != null) {
      if (this.customerVehicleApprovedSearchUIDTO.filterValue == 'ALL') {
        this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.filter = null;
      } else if (this.customerVehicleApprovedSearchUIDTO.filterValue == 'AGUARDANDO_APROVACAO') {
        this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.filter = 'AGUARDANDO_APROVACAO';
      }
    }

    if (this.customerVehicleApprovedSearchUIDTO.selectedFileTable != null) {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.fileTable = this.customerVehicleApprovedSearchUIDTO.selectedFileTable.code;
    } else {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.fileTable = null;
    }

    if (this.customerVehicleApprovedSearchUIDTO.selectedFileType != null) {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.fileType = this.customerVehicleApprovedSearchUIDTO.selectedFileType.code;
    } else {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.fileType = null;
    }
    */
  
    this.customerVehicleApprovedService.searchPage(this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO, this.customerVehicleApprovedSearchUIDTO.page, this.customerVehicleApprovedSearchUIDTO.size, this.customerVehicleApprovedSearchUIDTO.sortDir, this.customerVehicleApprovedSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerVehicleApprovedSearchUIDTO.customerVehicleApproveds = data.body.content;
        this.customerVehicleApprovedSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: '' + this.customerVehicleApprovedSearchUIDTO.error_message_service_Generic, detail: error.error.message });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  paginate(event: any) {
    this.customerVehicleApprovedSearchUIDTO.size = event.rows;
    this.customerVehicleApprovedSearchUIDTO.page = event.first / event.rows;
  }

  onChangeEnabled(event: any){
    this.customerVehicleApprovedSearchUIDTO.enabledValue = event.value;
  }

  onChangeFilter(event: any){
    this.customerVehicleApprovedSearchUIDTO.filterValue = event.value;
  }

  onClickCustomerVehicleApprovedDetail(rowData) {
    this.router.navigate(['file-approved/detail/' + rowData.customerVehicleApprovedId]);
  }
}