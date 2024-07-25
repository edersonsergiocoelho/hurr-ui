import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CustomerVehicleApprovedDetailUIDTO } from './dto/customer-vehicle-approved-detail-ui-dto.dto';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleApprovedService } from '../../service/customer-vehicle-approved.service';
import { CustomerVehicleApproved } from '../../entity/customer-vehicle-approved.entity';
import { NgForm } from '@angular/forms';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleFileInsuranceService } from 'src/app/page/customer-vehicle-file-insurance/service/customer-vehicle-file-insurance.service';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { CustomerVehicleService } from 'src/app/global/page/customer-vehicle/service/customer-vehicle.service';

@Component({
  selector: 'app-customer-vehicle-approved-detail',
  templateUrl: './customer-vehicle-approved-detail.component.html',
  styleUrls: ['./customer-vehicle-approved-detail.component.css'],
})
export class CustomerVehicleApprovedDetailComponent implements OnInit {

  customerVehicleApprovedId: string | null;
  customerVehicleApprovedDetailUIDTO: CustomerVehicleApprovedDetailUIDTO;

  customerVehicleApprovedDetailForm: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private ngxSpinnerService: NgxSpinnerService,
              private messageService: MessageService,
              private translateService: TranslateService,
              private sessionStorageService: SessionStorageService,
              private customerVehicleService: CustomerVehicleService,
              private customerVehicleApprovedService: CustomerVehicleApprovedService,
              private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
              private customerVehicleFileInsuranceService: CustomerVehicleFileInsuranceService
            ) { 

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleApprovedId = params.get('customerVehicleApprovedId');
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetDetailForm();
  }

  resetDetailForm() {

    this.customerVehicleApprovedDetailUIDTO = new CustomerVehicleApprovedDetailUIDTO();

    this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved = new CustomerVehicleApproved();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic', 
        'warn_message_service_Generic',
        'success_message_service_Generic',
        'message_not_null_message_service_CustomerVehicleApprovedDetail',
        'success_approve_message_service_CustomerVehicleApprovedDetail',
        'success_disapprove_message_service_CustomerVehicleApprovedDetail'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleApprovedDetailUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleApprovedDetailUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerVehicleApprovedDetailUIDTO.message_not_null_message_service_CustomerVehicleApprovedDetail = translations['message_not_null_message_service_CustomerVehicleApprovedDetail'];
      this.customerVehicleApprovedDetailUIDTO.success_approve_message_service_CustomerVehicleApprovedDetail = translations['success_approve_message_service_CustomerVehicleApprovedDetail'];
      this.customerVehicleApprovedDetailUIDTO.success_disapprove_message_service_CustomerVehicleApprovedDetail = translations['success_disapprove_message_service_CustomerVehicleApprovedDetail'];

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      if (this.customerVehicleApprovedId != null) {

        const customerVehicleApprovedServiceFindById = await firstValueFrom(this.customerVehicleApprovedService.findById(this.customerVehicleApprovedId).pipe(first()));
  
        if (customerVehicleApprovedServiceFindById.status == 200) {
          if (customerVehicleApprovedServiceFindById.body != null) {
            this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved = customerVehicleApprovedServiceFindById.body;
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      if (this.customerVehicleApprovedId != null) {

        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.customerVehicle.customerVehicleId).pipe(first()));
  
        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.customerVehicleApprovedDetailUIDTO.customerVehicle = customerVehicleServiceFindById.body;
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const customerVehicleFilePhotoServiceFindByCustomerVehicle = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicle(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.customerVehicle.customerVehicleId).pipe(first()));

      if (customerVehicleFilePhotoServiceFindByCustomerVehicle.status == 200) {
        if (customerVehicleFilePhotoServiceFindByCustomerVehicle.body != null) {
          this.customerVehicleApprovedDetailUIDTO.customerVehicleFilePhotos = customerVehicleFilePhotoServiceFindByCustomerVehicle.body.map(customerVehicleFilePhoto => {
            return {
              ...customerVehicleFilePhoto,
              dataURI: `data:${customerVehicleFilePhoto.contentType};base64,${customerVehicleFilePhoto.dataAsByteArray}`
            };
          });
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const customerVehicleFileInsuranceServiceFindByCustomerVehicle = await firstValueFrom(this.customerVehicleFileInsuranceService.findByCustomerVehicle(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.customerVehicle.customerVehicleId).pipe(first()));

      if (customerVehicleFileInsuranceServiceFindByCustomerVehicle.status == 200) {
        if (customerVehicleFileInsuranceServiceFindByCustomerVehicle.body != null) {
          this.customerVehicleApprovedDetailUIDTO.customerVehicleFileInsurances = customerVehicleFileInsuranceServiceFindByCustomerVehicle.body;
        }
      }
      
    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.ngxSpinnerService.hide();
  }

  clickOpenPhoto(index: number): void {
    this.customerVehicleApprovedDetailUIDTO.activeIndex = index;
    this.customerVehicleApprovedDetailUIDTO.displayCustom = true;
  }

  clickOpenInsurance(file: any) {

    const newTab = window.open();
    
    let dataURI;

    if (file.contentType === 'application/pdf') {
      dataURI = 'data:' + file.contentType +';base64,' + encodeURIComponent(file.dataAsByteArray.toString());
    } else {
      dataURI = `data:${file.contentType};base64,${file.dataAsByteArray}`;
    }

    if (newTab) {

      newTab.document.write(`<iframe width="100%" height="100%" src="${dataURI}"></iframe>`);

    } else {

      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: '' + this.customerVehicleApprovedDetailUIDTO.failed_to_open_new_tab_message_service_Generic
      });
    }
  }

  clickRouterNavigateToCustomerVehicleApproved() {
    this.router.navigate(['customer-vehicle-approved']);
  }

  async onClickCustomerVehicleApprovedApprove() {

    if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.message == null || this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.message == "") {
      this.messageService.add({
        severity: SeverityConstants.WARN,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.warn_message_service_Generic,
        detail: '' + this.customerVehicleApprovedDetailUIDTO.message_not_null_message_service_CustomerVehicleApprovedDetail,
      });

      return;
    }

    this.ngxSpinnerService.show();

    try {

      this.customerVehicleApprovedDetailUIDTO.currentUser = this.sessionStorageService.getUser();

      this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.approvedBy = this.customerVehicleApprovedDetailUIDTO.currentUser.userId;

      const customerVehicleApprovedServiceSave = await firstValueFrom(this.customerVehicleApprovedService.update(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved).pipe(first()));

      if (customerVehicleApprovedServiceSave.status == 200) {
        if (customerVehicleApprovedServiceSave.body != null) {

          this.customerVehicleApprovedDetailUIDTO.customerVehicle.customerVehicleValidated = true;

          const customerServiceSave = await firstValueFrom(this.customerVehicleService.update(this.customerVehicleApprovedDetailUIDTO.customerVehicle).pipe(first()));
  
          if (customerServiceSave.status == 200) {
            if (customerServiceSave.body != null) {

              this.ngxSpinnerService.hide();

              this.messageService.add({
                severity: SeverityConstants.SUCCESS,
                summary: '' + this.customerVehicleApprovedDetailUIDTO.success_message_service_Generic,
                detail: '' + this.customerVehicleApprovedDetailUIDTO.success_approve_message_service_CustomerVehicleApprovedDetail,
              });
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
  }

  async onClickCustomerVehicleApprovedDisapprove() {

    if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.message == null || this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.message == "") {
      this.messageService.add({
        severity: SeverityConstants.WARN,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.warn_message_service_Generic,
        detail: '' + this.customerVehicleApprovedDetailUIDTO.message_not_null_message_service_CustomerVehicleApprovedDetail,
      });

      return;
    }

    this.ngxSpinnerService.show();

    try {

      this.customerVehicleApprovedDetailUIDTO.currentUser = this.sessionStorageService.getUser();

      this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.reprovedBy = this.customerVehicleApprovedDetailUIDTO.currentUser.userId;

      const customerVehicleApprovedServiceSave = await firstValueFrom(this.customerVehicleApprovedService.update(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved).pipe(first()));

      if (customerVehicleApprovedServiceSave.status == 200) {
        if (customerVehicleApprovedServiceSave.body != null) {

          this.customerVehicleApprovedDetailUIDTO.customerVehicle.customerVehicleValidated = false;

          const customerServiceUpdate = await firstValueFrom(this.customerVehicleService.update(this.customerVehicleApprovedDetailUIDTO.customerVehicle).pipe(first()));

          if (customerServiceUpdate.status == 200) {
            if (customerServiceUpdate.body != null) {

              this.ngxSpinnerService.hide();

              this.messageService.add({
                severity: SeverityConstants.SUCCESS,
                summary: '' + this.customerVehicleApprovedDetailUIDTO.success_message_service_Generic,
                detail: '' + this.customerVehicleApprovedDetailUIDTO.success_disapprove_message_service_CustomerVehicleApprovedDetail,
              });
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
  }
}