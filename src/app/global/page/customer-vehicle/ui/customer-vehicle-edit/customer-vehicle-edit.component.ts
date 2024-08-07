import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerVehicleEditUIDTO } from './dto/customer-vehicle-edit-ui-dto.dto';
import { first, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';

@Component({
  selector: 'app-customer-vehicle-edit',
  templateUrl: './customer-vehicle-edit.component.html',
  styleUrls: ['./customer-vehicle-edit.component.css']
})
export class CustomerVehicleEditComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditUIDTO: CustomerVehicleEditUIDTO;

  applicationsMenuOpen: boolean = false;
  currentContent: string | null = null;

  toggleApplicationsMenu() {
    this.applicationsMenuOpen = !this.applicationsMenuOpen;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private router: Router,
    private translateService: TranslateService,
    private ngxSpinnerService: NgxSpinnerService,
    private messageService: MessageService
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleId = params.get('customerVehicleId');
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleEditUIDTO = new CustomerVehicleEditUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleEditUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      if (this.customerVehicleId != null) {

        const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(this.customerVehicleId).pipe(first()));
          
        if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200) {
          if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
            this.customerVehicleEditUIDTO.customerVehicleFilePhoto = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
            this.customerVehicleEditUIDTO.customerVehicleFilePhoto.dataURI = `data:${this.customerVehicleEditUIDTO.customerVehicleFilePhoto.contentType};base64,${this.customerVehicleEditUIDTO.customerVehicleFilePhoto.dataAsByteArray}`;
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.customerVehicleEditUIDTO.error_message_service_Generic,
          detail: error.toString() 
        });
      }
    }

    try {

      if (this.customerVehicleId != null) {
        
        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleId).pipe(first()));

        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.customerVehicleEditUIDTO.customerVehicle = customerVehicleServiceFindById.body;
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  showContent(content: string): void {
    this.currentContent = content;
  }
}