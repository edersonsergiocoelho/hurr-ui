import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CustomerVehicleApprovedDetailUIDTO } from './dto/customer-vehicle-approved-detail-ui-dto.dto';
import { UserService } from 'src/app/page/user/service/user.service';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleApprovedService } from '../../service/customer-vehicle-approved.service';
import { CustomerVehicleApproved } from '../../entity/customer-vehicle-approved.entity';
import { FileService } from 'src/app/page/file/service/file.service';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { Customer } from 'src/app/global/page/customer/entity/customer.entity';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { User } from 'src/app/page/user/entity/user.entity';
import { NgForm } from '@angular/forms';

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
              private sessionStorageService: SessionStorageService,
              private translateService: TranslateService,
              private customerService: CustomerService,
              private fileService: FileService,
              private customerVehicleApprovedService: CustomerVehicleApprovedService,
              private userService: UserService) { 

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
    this.customerVehicleApprovedDetailUIDTO.customer = new Customer();
    this.customerVehicleApprovedDetailUIDTO.currentUser = new User();

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
        severity: 'error',
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
        severity: 'error',
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    /*
    try {

      if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.userId != null) {

        const userServiceFindById = await firstValueFrom(this.userService.findById(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.userId).pipe(first()));
  
        if (userServiceFindById.status == 200) {
          if (userServiceFindById.body != null) {

            this.customerVehicleApprovedDetailUIDTO.user = userServiceFindById.body;

            const customerServiceFindByEmail = await firstValueFrom(this.customerService.findByEmail(this.customerVehicleApprovedDetailUIDTO.user.email).pipe(first()));

            if (customerServiceFindByEmail.status == 200) {
              if (customerServiceFindByEmail.body != null) {

                this.customerVehicleApprovedDetailUIDTO.customer = customerServiceFindByEmail.body

                if (this.customerVehicleApprovedDetailUIDTO.customer.createdDate != null) {
                  this.customerVehicleApprovedDetailUIDTO.customer.createdDate = moment(this.customerVehicleApprovedDetailUIDTO.customer.createdDate).toDate();
                }
    
                if (this.customerVehicleApprovedDetailUIDTO.customer.dateOfBirth != null) {
                  this.customerVehicleApprovedDetailUIDTO.customer.dateOfBirth = moment(this.customerVehicleApprovedDetailUIDTO.customer.dateOfBirth).toDate();
                }
      
                if (this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate != null) {
                  this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate = moment(this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate).toDate();
                }
      
                if (this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseExpirationDate != null) {
                  this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseExpirationDate = moment(this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseExpirationDate).toDate();
                }
      
                if (this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseIssueDate != null) {
                  this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseIssueDate = moment(this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseIssueDate).toDate();
                }
              }
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
    */

    /*
    try {

      if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.customerId != null) {

        const customerServiceFindById = await firstValueFrom(this.customerService.findById(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.customerId).pipe(first()));
  
        if (customerServiceFindById.status == 200) {
          if (customerServiceFindById.body != null) {
            this.customerVehicleApprovedDetailUIDTO.customer = customerServiceFindById.body;

            if (this.customerVehicleApprovedDetailUIDTO.customer.createdDate != null) {
              this.customerVehicleApprovedDetailUIDTO.customer.createdDate = moment(this.customerVehicleApprovedDetailUIDTO.customer.createdDate).toDate();
            }

            if (this.customerVehicleApprovedDetailUIDTO.customer.dateOfBirth != null) {
              this.customerVehicleApprovedDetailUIDTO.customer.dateOfBirth = moment(this.customerVehicleApprovedDetailUIDTO.customer.dateOfBirth).toDate();
            }
  
            if (this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate != null) {
              this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate = moment(this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate).toDate();
            }
  
            if (this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseExpirationDate != null) {
              this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseExpirationDate = moment(this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseExpirationDate).toDate();
            }
  
            if (this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseIssueDate != null) {
              this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseIssueDate = moment(this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseIssueDate).toDate();
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
    */

    /*
    try {

      if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved != null) {

        const fileServiceFindById = await firstValueFrom(this.fileService.findById(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileId).pipe(first()));
  
        if (fileServiceFindById.status == 200) {
          if (fileServiceFindById.body != null) {
            this.customerVehicleApprovedDetailUIDTO.file = fileServiceFindById.body;

            if (this.customerVehicleApprovedDetailUIDTO.file.contentType === 'application/pdf') {
                this.customerVehicleApprovedDetailUIDTO.dataURIPDF = 'data:' + this.customerVehicleApprovedDetailUIDTO.file.contentType +';base64,' + encodeURIComponent(this.customerVehicleApprovedDetailUIDTO.file.dataAsByteArray.toString());
            } else {
              this.customerVehicleApprovedDetailUIDTO.dataURI = `data:${this.customerVehicleApprovedDetailUIDTO.file.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
    */

    this.ngxSpinnerService.hide();
  }

  onClickOpenPDF() {
    if (this.customerVehicleApprovedDetailUIDTO.dataURIPDF) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`<iframe width="100%" height="100%" src="${this.customerVehicleApprovedDetailUIDTO.dataURIPDF}"></iframe>`);
      } else {
        console.error('Failed to open new tab.');
      }
    } else {
      console.error('No pdfSource available.');
    }
  }

  onClickCustomerVehicleApprovedSearch() {
    this.router.navigate(['customer-vehicle-approved']);
  }

  async onClickCustomerVehicleApprovedApprove() {

    if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.message == null || this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.message == "") {
      this.messageService.add({
        severity: 'warn',
        summary: '' + this.customerVehicleApprovedDetailUIDTO.warn_message_service_Generic,
        detail: '' + this.customerVehicleApprovedDetailUIDTO.message_not_null_message_service_CustomerVehicleApprovedDetail,
      });

      return;
    }

    this.ngxSpinnerService.show();

    /*
    try {

      this.customerVehicleApprovedDetailUIDTO.currentUser = this.sessionStorageService.getUser();

      this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.approvedBy = this.customerVehicleApprovedDetailUIDTO.currentUser.userId;

      const customerVehicleApprovedServiceSave = await firstValueFrom(this.customerVehicleApprovedService.update(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved).pipe(first()));

      if (customerVehicleApprovedServiceSave.status == 200) {
        if (customerVehicleApprovedServiceSave.body != null) {

          if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileTable == 'CUSTOMER') {
            if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileType == 'DRIVER_LICENSE') {
              this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseValidated = true;
            }

            if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileType == 'IDENTITY_NUMBER') {
              this.customerVehicleApprovedDetailUIDTO.customer.identityNumberValidated = true;
            }

            const customerServiceSave = await firstValueFrom(this.customerService.save(this.customerVehicleApprovedDetailUIDTO.customer).pipe(first()));
    
            if (customerServiceSave.status == 200) {
              if (customerServiceSave.body != null) {

                this.ngxSpinnerService.hide();

                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.customerVehicleApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.customerVehicleApprovedDetailUIDTO.success_approve_message_service_CustomerVehicleApprovedDetail,
                });
              }
            }
          }

          if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileTable == 'USER') {
            if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileType == 'PROFILE_PICTURE') {
              this.customerVehicleApprovedDetailUIDTO.user.photoValidated = true;
            }

            const userServiceUpdate = await firstValueFrom(this.userService.update(this.customerVehicleApprovedDetailUIDTO.user).pipe(first()));
    
            if (userServiceUpdate.status == 200) {
              if (userServiceUpdate.body != null) {

                this.ngxSpinnerService.hide();

                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.customerVehicleApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.customerVehicleApprovedDetailUIDTO.success_approve_message_service_CustomerVehicleApprovedDetail,
                });
              }
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
    */
  }

  async onClickCustomerVehicleApprovedDisapprove() {

    if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.message == null || this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.message == "") {
      this.messageService.add({
        severity: 'warn',
        summary: '' + this.customerVehicleApprovedDetailUIDTO.warn_message_service_Generic,
        detail: '' + this.customerVehicleApprovedDetailUIDTO.message_not_null_message_service_CustomerVehicleApprovedDetail,
      });

      return;
    }

    this.ngxSpinnerService.show();

    /*
    try {

      this.customerVehicleApprovedDetailUIDTO.currentUser = this.sessionStorageService.getUser();

      this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.reprovedBy = this.customerVehicleApprovedDetailUIDTO.currentUser.userId;

      const customerVehicleApprovedServiceSave = await firstValueFrom(this.customerVehicleApprovedService.update(this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved).pipe(first()));

      if (customerVehicleApprovedServiceSave.status == 200) {
        if (customerVehicleApprovedServiceSave.body != null) {

          if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileTable == 'CUSTOMER') {
            if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileType == 'DRIVER_LICENSE') {
              this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseValidated = false;
              this.customerVehicleApprovedDetailUIDTO.customer.driverLicenseFileId = "";
            }

            if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileType == 'IDENTITY_NUMBER') {
              this.customerVehicleApprovedDetailUIDTO.customer.identityNumberValidated = false;
              this.customerVehicleApprovedDetailUIDTO.customer.identityNumberFileId = "";
            }

            const customerServiceUpdate = await firstValueFrom(this.customerService.update(this.customerVehicleApprovedDetailUIDTO.customer).pipe(first()));
    
            if (customerServiceUpdate.status == 200) {
              if (customerServiceUpdate.body != null) {

                this.ngxSpinnerService.hide();

                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.customerVehicleApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.customerVehicleApprovedDetailUIDTO.success_disapprove_message_service_CustomerVehicleApprovedDetail,
                });
              }
            }
          }

          if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileTable == 'USER') {
            if (this.customerVehicleApprovedDetailUIDTO.customerVehicleApproved.fileType == 'PROFILE_PICTURE') {
              this.customerVehicleApprovedDetailUIDTO.user.photoValidated = false;
              this.customerVehicleApprovedDetailUIDTO.user.photoFileId = "";
            }

            const userServiceUpdate = await firstValueFrom(this.userService.update(this.customerVehicleApprovedDetailUIDTO.user).pipe(first()));
    
            if (userServiceUpdate.status == 200) {
              if (userServiceUpdate.body != null) {

                this.ngxSpinnerService.hide();

                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.customerVehicleApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.customerVehicleApprovedDetailUIDTO.success_disapprove_message_service_CustomerVehicleApprovedDetail,
                });
              }
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
    */
  }
}