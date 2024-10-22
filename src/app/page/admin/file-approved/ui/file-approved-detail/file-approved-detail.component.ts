import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { FileApprovedDetailUIDTO } from './dto/file-approved-detail-ui-dto.dto';
import { UserService } from 'src/app/page/user/service/user.service';
import { first, firstValueFrom } from 'rxjs';
import { FileApprovedService } from '../../service/file-approved.service';
import { FileApproved } from '../../entity/file-approved.entity';
import { FileService } from 'src/app/page/file/service/file.service';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { Customer } from 'src/app/global/page/customer/entity/customer.entity';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { User } from 'src/app/page/user/entity/user.entity';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-file-approved-detail',
  templateUrl: './file-approved-detail.component.html',
  styleUrls: ['./file-approved-detail.component.css'],
})
export class FileApprovedDetailComponent implements OnInit {

  fileApprovedId: string | null;
  fileApprovedDetailUIDTO: FileApprovedDetailUIDTO;

  fileApprovedDetailForm: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private ngxSpinnerService: NgxSpinnerService,
              private messageService: MessageService,
              private sessionStorageService: SessionStorageService,
              private translateService: TranslateService,
              private customerService: CustomerService,
              private fileService: FileService,
              private fileApprovedService: FileApprovedService,
              private userService: UserService) { 

    this.activatedRoute.paramMap.subscribe(params => {
      this.fileApprovedId = params.get('fileApprovedId');
    });
  }

  ngOnInit(): void {
    this.resetDetailForm();
  }

  resetDetailForm() {

    this.fileApprovedDetailUIDTO = new FileApprovedDetailUIDTO();

    this.fileApprovedDetailUIDTO.fileApproved = new FileApproved();
    this.fileApprovedDetailUIDTO.customer = new Customer();
    this.fileApprovedDetailUIDTO.currentUser = new User();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic', 
        'warn_message_service_Generic',
        'success_message_service_Generic',
        'message_not_null_message_service_FileApprovedDetail',
        'success_approve_message_service_FileApprovedDetail',
        'success_disapprove_message_service_FileApprovedDetail'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.fileApprovedDetailUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.fileApprovedDetailUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.fileApprovedDetailUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.fileApprovedDetailUIDTO.message_not_null_message_service_FileApprovedDetail = translations['message_not_null_message_service_FileApprovedDetail'];
      this.fileApprovedDetailUIDTO.success_approve_message_service_FileApprovedDetail = translations['success_approve_message_service_FileApprovedDetail'];
      this.fileApprovedDetailUIDTO.success_disapprove_message_service_FileApprovedDetail = translations['success_disapprove_message_service_FileApprovedDetail'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      if (this.fileApprovedId != null) {

        const fileApprovedServiceFindById = await firstValueFrom(this.fileApprovedService.findById(this.fileApprovedId).pipe(first()));
  
        if (fileApprovedServiceFindById.status == 200) {
          if (fileApprovedServiceFindById.body != null) {
            this.fileApprovedDetailUIDTO.fileApproved = fileApprovedServiceFindById.body;
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      if (this.fileApprovedDetailUIDTO.fileApproved.userId != null) {

        const userServiceFindById = await firstValueFrom(this.userService.findById(this.fileApprovedDetailUIDTO.fileApproved.userId).pipe(first()));
  
        if (userServiceFindById.status == 200) {
          if (userServiceFindById.body != null) {

            this.fileApprovedDetailUIDTO.user = userServiceFindById.body;

            const customerServiceFindByEmail = await firstValueFrom(this.customerService.findByEmail(this.fileApprovedDetailUIDTO.user.email).pipe(first()));

            if (customerServiceFindByEmail.status == 200) {
              if (customerServiceFindByEmail.body != null) {

                this.fileApprovedDetailUIDTO.customer = customerServiceFindByEmail.body

                if (this.fileApprovedDetailUIDTO.customer.createdDate != null) {
                  this.fileApprovedDetailUIDTO.customer.createdDate = moment(this.fileApprovedDetailUIDTO.customer.createdDate).toDate();
                }
    
                if (this.fileApprovedDetailUIDTO.customer.dateOfBirth != null) {
                  this.fileApprovedDetailUIDTO.customer.dateOfBirth = moment(this.fileApprovedDetailUIDTO.customer.dateOfBirth).toDate();
                }
      
                if (this.fileApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate != null) {
                  this.fileApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate = moment(this.fileApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate).toDate();
                }
      
                if (this.fileApprovedDetailUIDTO.customer.driverLicenseExpirationDate != null) {
                  this.fileApprovedDetailUIDTO.customer.driverLicenseExpirationDate = moment(this.fileApprovedDetailUIDTO.customer.driverLicenseExpirationDate).toDate();
                }
      
                if (this.fileApprovedDetailUIDTO.customer.driverLicenseIssueDate != null) {
                  this.fileApprovedDetailUIDTO.customer.driverLicenseIssueDate = moment(this.fileApprovedDetailUIDTO.customer.driverLicenseIssueDate).toDate();
                }
              }
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      if (this.fileApprovedDetailUIDTO.fileApproved.customerId != null) {

        const customerServiceFindById = await firstValueFrom(this.customerService.findById(this.fileApprovedDetailUIDTO.fileApproved.customerId).pipe(first()));
  
        if (customerServiceFindById.status == 200) {
          if (customerServiceFindById.body != null) {
            this.fileApprovedDetailUIDTO.customer = customerServiceFindById.body;

            if (this.fileApprovedDetailUIDTO.customer.createdDate != null) {
              this.fileApprovedDetailUIDTO.customer.createdDate = moment(this.fileApprovedDetailUIDTO.customer.createdDate).toDate();
            }

            if (this.fileApprovedDetailUIDTO.customer.dateOfBirth != null) {
              this.fileApprovedDetailUIDTO.customer.dateOfBirth = moment(this.fileApprovedDetailUIDTO.customer.dateOfBirth).toDate();
            }
  
            if (this.fileApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate != null) {
              this.fileApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate = moment(this.fileApprovedDetailUIDTO.customer.driverLicenseFirstLicenseDate).toDate();
            }
  
            if (this.fileApprovedDetailUIDTO.customer.driverLicenseExpirationDate != null) {
              this.fileApprovedDetailUIDTO.customer.driverLicenseExpirationDate = moment(this.fileApprovedDetailUIDTO.customer.driverLicenseExpirationDate).toDate();
            }
  
            if (this.fileApprovedDetailUIDTO.customer.driverLicenseIssueDate != null) {
              this.fileApprovedDetailUIDTO.customer.driverLicenseIssueDate = moment(this.fileApprovedDetailUIDTO.customer.driverLicenseIssueDate).toDate();
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      if (this.fileApprovedDetailUIDTO.fileApproved != null) {

        const fileServiceFindById = await firstValueFrom(this.fileService.findById(this.fileApprovedDetailUIDTO.fileApproved.fileId).pipe(first()));
  
        if (fileServiceFindById.status == 200) {
          if (fileServiceFindById.body != null) {
            this.fileApprovedDetailUIDTO.file = fileServiceFindById.body;

            if (this.fileApprovedDetailUIDTO.file.contentType === 'application/pdf') {
                this.fileApprovedDetailUIDTO.dataURIPDF = 'data:' + this.fileApprovedDetailUIDTO.file.contentType +';base64,' + encodeURIComponent(this.fileApprovedDetailUIDTO.file.dataAsByteArray.toString());
            } else {
              this.fileApprovedDetailUIDTO.dataURI = `data:${this.fileApprovedDetailUIDTO.file.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.ngxSpinnerService.hide();
  }

  onClickOpenPDF() {
    if (this.fileApprovedDetailUIDTO.dataURIPDF) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`<iframe width="100%" height="100%" src="${this.fileApprovedDetailUIDTO.dataURIPDF}"></iframe>`);
      } else {
        console.error('Failed to open new tab.');
      }
    } else {
      console.error('No pdfSource available.');
    }
  }

  onClickFileApprovedSearch() {
    this.router.navigate(['file-approved']);
  }

  async onClickFileApprovedApprove() {

    if (this.fileApprovedDetailUIDTO.fileApproved.message == null || this.fileApprovedDetailUIDTO.fileApproved.message == "") {
      this.messageService.add({
        severity: 'warn',
        summary: '' + this.fileApprovedDetailUIDTO.warn_message_service_Generic,
        detail: '' + this.fileApprovedDetailUIDTO.message_not_null_message_service_FileApprovedDetail,
      });

      return;
    }

    this.ngxSpinnerService.show();

    try {

      this.fileApprovedDetailUIDTO.currentUser = this.sessionStorageService.getUser();

      this.fileApprovedDetailUIDTO.fileApproved.approvedBy = this.fileApprovedDetailUIDTO.currentUser.userId;

      const fileApprovedServiceSave = await firstValueFrom(this.fileApprovedService.update(this.fileApprovedDetailUIDTO.fileApproved).pipe(first()));

      if (fileApprovedServiceSave.status == 200) {
        if (fileApprovedServiceSave.body != null) {

          if (this.fileApprovedDetailUIDTO.fileApproved.fileTable == 'CUSTOMER') {
            if (this.fileApprovedDetailUIDTO.fileApproved.fileType == 'DRIVER_LICENSE') {
              this.fileApprovedDetailUIDTO.customer.driverLicenseValidated = true;
            }

            if (this.fileApprovedDetailUIDTO.fileApproved.fileType == 'IDENTITY_NUMBER') {
              this.fileApprovedDetailUIDTO.customer.identityNumberValidated = true;
            }

            const customerServiceSave = await firstValueFrom(this.customerService.save(this.fileApprovedDetailUIDTO.customer).pipe(first()));
    
            if (customerServiceSave.status == 200) {
              if (customerServiceSave.body != null) {

                this.ngxSpinnerService.hide();

                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.fileApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.fileApprovedDetailUIDTO.success_approve_message_service_FileApprovedDetail,
                });
              }
            }
          }

          if (this.fileApprovedDetailUIDTO.fileApproved.fileTable == 'USER') {
            if (this.fileApprovedDetailUIDTO.fileApproved.fileType == 'PROFILE_PICTURE') {
              this.fileApprovedDetailUIDTO.user.photoValidated = true;
            }

            const userServiceUpdate = await firstValueFrom(this.userService.update(this.fileApprovedDetailUIDTO.user).pipe(first()));
    
            if (userServiceUpdate.status == 200) {
              if (userServiceUpdate.body != null) {

                this.ngxSpinnerService.hide();

                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.fileApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.fileApprovedDetailUIDTO.success_approve_message_service_FileApprovedDetail,
                });
              }
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
  }

  async onClickFileApprovedDisapprove() {

    if (this.fileApprovedDetailUIDTO.fileApproved.message == null || this.fileApprovedDetailUIDTO.fileApproved.message == "") {
      this.messageService.add({
        severity: 'warn',
        summary: '' + this.fileApprovedDetailUIDTO.warn_message_service_Generic,
        detail: '' + this.fileApprovedDetailUIDTO.message_not_null_message_service_FileApprovedDetail,
      });

      return;
    }

    this.ngxSpinnerService.show();

    try {

      this.fileApprovedDetailUIDTO.currentUser = this.sessionStorageService.getUser();

      this.fileApprovedDetailUIDTO.fileApproved.reprovedBy = this.fileApprovedDetailUIDTO.currentUser.userId;

      const fileApprovedServiceSave = await firstValueFrom(this.fileApprovedService.update(this.fileApprovedDetailUIDTO.fileApproved).pipe(first()));

      if (fileApprovedServiceSave.status == 200) {
        if (fileApprovedServiceSave.body != null) {

          if (this.fileApprovedDetailUIDTO.fileApproved.fileTable == 'CUSTOMER') {
            if (this.fileApprovedDetailUIDTO.fileApproved.fileType == 'DRIVER_LICENSE') {
              this.fileApprovedDetailUIDTO.customer.driverLicenseValidated = false;
              this.fileApprovedDetailUIDTO.customer.driverLicenseFileId = "";
            }

            if (this.fileApprovedDetailUIDTO.fileApproved.fileType == 'IDENTITY_NUMBER') {
              this.fileApprovedDetailUIDTO.customer.identityNumberValidated = false;
              this.fileApprovedDetailUIDTO.customer.identityNumberFileId = "";
            }

            const customerServiceUpdate = await firstValueFrom(this.customerService.update(this.fileApprovedDetailUIDTO.customer).pipe(first()));
    
            if (customerServiceUpdate.status == 200) {
              if (customerServiceUpdate.body != null) {

                this.ngxSpinnerService.hide();

                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.fileApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.fileApprovedDetailUIDTO.success_disapprove_message_service_FileApprovedDetail,
                });
              }
            }
          }

          if (this.fileApprovedDetailUIDTO.fileApproved.fileTable == 'USER') {
            if (this.fileApprovedDetailUIDTO.fileApproved.fileType == 'PROFILE_PICTURE') {
              this.fileApprovedDetailUIDTO.user.photoValidated = false;
              this.fileApprovedDetailUIDTO.user.photoFileId = "";
            }

            const userServiceUpdate = await firstValueFrom(this.userService.update(this.fileApprovedDetailUIDTO.user).pipe(first()));
    
            if (userServiceUpdate.status == 200) {
              if (userServiceUpdate.body != null) {

                this.ngxSpinnerService.hide();

                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.fileApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.fileApprovedDetailUIDTO.success_disapprove_message_service_FileApprovedDetail,
                });
              }
            }
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }
  }
}