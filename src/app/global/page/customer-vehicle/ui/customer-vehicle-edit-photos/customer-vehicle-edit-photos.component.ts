import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerVehicleEditPhotosUIDTO } from './dto/customer-vehicle-edit-photos-ui-dto.dto';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleFilePhoto } from 'src/app/page/customer-vehicle-file-photo/entity/customer-vehicle-file-photo.entity';
import { HomeUIService } from '../../../home/service/home-ui/home-ui.service';

@Component({
  selector: 'app-customer-vehicle-edit-photos',
  templateUrl: './customer-vehicle-edit-photos.component.html',
  styleUrls: ['./customer-vehicle-edit-photos.component.css']
})
export class CustomerVehicleEditPhotosComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditPhotosUIDTO: CustomerVehicleEditPhotosUIDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private homeUIService: HomeUIService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleId = params.get('customerVehicleId');
      this.homeUIService.setCustomerVehicleId(this.customerVehicleId);
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleEditPhotosUIDTO = new CustomerVehicleEditPhotosUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'success_message_service_Generic',
        'save_success_message_service_CustomerVehicleEditPhotos'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditPhotosUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleEditPhotosUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleEditPhotosUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerVehicleEditPhotosUIDTO.save_success_message_service_CustomerVehicleEditPhotos = translations['save_success_message_service_CustomerVehicleEditPhotos'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditPhotosUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      if (this.customerVehicleId != null) {
        
        const customerVehicleFilePhotoServiceFindByCustomerVehicle = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicle(this.customerVehicleId).pipe(first()));

        if (customerVehicleFilePhotoServiceFindByCustomerVehicle.status == 200) {
          if (customerVehicleFilePhotoServiceFindByCustomerVehicle.body != null) {
            this.customerVehicleEditPhotosUIDTO.customerVehicleFilePhotos = customerVehicleFilePhotoServiceFindByCustomerVehicle.body.map(customerVehicleFilePhoto => {
              return {
                ...customerVehicleFilePhoto,
                dataURI: `data:${customerVehicleFilePhoto.contentType};base64,${customerVehicleFilePhoto.dataAsByteArray}`
              };
            });
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditPhotosUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  uploadHandlerVehiclePhoto(event: any): void {

    this.customerVehicleEditPhotosUIDTO.uploadedFiles = new Array<any>;
    this.customerVehicleEditPhotosUIDTO.customerVehicleFilePhotos = new Array<CustomerVehicleFilePhoto>;

    for (let file of event.files) {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.customerVehicleEditPhotosUIDTO.uploadedFiles.push(file);

        const base64String = (reader.result as string).split(',')[1];

        const customerVehicleFilePhoto = {
          contentType: file.type,
          originalFileName: file.name,
          dataAsByteArray: base64String,
          customerVehicle: {
            customerVehicleId: this.customerVehicleId
          },
          dataURI: `data:${file.type};base64,${base64String}`
        };

        this.customerVehicleEditPhotosUIDTO.customerVehicleFilePhotos.push(customerVehicleFilePhoto);
      };
    }
  }

  imageClick(index: number): void {
    this.customerVehicleEditPhotosUIDTO.activeIndex = index;
    this.customerVehicleEditPhotosUIDTO.displayCustom = true;
  }

  clearFileUpload(): void {
    this.customerVehicleEditPhotosUIDTO.uploadedFiles = [];
  }

  onClickSelectedCoverImage(image: any) {

    for (let photo of this.customerVehicleEditPhotosUIDTO.customerVehicleFilePhotos) {
      photo.coverPhoto = false;
    }

    const selectedPhoto = this.customerVehicleEditPhotosUIDTO.customerVehicleFilePhotos.find(photo => 
      photo.originalFileName === image.originalFileName && photo.dataURI === image.dataURI
    );

    if (selectedPhoto) {
      selectedPhoto.coverPhoto = true;
    }

    this.customerVehicleEditPhotosUIDTO.selectedCoverImage = image;
  }

  async ngSubmit() {

    this.ngxSpinnerService.show();

    try {

      const customerVehicleFilePhotoServiceDeleteByCustomerVehicle = await firstValueFrom(this.customerVehicleFilePhotoService.deleteByCustomerVehicle(this.customerVehicleId!).pipe(first()));

      if (customerVehicleFilePhotoServiceDeleteByCustomerVehicle === null || customerVehicleFilePhotoServiceDeleteByCustomerVehicle.status === 204) {

        this.customerVehicleEditPhotosUIDTO.customerVehicleFilePhotos = this.customerVehicleEditPhotosUIDTO.customerVehicleFilePhotos.map(customerVehicleFilePhoto => {
          return {
            ...customerVehicleFilePhoto,
            customerVehicle: {
              customerVehicleId: this.customerVehicleId
            },
          };
        });

        const customerVehicleFilePhotoServiceSaveAll = await firstValueFrom(this.customerVehicleFilePhotoService.saveAll(this.customerVehicleEditPhotosUIDTO.customerVehicleFilePhotos).pipe(first()));
  
        if (customerVehicleFilePhotoServiceSaveAll.status == 201 && customerVehicleFilePhotoServiceSaveAll.body != null) {

          this.messageService.add({
            severity: SeverityConstants.SUCCESS,
            summary: '' + this.customerVehicleEditPhotosUIDTO.success_message_service_Generic,
            detail: '' + this.customerVehicleEditPhotosUIDTO.save_success_message_service_CustomerVehicleEditPhotos,
          });
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditPhotosUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }
}