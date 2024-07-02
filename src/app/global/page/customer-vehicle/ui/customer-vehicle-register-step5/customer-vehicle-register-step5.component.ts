import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerVehicleRegisterStep5UIDTO } from './dto/customer-vehicle-register-step5-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-customer-vehicle-register-step5',
  templateUrl: './customer-vehicle-register-step5.component.html',
  styleUrls: ['./customer-vehicle-register-step5.component.css']
})
export class CustomerVehicleRegisterStep5Component implements OnInit {

  customerVehicleRegisterStep5UIDTO: CustomerVehicleRegisterStep5UIDTO;

  @Output() validateStep5 = new EventEmitter<boolean>();

  constructor(
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

    const sessionStorageCustomerVehicleRegisterStep5UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep5UIDTO") as string);

    if (sessionStorageCustomerVehicleRegisterStep5UIDTO != null) {

      this.customerVehicleRegisterStep5UIDTO = sessionStorageCustomerVehicleRegisterStep5UIDTO;

      if (this.customerVehicleRegisterStep5UIDTO.licensePlate != null) {

        this.validateStep5.emit(true);
      }

    } else {

      this.customerVehicleRegisterStep5UIDTO = new CustomerVehicleRegisterStep5UIDTO();
  
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

      this.customerVehicleRegisterStep5UIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleRegisterStep5UIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep5UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  ngModelChangeLicensePlateType(type: string) {
    if (type === 'oldModel') {
      this.customerVehicleRegisterStep5UIDTO.licensePlateMask = 'aaa-9999';  // Old model mask
    } else if (type === 'mercosul') {
      this.customerVehicleRegisterStep5UIDTO.licensePlateMask = 'aaa9a99';  // New model mask
    }
  }
}