import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerVehicleEditAddressesSearchUIDTO } from './dto/customer-vehicle-edit-addresses-search-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TableLazyLoadEvent } from 'primeng/table';
import { CustomerVehicleAddressService } from '../../../customer-vehicle-address/service/customer-vehicle-address.service';
import { CustomerVehicleAddressSearchDTO } from '../../../customer-vehicle-address/dto/customer-vehicle-address-search-dto.dto';
import { ActivatedRoute } from '@angular/router';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleEditAddressesRegisterComponent } from '../customer-vehicle-edit-addresses-register/customer-vehicle-edit-addresses-register.component';

@Component({
  selector: 'app-customer-vehicle-edit-addresses-search',
  templateUrl: './customer-vehicle-edit-addresses-search.component.html',
  styleUrls: ['./customer-vehicle-edit-addresses-search.component.css']
})
export class CustomerVehicleEditAddressesSearchComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditAddressesSearchUIDTO: CustomerVehicleEditAddressesSearchUIDTO;
  customerVehicleEditAddressesSearchForm: NgForm;

  @ViewChild(CustomerVehicleEditAddressesRegisterComponent, {static: true}) roleRegisterComponent: CustomerVehicleEditAddressesRegisterComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerVehicleAddressService: CustomerVehicleAddressService,
    private ngxSpinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) { 

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleId = params.get('customerVehicleId');
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetSearchForm();
  }

  resetSearchForm() {

    this.customerVehicleEditAddressesSearchUIDTO = new CustomerVehicleEditAddressesSearchUIDTO();

    this.customerVehicleEditAddressesSearchUIDTO.customerVehicleAddressSearchDTO = new CustomerVehicleAddressSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'table_header_customer_vehicle_address_id_CustomerVehicleEditAddressesSearch',
        'table_header_street_address_CustomerVehicleEditAddressesSearch',
        'table_header_nickname_CustomerVehicleEditAddressesSearch',
        'table_header_enabled_CustomerVehicleEditAddressesSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditAddressesSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleEditAddressesSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleEditAddressesSearchUIDTO.table_header_customer_vehicle_address_id_CustomerVehicleEditAddressesSearch = translations['table_header_customer_vehicle_address_id_CustomerVehicleEditAddressesSearch'];
      this.customerVehicleEditAddressesSearchUIDTO.table_header_street_address_CustomerVehicleEditAddressesSearch = translations['table_header_street_address_CustomerVehicleEditAddressesSearch'];
      this.customerVehicleEditAddressesSearchUIDTO.table_header_nickname_CustomerVehicleEditAddressesSearch = translations['table_header_nickname_CustomerVehicleEditAddressesSearch'];
      this.customerVehicleEditAddressesSearchUIDTO.table_header_enabled_CustomerVehicleEditAddressesSearch = translations['table_header_enabled_CustomerVehicleEditAddressesSearch'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesSearchUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.customerVehicleEditAddressesSearchUIDTO.columns = [
      { field: 'customerVehicleAddressId', sortField: 'customerVehicleAddressId', header: '' + this.customerVehicleEditAddressesSearchUIDTO.table_header_customer_vehicle_address_id_CustomerVehicleEditAddressesSearch },
      { field: 'address.streetAddress', sortField: 'address.streetAddress', header: '' + this.customerVehicleEditAddressesSearchUIDTO.table_header_street_address_CustomerVehicleEditAddressesSearch },
      { field: 'address.nickname', sortField: 'address.nickname', header: '' + this.customerVehicleEditAddressesSearchUIDTO.table_header_nickname_CustomerVehicleEditAddressesSearch },
      { field: 'enabled', sortField: 'enabled', header: '' + this.customerVehicleEditAddressesSearchUIDTO.table_header_enabled_CustomerVehicleEditAddressesSearch }
    ];

    this.ngxSpinnerService.hide();
  }

  ngSubmit(event: TableLazyLoadEvent) {

    this.ngxSpinnerService.show();

    if (this.customerVehicleId != null) {
      this.customerVehicleEditAddressesSearchUIDTO.customerVehicleAddressSearchDTO.customerVehicleId = this.customerVehicleId;
    }

    if (event && event.sortField) {
      this.customerVehicleEditAddressesSearchUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.customerVehicleEditAddressesSearchUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.customerVehicleEditAddressesSearchUIDTO.sortDir = "ASC";
      }
    }

    let enabled: boolean | null = null;

    if (this.customerVehicleEditAddressesSearchUIDTO.enabledValue != null) {
      if (this.customerVehicleEditAddressesSearchUIDTO.enabledValue == 'ON') {
        enabled = true;
      } else if (this.customerVehicleEditAddressesSearchUIDTO.enabledValue == 'OFF') {
        enabled = false;
      } else if (this.customerVehicleEditAddressesSearchUIDTO.enabledValue == 'ALL') {
        enabled = null;
      }
    }

    this.customerVehicleEditAddressesSearchUIDTO.customerVehicleAddressSearchDTO.enabled = enabled;

    this.customerVehicleAddressService.searchPage(this.customerVehicleEditAddressesSearchUIDTO.customerVehicleAddressSearchDTO, this.customerVehicleEditAddressesSearchUIDTO.page, this.customerVehicleEditAddressesSearchUIDTO.size, this.customerVehicleEditAddressesSearchUIDTO.sortDir, this.customerVehicleEditAddressesSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {
        this.customerVehicleEditAddressesSearchUIDTO.customerVehicleAddresses = data.body.content;
        this.customerVehicleEditAddressesSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({ 
            severity: SeverityConstants.ERROR, 
            summary: '' + this.customerVehicleEditAddressesSearchUIDTO.error_message_service_Generic, 
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
    this.customerVehicleEditAddressesSearchUIDTO.size = event.rows;
    this.customerVehicleEditAddressesSearchUIDTO.page = event.first / event.rows;
  }

  onChangeEnabled(event: any) {
    this.customerVehicleEditAddressesSearchUIDTO.enabledValue = event.value;
  }
}