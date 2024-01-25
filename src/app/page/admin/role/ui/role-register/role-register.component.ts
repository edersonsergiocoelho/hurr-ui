import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleRegisterUIDTO } from './dto/role-register-ui-dto.dto';
import { RoleSearchComponent } from '../role-search/role-search.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../../service/role.service';
import { RoleDTO } from '../../dto/role-dto.dto';
import { NgForm } from '@angular/forms';
import { Role } from '../../entity/role.entity';
import { first } from 'rxjs';

@Component({
  selector: 'app-role-register',
  templateUrl: './role-register.component.html',
  styleUrls: ['./role-register.component.css']
})
export class RoleRegisterComponent implements OnInit {

  roleRegisterUIDTO: RoleRegisterUIDTO;
  roleRegisterForm: NgForm;

  @ViewChild(RoleSearchComponent, {static: true}) roleSearchComponent: RoleSearchComponent;

  constructor(private ngxSpinnerService: NgxSpinnerService,
              private roleService: RoleService) { }

  ngOnInit (): void {
  this.resetRegisterForm();
  }

  resetRegisterForm () {

    this.roleRegisterUIDTO = new RoleRegisterUIDTO();
    
    this.roleRegisterUIDTO.roleDTO = new RoleDTO();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    this.ngxSpinnerService.hide();
  }

  onRowSelectEdit (event: any) {

    this.roleRegisterUIDTO.roleDTO = new RoleDTO();

    if (event.data != null) {
      this.roleRegisterUIDTO.roleDTO = Role.toDTO(event.data);

      this.roleRegisterUIDTO.roleDTO.createdDate = new Date(this.roleRegisterUIDTO.roleDTO.createdDate);

      if (this.roleRegisterUIDTO.roleDTO.modifiedDate != null) {
        this.roleRegisterUIDTO.roleDTO.modifiedDate = new Date(this.roleRegisterUIDTO.roleDTO.modifiedDate);
      }
    }
  }

  saveRole() {

    this.ngxSpinnerService.show();

    const role = RoleDTO.toEntity(this.roleRegisterUIDTO.roleDTO);

    this.roleService.save(role).pipe(first()).subscribe({
      next: (data: any) => {

        //this.roleSearchUIDTO.roles = data.body.content;
        //this.roleSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {
        //this.messageService.add({ severity: 'error', summary: '' + this.broadcastSearchUIDTO.error_message_service_Generic, detail: error.error.message });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  updateRole() {

    this.ngxSpinnerService.show();

    const role = RoleDTO.toEntity(this.roleRegisterUIDTO.roleDTO);

    this.roleService.update(role).pipe(first()).subscribe({
      next: (data: any) => {

        //this.roleSearchUIDTO.roles = data.body.content;
        //this.roleSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {
        //this.messageService.add({ severity: 'error', summary: '' + this.broadcastSearchUIDTO.error_message_service_Generic, detail: error.error.message });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  deleteRole() {

    this.ngxSpinnerService.show();

    const role = RoleDTO.toEntity(this.roleRegisterUIDTO.roleDTO);

    this.roleService.update(role).pipe(first()).subscribe({
      next: (data: any) => {

        //this.roleSearchUIDTO.roles = data.body.content;
        //this.roleSearchUIDTO.totalRecords = data.body.totalElements;
      },
      error: (error) => {
        //this.messageService.add({ severity: 'error', summary: '' + this.broadcastSearchUIDTO.error_message_service_Generic, detail: error.error.message });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }
}