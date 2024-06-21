import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRoleSearchUIDTO } from './dto/user-role-search-ui-dto.dto';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { UserRoleService } from '../../service/user-role.service';
import { first, firstValueFrom } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';
import { UserRole } from '../../entity/user-role.entity';
import { UserRoleRegisterComponent } from '../user-role-register/user-role-register.component';
import { UserRoleSearchDTO } from '../../dto/user-role-search-dto';
import { UserService } from 'src/app/page/user/service/user.service';
import { RoleService } from '../../../role/service/role.service';

@Component({
  selector: 'app-user-role-search',
  templateUrl: './user-role-search.component.html',
  styleUrls: ['./user-role-search.component.css']
})
export class UserRoleSearchComponent implements OnInit {

  userRoleSearchUIDTO: UserRoleSearchUIDTO;
  userRoleSearchForm: NgForm;

  @ViewChild(UserRoleRegisterComponent, {static: true}) userRoleRegisterComponent: UserRoleRegisterComponent;

  constructor(private ngxSpinnerService: NgxSpinnerService,
              private messageService: MessageService,
              private translateService: TranslateService,
              private roleService: RoleService,
              private userRoleService: UserRoleService) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetSearchForm();
  }

  resetSearchForm() {

    this.userRoleSearchUIDTO = new UserRoleSearchUIDTO();
    
    this.userRoleSearchUIDTO.userRoleSearchDTO = new UserRoleSearchDTO();

    this.userRoleSearchUIDTO.userRole = new UserRole();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic', 
        'warn_message_service_Generic',
        'table_header_display_name_UserRoleSearch',
        'table_header_email_UserRoleSearch',
        'table_header_role_name_UserRoleSearch',
        'table_header_enabled_UserRoleSearch'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.userRoleSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.userRoleSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.userRoleSearchUIDTO.table_header_display_name_UserRoleSearch = translations['table_header_display_name_UserRoleSearch'];
      this.userRoleSearchUIDTO.table_header_email_UserRoleSearch = translations['table_header_email_UserRoleSearch'];
      this.userRoleSearchUIDTO.table_header_role_name_UserRoleSearch = translations['table_header_role_name_UserRoleSearch'];
      this.userRoleSearchUIDTO.table_header_enabled_UserRoleSearch = translations['table_header_enabled_UserRoleSearch'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.userRoleSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const roleServiceFindAll = await firstValueFrom(this.roleService.findAll().pipe(first()));

      if (roleServiceFindAll.status == 200) {

        if (roleServiceFindAll.body != null && roleServiceFindAll.body.length > 0) {
          this.userRoleSearchUIDTO.roles = roleServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.userRoleSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.userRoleSearchUIDTO.columns = [
      { field: 'user.displayName', sortField: 'user.displayName', header: '' + this.userRoleSearchUIDTO.table_header_display_name_UserRoleSearch },
      { field: 'user.email', sortField: 'user.email', header: '' + this.userRoleSearchUIDTO.table_header_email_UserRoleSearch },
      { field: 'role.roleName', sortField: 'role.roleName', header: '' + this.userRoleSearchUIDTO.table_header_role_name_UserRoleSearch },
      { field: 'enabled', sortField: 'enabled', header: '' + this.userRoleSearchUIDTO.table_header_enabled_UserRoleSearch },
    ];

    this.ngxSpinnerService.hide();
  }

  search(event: TableLazyLoadEvent) {

    if (event && event.sortField) {
      this.userRoleSearchUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.userRoleSearchUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.userRoleSearchUIDTO.sortDir = "ASC";
      }
    }

    if (this.userRoleSearchUIDTO.enabledValue != null) {
      if (this.userRoleSearchUIDTO.enabledValue == 'ALL') {
        this.userRoleSearchUIDTO.userRoleSearchDTO.enabled = null;
      } else if (this.userRoleSearchUIDTO.enabledValue == 'ON') {
        this.userRoleSearchUIDTO.userRoleSearchDTO.enabled = true;
      } else if (this.userRoleSearchUIDTO.enabledValue == 'OFF') {
        this.userRoleSearchUIDTO.userRoleSearchDTO.enabled = false;
      }
    }

    if (this.userRoleSearchUIDTO.selectedRole != null) {
      this.userRoleSearchUIDTO.userRoleSearchDTO.roleId = this.userRoleSearchUIDTO.selectedRole.roleId;
    } else {
      this.userRoleSearchUIDTO.userRoleSearchDTO.roleId = null;
    }
  
    this.userRoleService.searchPage(this.userRoleSearchUIDTO.userRoleSearchDTO, this.userRoleSearchUIDTO.page, this.userRoleSearchUIDTO.size, this.userRoleSearchUIDTO.sortDir, this.userRoleSearchUIDTO.sortBy).pipe(first()).subscribe({
      next: (data: any) => {

        this.userRoleSearchUIDTO.userRoles = data.body.content;
        this.userRoleSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: '' + this.userRoleSearchUIDTO.error_message_service_Generic, detail: error.error.message });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  paginate(event: any) {
    this.userRoleSearchUIDTO.size = event.rows;
    this.userRoleSearchUIDTO.page = event.first / event.rows;
  }

  onChangeEnabled(event: any){
    this.userRoleSearchUIDTO.enabledValue = event.value;
  }
}