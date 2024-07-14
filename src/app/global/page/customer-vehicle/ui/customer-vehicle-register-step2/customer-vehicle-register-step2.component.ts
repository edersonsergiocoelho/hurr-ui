import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerVehicleRegisterStep2UIDTO } from './dto/customer-vehicle-register-step2-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { VehicleBrand } from 'src/app/page/admin/vehicle-brand/entity/vehicle-brand.entity';
import { VehicleBrandService } from 'src/app/page/admin/vehicle-brand/service/vehicle-brand.service';
import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';
import { Vehicle } from 'src/app/page/admin/vehicle/entity/vehicle.entity';
import { VehicleModel } from 'src/app/page/admin/vehicle-model/entity/vehicle-model.entity';

@Component({
  selector: 'app-customer-vehicle-register-step2',
  templateUrl: './customer-vehicle-register-step2.component.html',
  styleUrls: ['./customer-vehicle-register-step2.component.css']
})
export class CustomerVehicleRegisterStep2Component implements OnInit {

  customerVehicleRegisterStep2UIDTO: CustomerVehicleRegisterStep2UIDTO;

  @Output() validateStep2 = new EventEmitter<boolean>();

  constructor(
    private vehicleService: VehicleService,
    private vehicleBrandService: VehicleBrandService,
    private vehicleModelService: VehicleModelService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    const sessionStorageCustomerVehicleRegisterStep2UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep2UIDTO") as string);

    if (sessionStorageCustomerVehicleRegisterStep2UIDTO != null) {

      this.customerVehicleRegisterStep2UIDTO = sessionStorageCustomerVehicleRegisterStep2UIDTO;

      if (this.customerVehicleRegisterStep2UIDTO.selectedVehicleBrand != null &&
          this.customerVehicleRegisterStep2UIDTO.selectedVehicle != null &&
          this.customerVehicleRegisterStep2UIDTO.selectedVehicleModel != null) {

        this.validateStep2.emit(true);
      }

    } else {

      this.customerVehicleRegisterStep2UIDTO = new CustomerVehicleRegisterStep2UIDTO();
  
      this.asyncCallFunctions();
    }
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleRegisterStep2UIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleRegisterStep2UIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep2UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      const vehicleBrandServiceFindAll = await firstValueFrom(this.vehicleBrandService.getAllVehicleBrands().pipe(first()));

      if (vehicleBrandServiceFindAll.status == 200) {
        if (vehicleBrandServiceFindAll.body != null && vehicleBrandServiceFindAll.body.length > 0) {
          this.customerVehicleRegisterStep2UIDTO.vehicleBrands = vehicleBrandServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep2UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async changeVehicleBrand(vehicleBrand: VehicleBrand) {

    this.ngxSpinnerService.show();

    try {

      const vehicleServiceByBrandId = await firstValueFrom(this.vehicleService.getVehiclesByBrandId(vehicleBrand.vehicleBrandId).pipe(first()));

      if (vehicleServiceByBrandId.status == 200) {
        if (vehicleServiceByBrandId.body != null && vehicleServiceByBrandId.body.length > 0) {
          this.customerVehicleRegisterStep2UIDTO.vehicles = vehicleServiceByBrandId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep2UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async changeVehicle(vehicle: Vehicle) {

    this.ngxSpinnerService.show();

    try {

      const vehicleModelServiceByVehicleId = await firstValueFrom(this.vehicleModelService.getVehicleModelsByVehicleId(vehicle.vehicleId).pipe(first()));

      if (vehicleModelServiceByVehicleId.status == 200) {
        if (vehicleModelServiceByVehicleId.body != null && vehicleModelServiceByVehicleId.body.length > 0) {
          this.customerVehicleRegisterStep2UIDTO.vehicleModels = vehicleModelServiceByVehicleId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep2UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  onChangeVehicleModel (vehicleModel: VehicleModel) {

    if (vehicleModel != null) {

      if (this.customerVehicleRegisterStep2UIDTO.selectedVehicleBrand != null &&
          this.customerVehicleRegisterStep2UIDTO.selectedVehicle != null &&
          this.customerVehicleRegisterStep2UIDTO.selectedVehicleModel != null) {
  
        sessionStorage.setItem("customerVehicleRegisterStep2UIDTO", JSON.stringify(this.customerVehicleRegisterStep2UIDTO));
    
        this.validateStep2.emit(true);
      }
    } else {
      this.validateStep2.emit(false);
    }
  }
}