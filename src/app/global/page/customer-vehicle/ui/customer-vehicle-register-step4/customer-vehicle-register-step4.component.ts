import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerVehicleRegisterStep4UIDTO } from './dto/customer-vehicle-register-step4-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-customer-vehicle-register-step4',
  templateUrl: './customer-vehicle-register-step4.component.html',
  styleUrls: ['./customer-vehicle-register-step4.component.css']
})
export class CustomerVehicleRegisterStep4Component implements OnInit {

  customerVehicleRegisterStep4UIDTO: CustomerVehicleRegisterStep4UIDTO;

  @Output() validateStep4 = new EventEmitter<boolean>();

  constructor(
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {

    const sessionStorageCustomerVehicleRegisterStep4UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep4UIDTO") as string);

    if (sessionStorageCustomerVehicleRegisterStep4UIDTO != null) {

      this.customerVehicleRegisterStep4UIDTO = sessionStorageCustomerVehicleRegisterStep4UIDTO;

      if (this.customerVehicleRegisterStep4UIDTO.vehicleValue != null) {

        this.validateStep4.emit(true);
      }

    } else {

      this.customerVehicleRegisterStep4UIDTO = new CustomerVehicleRegisterStep4UIDTO();
  
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

      this.customerVehicleRegisterStep4UIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleRegisterStep4UIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep4UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  ngModelChangeVehicleValue() {

    if (this.customerVehicleRegisterStep4UIDTO.vehicleValue != null) {

      sessionStorage.setItem("customerVehicleRegisterStep4UIDTO", JSON.stringify(this.customerVehicleRegisterStep4UIDTO));

      this.validateStep4.emit(true);

    } else {
      this.validateStep4.emit(false);
    }
  }
}