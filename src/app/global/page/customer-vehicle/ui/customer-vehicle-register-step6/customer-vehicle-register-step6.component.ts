import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CustomerVehicleRegisterStep6UIDTO } from './dto/customer-vehicle-register-step6-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { CustomerVehicleFilePhoto } from 'src/app/page/customer-vehicle-file-photo/entity/customer-vehicle-file-photo.entity';

@Component({
  selector: 'app-customer-vehicle-register-step6',
  templateUrl: './customer-vehicle-register-step6.component.html',
  styleUrls: ['./customer-vehicle-register-step6.component.css']
})
export class CustomerVehicleRegisterStep6Component implements OnInit {

  customerVehicleRegisterStep6UIDTO: CustomerVehicleRegisterStep6UIDTO;

  @ViewChild('customerVehicleRegisterStep6Form') customerVehicleRegisterStep6Form: NgForm;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Output() validateStep6 = new EventEmitter<boolean>();

  constructor(
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {

  }

  onFormChange(ngForm: NgForm): void {
    if (ngForm) {
      const isFormValid = (ngForm.valid ?? false) && (this.customerVehicleRegisterStep6UIDTO.images && this.customerVehicleRegisterStep6UIDTO.images.length > 0);
      this.customerVehicleRegisterStep6UIDTO.isFormValid = isFormValid;
      this.validateStep6.emit(this.customerVehicleRegisterStep6UIDTO.isFormValid);
      if (this.customerVehicleRegisterStep6UIDTO.isFormValid) {
        sessionStorage.setItem("customerVehicleRegisterStep6UIDTO", JSON.stringify(this.customerVehicleRegisterStep6UIDTO));
      }
    }
  }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {

    const sessionStorageCustomerVehicleRegisterStep5UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep6UIDTO") as string);

    if (sessionStorageCustomerVehicleRegisterStep5UIDTO != null) {

      this.customerVehicleRegisterStep6UIDTO = sessionStorageCustomerVehicleRegisterStep5UIDTO;

      if (this.customerVehicleRegisterStep6UIDTO.isFormValid && this.customerVehicleRegisterStep6UIDTO.images && this.customerVehicleRegisterStep6UIDTO.images.length > 0) {

        this.clearFileUpload();
        this.validateStep6.emit(true);
      }

    } else {

      this.customerVehicleRegisterStep6UIDTO = new CustomerVehicleRegisterStep6UIDTO();
  
      this.asyncCallFunctions();
    }
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_summary_message_service_Generic',
        'warn_summary_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleRegisterStep6UIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleRegisterStep6UIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep6UIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  uploadHandlerVehiclePhoto(event: any): void {

    this.customerVehicleRegisterStep6UIDTO.images = new Array<any>;
    this.customerVehicleRegisterStep6UIDTO.uploadedFiles = new Array<any>;
    this.customerVehicleRegisterStep6UIDTO.customerVehicleFilePhotos = new Array<CustomerVehicleFilePhoto>;

    for (let file of event.files) {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.customerVehicleRegisterStep6UIDTO.images.push({
          itemImageSrc: reader.result as string,
          thumbnailImageSrc: reader.result as string,
          alt: file.name,
          title: file.name
        });

        this.customerVehicleRegisterStep6UIDTO.uploadedFiles.push(file);

        const base64String = (reader.result as string).split(',')[1];

        const customerVehicleFilePhoto = new CustomerVehicleFilePhoto({
          contentType: file.type,
          originalFileName: file.name,
          dataAsByteArray: base64String
        });

        this.customerVehicleRegisterStep6UIDTO.customerVehicleFilePhotos.push(customerVehicleFilePhoto);

        this.onFormChange(this.customerVehicleRegisterStep6Form);
      };
    }
  }

  imageClick(index: number): void {
    this.customerVehicleRegisterStep6UIDTO.activeIndex = index;
    this.customerVehicleRegisterStep6UIDTO.displayCustom = true;
  }

  clearFileUpload(): void {
    this.customerVehicleRegisterStep6UIDTO.uploadedFiles = [];
  }

  onClickSelectedCoverImage(image: any) {
    // Iterar por todas as fotos e definir coverPhoto como false
    for (let photo of this.customerVehicleRegisterStep6UIDTO.customerVehicleFilePhotos) {
        photo.coverPhoto = false;
    }

    // Encontrar a imagem selecionada e definir coverPhoto como true
    const selectedPhoto = this.customerVehicleRegisterStep6UIDTO.customerVehicleFilePhotos.find(photo => 
        photo.originalFileName === image.title && photo.dataAsByteArray === (image.itemImageSrc.split(',')[1])
    );

    if (selectedPhoto) {
        selectedPhoto.coverPhoto = true;
    }

    // Atualizar a imagem de capa selecionada
    this.customerVehicleRegisterStep6UIDTO.selectedCoverImage = image;

    // Chamar onFormChange para refletir as mudanças no formulário
    this.onFormChange(this.customerVehicleRegisterStep6Form);
  }
}