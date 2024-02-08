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

@Component({
  selector: 'app-file-approved-detail',
  templateUrl: './file-approved-detail.component.html',
  styleUrls: ['./file-approved-detail.component.css']
})
export class FileApprovedDetailComponent implements OnInit {

  fileApprovedId: string | null;
  fileApprovedDetailUIDTO: FileApprovedDetailUIDTO;

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
    this.translateService.setDefaultLang('pt_BR');
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
        'message_not_null_message_service_FileApprovedDetail'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.fileApprovedDetailUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.fileApprovedDetailUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.fileApprovedDetailUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.fileApprovedDetailUIDTO.message_not_null_message_service_FileApprovedDetail = translations['message_not_null_message_service_FileApprovedDetail'];

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

      if (this.fileApprovedDetailUIDTO.fileApproved.customerId != null) {

        const customerServiceFindById = await firstValueFrom(this.customerService.findById(this.fileApprovedDetailUIDTO.fileApproved.customerId).pipe(first()));
  
        if (customerServiceFindById.status == 200) {
          if (customerServiceFindById.body != null) {
            this.fileApprovedDetailUIDTO.customer = customerServiceFindById.body;
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

            const byteArray = this.fileApprovedDetailUIDTO.file.dataAsByteArray;
            const contentType = this.fileApprovedDetailUIDTO.file.contentType;

            this.fileApprovedDetailUIDTO.dataURI = `data:${contentType};base64,${byteArray}`;
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

            const customerServiceSave = await firstValueFrom(this.customerService.save(this.fileApprovedDetailUIDTO.customer).pipe(first()));
    
            if (customerServiceSave.status == 200) {
              if (customerServiceSave.body != null) {
                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.fileApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.fileApprovedDetailUIDTO.success_message_service_Generic,
                });
              }
            }
          }

          if (this.fileApprovedDetailUIDTO.fileApproved.fileTable == 'USER') {

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

    try {

      this.fileApprovedDetailUIDTO.currentUser = this.sessionStorageService.getUser();

      this.fileApprovedDetailUIDTO.fileApproved.reprovedBy = this.fileApprovedDetailUIDTO.currentUser.userId;

      const fileApprovedServiceSave = await firstValueFrom(this.fileApprovedService.update(this.fileApprovedDetailUIDTO.fileApproved).pipe(first()));

      if (fileApprovedServiceSave.status == 200) {
        if (fileApprovedServiceSave.body != null) {

          if (this.fileApprovedDetailUIDTO.fileApproved.fileTable == 'CUSTOMER') {
            if (this.fileApprovedDetailUIDTO.fileApproved.fileType == 'DRIVER_LICENSE') {
              this.fileApprovedDetailUIDTO.customer.driverLicenseValidated = false;
            }

            const customerServiceSave = await firstValueFrom(this.customerService.save(this.fileApprovedDetailUIDTO.customer).pipe(first()));
    
            if (customerServiceSave.status == 200) {
              if (customerServiceSave.body != null) {
                this.messageService.add({
                  severity: 'success',
                  summary: '' + this.fileApprovedDetailUIDTO.success_message_service_Generic,
                  detail: '' + this.fileApprovedDetailUIDTO.success_message_service_Generic,
                });
              }
            }
          }

          if (this.fileApprovedDetailUIDTO.fileApproved.fileTable == 'USER') {

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