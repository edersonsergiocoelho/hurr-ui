import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CustomerVehicleRegisterStep7UIDTO } from './dto/customer-vehicle-register-step7-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { CustomerVehicleFilePhoto } from 'src/app/page/customer-vehicle-file-photo/entity/customer-vehicle-file-photo.entity';
import { CustomerVehicleFileInsurance } from 'src/app/page/customer-vehicle-file-insurance/entity/customer-vehicle-file-insurance.entity';

@Component({
  selector: 'app-customer-vehicle-register-step7',
  templateUrl: './customer-vehicle-register-step7.component.html',
  styleUrls: ['./customer-vehicle-register-step7.component.css']
})
export class CustomerVehicleRegisterStep7Component implements OnInit {

  customerVehicleRegisterStep7UIDTO: CustomerVehicleRegisterStep7UIDTO;

  @ViewChild('customerVehicleRegisterStep7Form') customerVehicleRegisterStep7Form: NgForm;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Output() validateStep7 = new EventEmitter<boolean>();

  constructor(
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {

  }

  onFormChange(ngForm: NgForm): void {
    if (ngForm) {
      const isFormValid = (ngForm.valid ?? false) && (this.customerVehicleRegisterStep7UIDTO.documents && this.customerVehicleRegisterStep7UIDTO.documents.length > 0);
      this.customerVehicleRegisterStep7UIDTO.isFormValid = isFormValid;
      this.validateStep7.emit(this.customerVehicleRegisterStep7UIDTO.isFormValid);
      if (this.customerVehicleRegisterStep7UIDTO.isFormValid) {
        sessionStorage.setItem("customerVehicleRegisterStep7UIDTO", JSON.stringify(this.customerVehicleRegisterStep7UIDTO));
      }
    }
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    const sessionStorageCustomerVehicleRegisterStep5UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep7UIDTO") as string);

    if (sessionStorageCustomerVehicleRegisterStep5UIDTO != null) {

      this.customerVehicleRegisterStep7UIDTO = sessionStorageCustomerVehicleRegisterStep5UIDTO;

      if (this.customerVehicleRegisterStep7UIDTO.isFormValid && this.customerVehicleRegisterStep7UIDTO.documents && this.customerVehicleRegisterStep7UIDTO.documents.length > 0) {

        this.clearFileUpload();
        this.validateStep7.emit(true);
      }

    } else {

      this.customerVehicleRegisterStep7UIDTO = new CustomerVehicleRegisterStep7UIDTO();
  
      this.asyncCallFunctions();
    }
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'failed_to_open_new_tab_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleRegisterStep7UIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleRegisterStep7UIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleRegisterStep7UIDTO.failed_to_open_new_tab_message_service_Generic = translations['failed_to_open_new_tab_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep7UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  uploadHandler(event: any): void {

    this.customerVehicleRegisterStep7UIDTO.documents = new Array<any>;
    this.customerVehicleRegisterStep7UIDTO.uploadedFiles = new Array<any>;
    this.customerVehicleRegisterStep7UIDTO.customerVehicleFileInsurances = new Array<CustomerVehicleFileInsurance>;

    for (let file of event.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.customerVehicleRegisterStep7UIDTO.documents.push({
          itemImageSrc: reader.result as string,
          thumbnailImageSrc: reader.result as string,
          alt: file.name,
          title: file.name
        });

        this.customerVehicleRegisterStep7UIDTO.uploadedFiles.push(file);

        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);

        const base64String = (reader.result as string).split(',')[1];

        const customerVehicleFileInsurance = new CustomerVehicleFileInsurance({
          contentType: file.type,
          originalFileName: file.name,
          dataAsByteArray: base64String
        });

        this.customerVehicleRegisterStep7UIDTO.customerVehicleFileInsurances.push(customerVehicleFileInsurance);
        this.onFormChange(this.customerVehicleRegisterStep7Form);
      };
    }
  }

  clearFileUpload(): void {
    this.customerVehicleRegisterStep7UIDTO.uploadedFiles = [];
  }

  onClickOpenPDF(file: any) {

    const newTab = window.open();

    if (newTab) {

      newTab.document.write(`<iframe width="100%" height="100%" src="${file.itemImageSrc}"></iframe>`);

    } else {

      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleRegisterStep7UIDTO.error_message_service_Generic,
        detail: '' + this.customerVehicleRegisterStep7UIDTO.failed_to_open_new_tab_message_service_Generic
      });
    }
  }
}