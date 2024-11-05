import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first, firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { Router } from '@angular/router';
import { CustomerVehicleApprovedSearchUIDTO } from './dto/customer-vehicle-approved-search-ui-dto.dto';
import { CustomerVehicleApprovedService } from '../../service/customer-vehicle-approved.service';
import { CustomerVehicleApprovedSearchDTO } from '../../dto/customer-vehicle-approved-search-dto.dto';
import { VehicleBrand } from '../../../vehicle-brand/entity/vehicle-brand.entity';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { Vehicle } from '../../../vehicle/entity/vehicle.entity';
import { VehicleService } from '../../../vehicle/service/vehicle.service';
import { VehicleBrandService } from '../../../vehicle-brand/service/vehicle-brand.service';
import { VehicleModelService } from '../../../vehicle-model/service/vehicle-model.service';

@Component({
  selector: 'app-customer-vehicle-approved-search',
  templateUrl: './customer-vehicle-approved-search.component.html',
  styleUrls: ['./customer-vehicle-approved-search.component.css']
})
export class CustomerVehicleApprovedSearchComponent implements OnInit {

  customerVehicleApprovedSearchUIDTO: CustomerVehicleApprovedSearchUIDTO;
  customerVehicleApprovedSearchForm: NgForm;

  constructor(
    private customerVehicleApprovedService: CustomerVehicleApprovedService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private translateService: TranslateService,
    private vehicleBrandService: VehicleBrandService,
    private vehicleModelService: VehicleModelService,
    private vehicleService: VehicleService) 
  { 
    
  }

  ngOnInit(): void {
    this.resetSearchForm();
  }

  resetSearchForm() {

    this.customerVehicleApprovedSearchUIDTO = new CustomerVehicleApprovedSearchUIDTO();
    
    this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO = new CustomerVehicleApprovedSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_summary_message_service_Generic', 
        'warn_summary_message_service_Generic',
        'table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch',
        'table_header_vehicle_brand_CustomerVehicleApprovedSearch',
        'table_header_vehicle_CustomerVehicleApprovedSearch',
        'table_header_vehicle_model_CustomerVehicleApprovedSearch',
        'table_header_first_name_CustomerVehicleApprovedSearch',
        'table_header_last_name_CustomerVehicleApprovedSearch',
        'table_header_cpf_CustomerVehicleApprovedSearch',
        'table_header_created_date_CustomerVehicleApprovedSearch',
        'table_header_enabled_CustomerVehicleApprovedSearch',
        'table_header_action_CustomerVehicleApprovedSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleApprovedSearchUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleApprovedSearchUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.customerVehicleApprovedSearchUIDTO.table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch = translations['table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_vehicle_brand_CustomerVehicleApprovedSearch = translations['table_header_vehicle_brand_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_vehicle_CustomerVehicleApprovedSearch = translations['table_header_vehicle_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_vehicle_model_CustomerVehicleApprovedSearch = translations['table_header_vehicle_model_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_first_name_CustomerVehicleApprovedSearch = translations['table_header_first_name_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_last_name_CustomerVehicleApprovedSearch = translations['table_header_last_name_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_cpf_CustomerVehicleApprovedSearch = translations['table_header_cpf_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_created_date_CustomerVehicleApprovedSearch = translations['table_header_created_date_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_enabled_CustomerVehicleApprovedSearch = translations['table_header_enabled_CustomerVehicleApprovedSearch'];
      this.customerVehicleApprovedSearchUIDTO.table_header_action_CustomerVehicleApprovedSearch = translations['table_header_action_CustomerVehicleApprovedSearch'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleApprovedSearchUIDTO.error_summary_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const vehicleBrandServiceFindAll = await firstValueFrom(this.vehicleBrandService.findAll().pipe(first()));

      if (vehicleBrandServiceFindAll.status == 200) {
        if (vehicleBrandServiceFindAll.body != null && vehicleBrandServiceFindAll.body.length > 0) {
          this.customerVehicleApprovedSearchUIDTO.vehicleBrands = vehicleBrandServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleApprovedSearchUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.customerVehicleApprovedSearchUIDTO.columns = [
      { field: 'customerVehicleApprovedId', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch },
      { field: 'customerVehicle.vehicle.vehicleBrand.vehicleBrandName', sortField: 'customerVehicle.vehicle.vehicleBrand.vehicleBrandName', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_vehicle_brand_CustomerVehicleApprovedSearch },
      { field: 'customerVehicle.vehicle.vehicleName', sortField: 'customerVehicle.vehicle.vehicleName', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_vehicle_CustomerVehicleApprovedSearch },
      { field: 'customerVehicle.vehicleModel.vehicleModelName', sortField: 'customerVehicle.vehicleModel.vehicleModelName', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_vehicle_model_CustomerVehicleApprovedSearch },
      { field: 'customerVehicle.customer.firstName', sortField: 'customerVehicle.customer.firstName', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_first_name_CustomerVehicleApprovedSearch },
      { field: 'customerVehicle.customer.lastName', sortField: 'customerVehicle.customer.lastName', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_last_name_CustomerVehicleApprovedSearch },
      { field: 'customerVehicle.customer.cpf', sortField: 'customerVehicle.customer.cpf', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_cpf_CustomerVehicleApprovedSearch },
      { field: 'createdDate', sortField: 'createdDate', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_created_date_CustomerVehicleApprovedSearch },
      { field: 'enabled', sortField: 'enabled', header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_enabled_CustomerVehicleApprovedSearch },
      { header: '' + this.customerVehicleApprovedSearchUIDTO.table_header_action_CustomerVehicleApprovedSearch },
    ];

    this.ngxSpinnerService.hide();
  }

  search(event: TableLazyLoadEvent) {

    this.ngxSpinnerService.show();

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

    if (this.customerVehicleApprovedSearchUIDTO.selectedVehicleBrand != null) {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.vehicleBrandId = this.customerVehicleApprovedSearchUIDTO.selectedVehicleBrand.vehicleBrandId;
    } else {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.vehicleBrandId = null;
    }

    if (this.customerVehicleApprovedSearchUIDTO.selectedVehicle != null) {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.vehicleId = this.customerVehicleApprovedSearchUIDTO.selectedVehicle.vehicleId;
    } else{
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.vehicleId = null;
    }

    if (this.customerVehicleApprovedSearchUIDTO.selectedVehicleModel != null) {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.vehicleModelId = this.customerVehicleApprovedSearchUIDTO.selectedVehicleModel.vehicleModelId;
    } else {
      this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO.vehicleModelId = null;
    }
  
    this.customerVehicleApprovedService.searchPage(this.customerVehicleApprovedSearchUIDTO.customerVehicleApprovedSearchDTO, this.customerVehicleApprovedSearchUIDTO.page, this.customerVehicleApprovedSearchUIDTO.size, this.customerVehicleApprovedSearchUIDTO.sortDir, this.customerVehicleApprovedSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {

        this.customerVehicleApprovedSearchUIDTO.customerVehicleApproveds = data.body.content;
        this.customerVehicleApprovedSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({
            severity: SeverityConstants.ERROR,
            summary: '' + this.customerVehicleApprovedSearchUIDTO.error_summary_message_service_Generic,
            detail: error.toString()
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
    this.customerVehicleApprovedSearchUIDTO.size = event.rows;
    this.customerVehicleApprovedSearchUIDTO.page = event.first / event.rows;
  }

  clickRouterNavigateToCustomerVehicleApprovedDetail(rowData) {
    this.router.navigate(['customer-vehicle-approved/detail/' + rowData.customerVehicleApprovedId]);
  }

  async onChangeVehicleBrand(vehicleBrand: VehicleBrand) {

    this.ngxSpinnerService.show();

    try {

      const vehicleServiceByBrandId = await firstValueFrom(this.vehicleService.getVehiclesByBrandId(vehicleBrand.vehicleBrandId).pipe(first()));

      if (vehicleServiceByBrandId.status == 200) {
        if (vehicleServiceByBrandId.body != null && vehicleServiceByBrandId.body.length > 0) {
          this.customerVehicleApprovedSearchUIDTO.vehicles = vehicleServiceByBrandId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleApprovedSearchUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async onChangeVehicle(vehicle: Vehicle) {

    this.ngxSpinnerService.show();

    try {

      const vehicleModelServiceByVehicleId = await firstValueFrom(this.vehicleModelService.getVehicleModelsByVehicleId(vehicle.vehicleId).pipe(first()));

      if (vehicleModelServiceByVehicleId.status == 200) {
        if (vehicleModelServiceByVehicleId.body != null && vehicleModelServiceByVehicleId.body.length > 0) {
          this.customerVehicleApprovedSearchUIDTO.vehicleModels = vehicleModelServiceByVehicleId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleApprovedSearchUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }
}