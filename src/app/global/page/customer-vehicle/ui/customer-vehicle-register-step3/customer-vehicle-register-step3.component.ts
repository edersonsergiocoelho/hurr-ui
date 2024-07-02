import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerVehicleRegisterStep3UIDTO } from './dto/customer-vehicle-register-step3-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { VehicleTransmissionService } from 'src/app/page/admin/vehicle-transmission/service/vehicle-transmission.service';
import { VehicleTransmission } from 'src/app/page/admin/vehicle-transmission/entity/vehicle-transmission.entity';

@Component({
  selector: 'app-customer-vehicle-register-step3',
  templateUrl: './customer-vehicle-register-step3.component.html',
  styleUrls: ['./customer-vehicle-register-step3.component.css']
})
export class CustomerVehicleRegisterStep3Component implements OnInit {

  customerVehicleRegisterStep3UIDTO: CustomerVehicleRegisterStep3UIDTO;

  @Output() validateStep3 = new EventEmitter<boolean>();

  constructor(
    private vehicleTransmissionService: VehicleTransmissionService,
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

    const sessionStorageCustomerVehicleRegisterStep3UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep3UIDTO") as string);

    if (sessionStorageCustomerVehicleRegisterStep3UIDTO != null) {

      this.customerVehicleRegisterStep3UIDTO = sessionStorageCustomerVehicleRegisterStep3UIDTO;

      if (this.customerVehicleRegisterStep3UIDTO.selectedVehicleTransmission != null &&
          this.customerVehicleRegisterStep3UIDTO.mileageCreated != null) {

        this.validateStep3.emit(true);
      }

    } else {

      this.customerVehicleRegisterStep3UIDTO = new CustomerVehicleRegisterStep3UIDTO();
  
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

      this.customerVehicleRegisterStep3UIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleRegisterStep3UIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep3UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      const vehicleTransmissionServiceFindAll = await firstValueFrom(this.vehicleTransmissionService.findAll().pipe(first()));

      if (vehicleTransmissionServiceFindAll.status == 200) {
        if (vehicleTransmissionServiceFindAll.body != null && vehicleTransmissionServiceFindAll.body.length > 0) {
          this.customerVehicleRegisterStep3UIDTO.VehicleTransmissions = vehicleTransmissionServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep3UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  onChangeVehicleTransmission(vehicleTransmission: VehicleTransmission) {

    if (vehicleTransmission != null) {

      if (this.customerVehicleRegisterStep3UIDTO.selectedVehicleTransmission != null &&
          this.customerVehicleRegisterStep3UIDTO.mileageCreated != null) {
  
        sessionStorage.setItem("customerVehicleRegisterStep3UIDTO", JSON.stringify(this.customerVehicleRegisterStep3UIDTO));
    
        this.validateStep3.emit(true);
      }
    } else {
      this.validateStep3.emit(false);
    }
  }

  ngModelChangeMileageCreated() {

    if (this.customerVehicleRegisterStep3UIDTO.selectedVehicleTransmission != null &&
        this.customerVehicleRegisterStep3UIDTO.mileageCreated != null) {

      sessionStorage.setItem("customerVehicleRegisterStep3UIDTO", JSON.stringify(this.customerVehicleRegisterStep3UIDTO));

      this.validateStep3.emit(true);

    } else {
      this.validateStep3.emit(false);
    }
  }
}