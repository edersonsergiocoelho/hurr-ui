import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first, firstValueFrom } from 'rxjs';
import { FileApprovedService } from '../../service/file-approved.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { FileApprovedSearchUIDTO } from './dto/file-approved-search-ui-dto.dto';
import { FileApprovedSearchDTO } from '../../dto/file-approved-search-dto.dto';
import { MessageService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { UserService } from 'src/app/page/user/service/user.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-file-approved-search',
  templateUrl: './file-approved-search.component.html',
  styleUrls: ['./file-approved-search.component.css']
})
export class FileApprovedSearchComponent implements OnInit {

  fileApprovedSearchUIDTO: FileApprovedSearchUIDTO;
  fileApprovedSearchForm: NgForm;

  constructor(private router: Router,
              private ngxSpinnerService: NgxSpinnerService,
              private messageService: MessageService,
              private translateService: TranslateService,
              private fileApprovedService: FileApprovedService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetSearchForm();
  }

  resetSearchForm() {

    this.fileApprovedSearchUIDTO = new FileApprovedSearchUIDTO();
    
    this.fileApprovedSearchUIDTO.fileApprovedSearchDTO = new FileApprovedSearchDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    this.fileApprovedSearchUIDTO.fileTables = [
      { name: 'CUSTOMER', code: 'CUSTOMER' },
      { name: 'USER', code: 'USER' }
    ];

    this.fileApprovedSearchUIDTO.fileTypes = [
      { name: 'DRIVER_LICENSE', code: 'DRIVER_LICENSE' },
      { name: 'IDENTITY_NUMBER', code: 'IDENTITY_NUMBER' },
      { name: 'PROFILE_PICTURE', code: 'PROFILE_PICTURE' }
    ];

    try {

      const keys = [
        'error_message_service_Generic', 
        'warn_message_service_Generic',
        'table_header_file_approved_id_FileApprovedSearch',
        'table_header_file_table_FileApprovedSearch',
        'table_header_file_type_FileApprovedSearch',
        'table_header_customer_user_FileApprovedSearch',
        'table_header_created_date_FileApprovedSearch',
        'table_header_enabled_FileApprovedSearch',
        'table_header_action_FileApprovedSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.fileApprovedSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.fileApprovedSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.fileApprovedSearchUIDTO.table_header_file_approved_id_FileApprovedSearch = translations['table_header_file_approved_id_FileApprovedSearch'];
      this.fileApprovedSearchUIDTO.table_header_file_table_FileApprovedSearch = translations['table_header_file_table_FileApprovedSearch'];
      this.fileApprovedSearchUIDTO.table_header_file_type_FileApprovedSearch = translations['table_header_file_type_FileApprovedSearch'];
      this.fileApprovedSearchUIDTO.table_header_customer_user_FileApprovedSearch = translations['table_header_customer_user_FileApprovedSearch'];
      this.fileApprovedSearchUIDTO.table_header_created_date_FileApprovedSearch = translations['table_header_created_date_FileApprovedSearch'];
      this.fileApprovedSearchUIDTO.table_header_enabled_FileApprovedSearch = translations['table_header_enabled_FileApprovedSearch'];
      this.fileApprovedSearchUIDTO.table_header_action_FileApprovedSearch = translations['table_header_action_FileApprovedSearch'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const userServiceFindAll = await firstValueFrom(this.userService.findAll().pipe(first()));

      if (userServiceFindAll.status == 200) {

        if (userServiceFindAll.body != null && userServiceFindAll.body.length > 0) {
          this.fileApprovedSearchUIDTO.approvedByUsers = userServiceFindAll.body;
          this.fileApprovedSearchUIDTO.reprovedByUsers = userServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.fileApprovedSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.fileApprovedSearchUIDTO.columns = [
      { field: 'fileApprovedId', header: '' + this.fileApprovedSearchUIDTO.table_header_file_approved_id_FileApprovedSearch },
      { field: 'fileTable', sortField: 'fileTable', header: '' + this.fileApprovedSearchUIDTO.table_header_file_table_FileApprovedSearch },
      { field: 'fileType', sortField: 'fileType', header: '' + this.fileApprovedSearchUIDTO.table_header_file_type_FileApprovedSearch },
      { header: '' + this.fileApprovedSearchUIDTO.table_header_customer_user_FileApprovedSearch },
      { field: 'createdDate', sortField: 'createdDate', header: '' + this.fileApprovedSearchUIDTO.table_header_created_date_FileApprovedSearch },
      { field: 'enabled', sortField: 'enabled', header: '' + this.fileApprovedSearchUIDTO.table_header_enabled_FileApprovedSearch },
      { header: '' + this.fileApprovedSearchUIDTO.table_header_action_FileApprovedSearch },
    ];

    this.ngxSpinnerService.hide();
  }

  search(event: TableLazyLoadEvent) {

    if (event && event.sortField) {
      this.fileApprovedSearchUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.fileApprovedSearchUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.fileApprovedSearchUIDTO.sortDir = "ASC";
      }
    }

    if (this.fileApprovedSearchUIDTO.enabledValue != null) {
      if (this.fileApprovedSearchUIDTO.enabledValue == 'ALL') {
        this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.enabled = null;
      } else if (this.fileApprovedSearchUIDTO.enabledValue == 'ON') {
        this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.enabled = true;
      } else if (this.fileApprovedSearchUIDTO.enabledValue == 'OFF') {
        this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.enabled = false;
      }
    }

    if (this.fileApprovedSearchUIDTO.filterValue != null) {
      if (this.fileApprovedSearchUIDTO.filterValue == 'ALL') {
        this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.filter = null;
      } else if (this.fileApprovedSearchUIDTO.filterValue == 'AGUARDANDO_APROVACAO') {
        this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.filter = 'AGUARDANDO_APROVACAO';
      }
    }

    if (this.fileApprovedSearchUIDTO.selectedFileTable != null) {
      this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.fileTable = this.fileApprovedSearchUIDTO.selectedFileTable.code;
    } else {
      this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.fileTable = null;
    }

    if (this.fileApprovedSearchUIDTO.selectedFileType != null) {
      this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.fileType = this.fileApprovedSearchUIDTO.selectedFileType.code;
    } else {
      this.fileApprovedSearchUIDTO.fileApprovedSearchDTO.fileType = null;
    }
  
    this.fileApprovedService.searchPage(this.fileApprovedSearchUIDTO.fileApprovedSearchDTO, this.fileApprovedSearchUIDTO.page, this.fileApprovedSearchUIDTO.size, this.fileApprovedSearchUIDTO.sortDir, this.fileApprovedSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {

        this.fileApprovedSearchUIDTO.fileApproveds = data.body.content;
        this.fileApprovedSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: '' + this.fileApprovedSearchUIDTO.error_message_service_Generic, detail: error.error.message });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  paginate(event: any) {
    this.fileApprovedSearchUIDTO.size = event.rows;
    this.fileApprovedSearchUIDTO.page = event.first / event.rows;
  }

  onChangeEnabled(event: any){
    this.fileApprovedSearchUIDTO.enabledValue = event.value;
  }

  onChangeFilter(event: any){
    this.fileApprovedSearchUIDTO.filterValue = event.value;
  }

  onClickFileApprovedDetail(rowData) {
    this.router.navigate(['file-approved/detail/' + rowData.fileApprovedId]);
  }
}