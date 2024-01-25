import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleSearchUIDTO } from './dto/role-search-ui-dto.dto';
import { RoleService } from '../../service/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TableLazyLoadEvent } from 'primeng/table';
import { first, firstValueFrom } from 'rxjs';
import { Role } from '../../entity/role.entity';
import { RoleDTO } from '../../dto/role-dto.dto';
import { RoleRegisterComponent } from '../role-register/role-register.component';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.css']
})
export class RoleSearchComponent implements OnInit {

  roleSearchUIDTO: RoleSearchUIDTO;
  roleSearchForm: NgForm;

  @ViewChild(RoleRegisterComponent, {static: true}) roleRegisterComponent: RoleRegisterComponent;

  constructor(private ngxSpinnerService: NgxSpinnerService,
              private messageService: MessageService,
              private translateService: TranslateService,
              private roleService: RoleService) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetSearchForm();
  }

  resetSearchForm() {

    this.roleSearchUIDTO = new RoleSearchUIDTO();
    
    this.roleSearchUIDTO.role = new Role();

    this.roleSearchUIDTO.roleDTO = new RoleDTO();
    this.roleSearchUIDTO.roleDTO.roleName = "";

    this.roleSearchUIDTO.enabledValue = "";

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      this.roleSearchUIDTO.error_message_service_Generic = await firstValueFrom(this.translateService.get('error_message_service_Generic').pipe(first()));

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.roleSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.roleSearchUIDTO.columns = [
      //{ field: 'roleId', sortField: 'status', header: '' + this.roleSearchUIDTO.table_header_status_BroadcastSearch },
      //{ field: 'name', sortField: 'subject', header: '' + this.roleSearchUIDTO.table_header_subject_BroadcastSearch }
      { field: 'roleId', header: 'ID' },
      { field: 'roleName', sortField: 'roleName', header: 'Nome' },
      { field: 'enabled', sortField: 'enabled', header: 'Habilitado?' },
    ];

    this.ngxSpinnerService.hide();
  }

  search(event: TableLazyLoadEvent) {

    if (event && event.sortField) {
      this.roleSearchUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.roleSearchUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.roleSearchUIDTO.sortDir = "ASC";
      }
    }

    let enabled: boolean | null = null;

    if (this.roleSearchUIDTO.enabledValue != null) {
      if (this.roleSearchUIDTO.enabledValue == 'ON') {
        enabled = true;
      } else if (this.roleSearchUIDTO.enabledValue == 'OFF') {
        enabled = false;
      }
    }
  
    this.roleService.searchPage(this.roleSearchUIDTO.roleDTO.roleName, enabled, this.roleSearchUIDTO.page, this.roleSearchUIDTO.size, this.roleSearchUIDTO.sortDir, this.roleSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {

        this.roleSearchUIDTO.roles = data.body.content;
        this.roleSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: '' + this.roleSearchUIDTO.error_message_service_Generic, detail: error.error.message });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  paginate(event: any) {
    this.roleSearchUIDTO.size = event.rows;
    this.roleSearchUIDTO.page = event.first / event.rows;
  }

  onChangeEnabled(event: any){
    this.roleSearchUIDTO.enabledValue = event.value;
  }
}