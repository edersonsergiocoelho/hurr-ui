import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRoleDTO } from '../../dto/user-role-dto.dto';
import { UserRole } from '../../entity/user-role.entity';
import { UserRoleRegisterUIDTO } from './dto/user-role-register-ui-dto.dto';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRoleService } from '../../service/user-role.service';
import { UserRoleSearchComponent } from '../user-role-search/user-role-search.component';
import { first, firstValueFrom } from 'rxjs';
import { UserRoleIdDTO } from '../../dto/user-role-dto-id.dto';
import { RoleService } from '../../../role/service/role.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../../role/entity/role.entity';
import { User } from 'src/app/page/user/entity/user.entity';
import { UserService } from 'src/app/page/user/service/user.service';

@Component({
  selector: 'app-user-role-register',
  templateUrl: './user-role-register.component.html',
  styleUrls: ['./user-role-register.component.css']
})
export class UserRoleRegisterComponent implements OnInit {

  userRoleRegisterUIDTO: UserRoleRegisterUIDTO;
  @ViewChild('userRoleRegisterForm') userRoleRegisterForm: NgForm;

  @ViewChild(UserRoleSearchComponent, {static: true}) roleSearchComponent: UserRoleSearchComponent;

  constructor(private ngxSpinnerService: NgxSpinnerService,
              private messageService: MessageService,
              private translateService: TranslateService,
              private roleService: RoleService,
              private userService: UserService,
              private userRoleService: UserRoleService) { }

  ngOnInit (): void {
    this.resetRegisterForm();
  }

  resetRegisterForm () {

    this.userRoleRegisterUIDTO = new UserRoleRegisterUIDTO();
    
    this.userRoleRegisterUIDTO.userRoleDTO = new UserRoleDTO();
    this.userRoleRegisterUIDTO.userRoleDTO.userRoleId = new UserRoleIdDTO();

    this.userRoleRegisterUIDTO.users = new Array<User>;
    this.userRoleRegisterUIDTO.selectedUser = null;

    this.userRoleRegisterUIDTO.roles = new Array<Role>;
    this.userRoleRegisterUIDTO.selectedRole = null;

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'save_message_service_Generic',
        'update_message_service_Generic',
        'delete_message_service_Generic',
        'save_success_message_service_UserRoleRegister',
        'update_success_message_service_UserRoleRegister',
        'delete_success_message_service_UserRoleRegister'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.userRoleRegisterUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.userRoleRegisterUIDTO.save_message_service_Generic = translations['save_message_service_Generic'];
      this.userRoleRegisterUIDTO.update_message_service_Generic = translations['update_message_service_Generic'];
      this.userRoleRegisterUIDTO.delete_message_service_Generic = translations['delete_message_service_Generic'];
      this.userRoleRegisterUIDTO.save_success_message_service_UserRoleRegister = translations['save_success_message_service_UserRoleRegister'];
      this.userRoleRegisterUIDTO.update_success_message_service_UserRoleRegister = translations['update_success_message_service_UserRoleRegister'];
      this.userRoleRegisterUIDTO.delete_success_message_service_UserRoleRegister = translations['delete_success_message_service_UserRoleRegister'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.userRoleRegisterUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const userServiceFindAll = await firstValueFrom(this.userService.findAll().pipe(first()));

      if (userServiceFindAll.status == 200) {

        if (userServiceFindAll.body != null && userServiceFindAll.body.length > 0) {
          this.userRoleRegisterUIDTO.users = userServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.userRoleRegisterUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const roleServiceFindAll = await firstValueFrom(this.roleService.findAll().pipe(first()));

      if (roleServiceFindAll.status == 200) {

        if (roleServiceFindAll.body != null && roleServiceFindAll.body.length > 0) {
          this.userRoleRegisterUIDTO.roles = roleServiceFindAll.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.userRoleRegisterUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.ngxSpinnerService.hide();
  }

  onRowSelectEdit (event: any) {

    this.userRoleRegisterUIDTO.userRoleDTO = new UserRoleDTO();
    this.userRoleRegisterUIDTO.userRoleDTO.userRoleId = new UserRoleIdDTO();

    if (event.data != null) {

      this.userRoleRegisterUIDTO.userRoleDTO = UserRole.toDTO(event.data);

      this.userRoleRegisterUIDTO.userId = this.userRoleRegisterUIDTO.userRoleDTO.userRoleId.userId;
      this.userRoleRegisterUIDTO.roleId = this.userRoleRegisterUIDTO.userRoleDTO.userRoleId.roleId;

      this.userRoleRegisterUIDTO.userRoleDTO.createdDate = new Date(this.userRoleRegisterUIDTO.userRoleDTO.createdDate);

      if (this.userRoleRegisterUIDTO.userRoleDTO.modifiedDate != null) {
        this.userRoleRegisterUIDTO.userRoleDTO.modifiedDate = new Date(this.userRoleRegisterUIDTO.userRoleDTO.modifiedDate);
      }

      this.userRoleRegisterUIDTO.selectedUser = event.data.user;
      this.userRoleRegisterUIDTO.selectedRole = event.data.role;
    }
  }

  save() {

    this.ngxSpinnerService.show();

    const userRole = UserRoleDTO.toEntity(this.userRoleRegisterUIDTO.userRoleDTO);

    if (this.userRoleRegisterUIDTO.selectedUser != null) {
      userRole.userRoleId.userId = this.userRoleRegisterUIDTO.selectedUser.userId;
    }

    if (this.userRoleRegisterUIDTO.selectedRole != null) {
      userRole.userRoleId.roleId = this.userRoleRegisterUIDTO.selectedRole.roleId;
    }

    this.userRoleService.save(userRole).pipe(first()).subscribe({
      next: (data: any) => {

        this.messageService.add({ 
          severity: 'success', 
          summary: '' + this.userRoleRegisterUIDTO.save_message_service_Generic, 
          detail: '' + this.userRoleRegisterUIDTO.save_success_message_service_UserRoleRegister });

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: '' + this.userRoleRegisterUIDTO.error_message_service_Generic, detail: error.error.message });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.resetRegisterForm();
        this.ngxSpinnerService.hide();
      }
    });
  }

  update() {

    this.ngxSpinnerService.show();

    const userRole = UserRoleDTO.toEntity(this.userRoleRegisterUIDTO.userRoleDTO);

    if (this.userRoleRegisterUIDTO.selectedRole != null) {
      userRole.userRoleId.roleId = this.userRoleRegisterUIDTO.selectedRole.roleId;
    }

    this.userRoleService.update(this.userRoleRegisterUIDTO.userId, this.userRoleRegisterUIDTO.roleId, userRole).pipe(first()).subscribe({
      next: (data: any) => {

        this.messageService.add({ 
          severity: 'success', 
          summary: '' + this.userRoleRegisterUIDTO.update_message_service_Generic, 
          detail: '' + this.userRoleRegisterUIDTO.update_success_message_service_UserRoleRegister });

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: '' + this.userRoleRegisterUIDTO.error_message_service_Generic, detail: error.error.message });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.resetRegisterForm();
        this.ngxSpinnerService.hide();
      }
    });
  }

  delete() {

    this.ngxSpinnerService.show();

    this.userRoleService.delete(this.userRoleRegisterUIDTO.userId, this.userRoleRegisterUIDTO.roleId).pipe(first()).subscribe({
      next: (data: any) => {

        this.messageService.add({ 
          severity: 'success', 
          summary: '' + this.userRoleRegisterUIDTO.delete_message_service_Generic, 
          detail: '' + this.userRoleRegisterUIDTO.delete_success_message_service_UserRoleRegister });

      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: '' + this.userRoleRegisterUIDTO.error_message_service_Generic, detail: error.error.message });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.resetRegisterForm();
        this.ngxSpinnerService.hide();
      }
    });
  }
}