import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerVehicleEditDetailUIDTO } from './dto/customer-vehicle-edit-detail-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';
import { VehicleFuelTypeService } from 'src/app/page/admin/vehicle-fuel-type/service/vehicle-fuel-type.service';
import { VehicleColorService } from 'src/app/page/admin/vehicle-color/service/vehicle-color.service';
import { Vehicle } from 'src/app/page/admin/vehicle/entity/vehicle.entity';
import { VehicleBrand } from 'src/app/page/admin/vehicle-brand/entity/vehicle-brand.entity';
import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';
import { VehicleBrandService } from 'src/app/page/admin/vehicle-brand/service/vehicle-brand.service';
import { VehicleTransmissionService } from 'src/app/page/admin/vehicle-transmission/service/vehicle-transmission.service';
import { StateService } from 'src/app/page/admin/state/service/state.service';

@Component({
  selector: 'app-customer-vehicle-edit-detail',
  templateUrl: './customer-vehicle-edit-detail.component.html',
  styleUrls: ['./customer-vehicle-edit-detail.component.css']
})
export class CustomerVehicleEditDetailComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditDetailUIDTO: CustomerVehicleEditDetailUIDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerVehicleService: CustomerVehicleService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    private vehicleService: VehicleService,
    private vehicleBrandService: VehicleBrandService,
    private vehicleModelService: VehicleModelService,
    private vehicleColorService: VehicleColorService,
    private vehicleFuelTypeService: VehicleFuelTypeService,
    private vehicleTransmissionService: VehicleTransmissionService,
    private stateService: StateService
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleId = params.get('customerVehicleId');
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleEditDetailUIDTO = new CustomerVehicleEditDetailUIDTO();

    this.customerVehicleEditDetailUIDTO.customerVehicle = new CustomerVehicle();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_summary_message_service_Generic',
        'warn_summary_message_service_Generic',
        'success_summary_message_service_Generic',
        'save_success_message_service_CustomerVehicleEditDetail'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleEditDetailUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.customerVehicleEditDetailUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];
      this.customerVehicleEditDetailUIDTO.save_success_message_service_CustomerVehicleEditDetail = translations['save_success_message_service_CustomerVehicleEditDetail'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    try {

      if (this.customerVehicleId != null) {
        
        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleId).pipe(first()));

        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.customerVehicleEditDetailUIDTO.customerVehicle = customerVehicleServiceFindById.body;
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    try {

      const vehicleBrandServiceFindAll = await firstValueFrom(this.vehicleBrandService.findAll().pipe(first()));

      if (vehicleBrandServiceFindAll.status == 200) {
        if (vehicleBrandServiceFindAll.body != null && vehicleBrandServiceFindAll.body.length > 0) {
          this.customerVehicleEditDetailUIDTO.vehicleBrands = vehicleBrandServiceFindAll.body;
          await this.onChangeVehicleBrand(this.customerVehicleEditDetailUIDTO.customerVehicle.vehicle.vehicleBrand);
          await this.onChangeVehicle(this.customerVehicleEditDetailUIDTO.customerVehicle.vehicle);

          this.customerVehicleEditDetailUIDTO.selectedVehicleBrand = this.customerVehicleEditDetailUIDTO.customerVehicle.vehicle.vehicleBrand;
          this.customerVehicleEditDetailUIDTO.selectedVehicle = this.customerVehicleEditDetailUIDTO.customerVehicle.vehicle;
          this.customerVehicleEditDetailUIDTO.selectedVehicleModel = this.customerVehicleEditDetailUIDTO.customerVehicle.vehicleModel;

          if (this.customerVehicleEditDetailUIDTO.customerVehicle.licensePlate) {
            const letters = this.customerVehicleEditDetailUIDTO.customerVehicle.licensePlate.replace(/[^A-Za-z]/g, '');
            if (letters.length === 3) {
              this.customerVehicleEditDetailUIDTO.licensePlateType = 'oldModel';
            } else if (letters.length === 4) {
              this.customerVehicleEditDetailUIDTO.licensePlateType = 'mercosul';
            }
          }

          this.customerVehicleEditDetailUIDTO.yearOfManufacture = new Date(this.customerVehicleEditDetailUIDTO.customerVehicle.yearOfManufacture, 0, 1);
          this.customerVehicleEditDetailUIDTO.yearOfTheCar = new Date(this.customerVehicleEditDetailUIDTO.customerVehicle.yearOfTheCar, 0, 1);
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    try {

      const vehicleTransmissionServiceFindAll = await firstValueFrom(this.vehicleTransmissionService.findAll().pipe(first()));

      if (vehicleTransmissionServiceFindAll.status == 200) {
        if (vehicleTransmissionServiceFindAll.body != null && vehicleTransmissionServiceFindAll.body.length > 0) {
          this.customerVehicleEditDetailUIDTO.VehicleTransmissions = vehicleTransmissionServiceFindAll.body;
          this.customerVehicleEditDetailUIDTO.selectedVehicleTransmission = this.customerVehicleEditDetailUIDTO.customerVehicle.vehicleTransmission;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    try {

      const stateServiceFindByCountryId = await firstValueFrom(this.stateService.findByCountryId(this.customerVehicleEditDetailUIDTO.customerVehicle.renavamState.country.countryId).pipe(first()));

      if (stateServiceFindByCountryId.status == 200) {
        if (stateServiceFindByCountryId.body != null && stateServiceFindByCountryId.body.length > 0) {
          this.customerVehicleEditDetailUIDTO.states = stateServiceFindByCountryId.body;
          this.customerVehicleEditDetailUIDTO.selectedState = this.customerVehicleEditDetailUIDTO.customerVehicle.renavamState;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }
    
    try {

      const vehicleColorServiceFindAll = await firstValueFrom(this.vehicleColorService.findAll().pipe(first()));

      if (vehicleColorServiceFindAll.status == 200) {
        if (vehicleColorServiceFindAll.body != null && vehicleColorServiceFindAll.body.length > 0) {
          this.customerVehicleEditDetailUIDTO.vehicleColors = vehicleColorServiceFindAll.body;
          this.customerVehicleEditDetailUIDTO.selectedVehicleColor = this.customerVehicleEditDetailUIDTO.customerVehicle.vehicleColor;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    try {

      const vehicleFuelTypeServiceFindAll = await firstValueFrom(this.vehicleFuelTypeService.findAll().pipe(first()));

      if (vehicleFuelTypeServiceFindAll.status == 200) {
        if (vehicleFuelTypeServiceFindAll.body != null && vehicleFuelTypeServiceFindAll.body.length > 0) {
          this.customerVehicleEditDetailUIDTO.vehicleFuelTypes = vehicleFuelTypeServiceFindAll.body;
          this.customerVehicleEditDetailUIDTO.selectedVehicleFuelType = this.customerVehicleEditDetailUIDTO.customerVehicle.vehicleFuelType;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    this.ngxSpinnerService.hide();
  }

  ngModelChangeLicensePlateType(type: string) {
    if (type === 'oldModel') {
      this.customerVehicleEditDetailUIDTO.licensePlateMask = 'aaa-9999';
    } else if (type === 'mercosul') {
      this.customerVehicleEditDetailUIDTO.licensePlateMask = 'aaa9a99';
    }
  }

  async onChangeVehicleBrand(vehicleBrand: VehicleBrand) {

    this.ngxSpinnerService.show();

    try {

      const vehicleServiceByBrandId = await firstValueFrom(this.vehicleService.getVehiclesByBrandId(vehicleBrand.vehicleBrandId).pipe(first()));

      if (vehicleServiceByBrandId.status == 200) {
        if (vehicleServiceByBrandId.body != null && vehicleServiceByBrandId.body.length > 0) {
          this.customerVehicleEditDetailUIDTO.vehicles = vehicleServiceByBrandId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    this.ngxSpinnerService.hide();
  }

  async onChangeVehicle(vehicle: Vehicle) {

    this.ngxSpinnerService.show();

    try {

      const vehicleModelServiceByVehicleId = await firstValueFrom(this.vehicleModelService.getVehicleModelsByVehicleId(vehicle.vehicleId).pipe(first()));

      if (vehicleModelServiceByVehicleId.status == 200) {
        if (vehicleModelServiceByVehicleId.body != null && vehicleModelServiceByVehicleId.body.length > 0) {
          this.customerVehicleEditDetailUIDTO.vehicleModels = vehicleModelServiceByVehicleId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    this.ngxSpinnerService.hide();
  }

  async ngSubmit() {

    this.ngxSpinnerService.show();

    try {

      this.customerVehicleEditDetailUIDTO.customerVehicle.vehicle.vehicleBrand = this.customerVehicleEditDetailUIDTO.selectedVehicleBrand;
      this.customerVehicleEditDetailUIDTO.customerVehicle.vehicle = this.customerVehicleEditDetailUIDTO.selectedVehicle;
      this.customerVehicleEditDetailUIDTO.customerVehicle.vehicleModel = this.customerVehicleEditDetailUIDTO.selectedVehicleModel;

      this.customerVehicleEditDetailUIDTO.customerVehicle.vehicleTransmission = this.customerVehicleEditDetailUIDTO.selectedVehicleTransmission;

      this.customerVehicleEditDetailUIDTO.customerVehicle.renavamState = this.customerVehicleEditDetailUIDTO.selectedState;

      this.customerVehicleEditDetailUIDTO.customerVehicle.yearOfManufacture = new Date(this.customerVehicleEditDetailUIDTO.yearOfManufacture).getFullYear();
      this.customerVehicleEditDetailUIDTO.customerVehicle.yearOfTheCar = new Date(this.customerVehicleEditDetailUIDTO.yearOfTheCar).getFullYear();

      this.customerVehicleEditDetailUIDTO.customerVehicle.vehicleColor = this.customerVehicleEditDetailUIDTO.selectedVehicleColor;
      this.customerVehicleEditDetailUIDTO.customerVehicle.vehicleFuelType = this.customerVehicleEditDetailUIDTO.selectedVehicleFuelType;

      const customerVehicleServiceSave = await firstValueFrom(this.customerVehicleService.update(this.customerVehicleEditDetailUIDTO.customerVehicle).pipe(first()));

      if (customerVehicleServiceSave.status == 200 && customerVehicleServiceSave.body != null) {

        this.messageService.add({
          severity: SeverityConstants.SUCCESS,
          summary: '' + this.customerVehicleEditDetailUIDTO.success_summary_message_service_Generic,
          detail: '' + this.customerVehicleEditDetailUIDTO.save_success_message_service_CustomerVehicleEditDetail,
        });
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }

      this.ngxSpinnerService.hide();
    }

    this.ngxSpinnerService.hide();
  }
}