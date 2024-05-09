import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { AddressRegisterDynamicDialogUIDTO } from './dto/address-register-dynamic-dialog-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { AddressDTO } from '../../dto/address-dto.dto';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first, firstValueFrom } from 'rxjs';
import { CountryService } from 'src/app/page/admin/country/service/country.service';
import { StateService } from 'src/app/page/admin/state/service/state.service';
import { Country } from 'src/app/page/admin/country/entity/country.entity';
import { State } from 'src/app/page/admin/state/entity/state.entity';
import { CityService } from 'src/app/page/admin/city/service/city.service';
import { CustomerAddress } from '../../../customer-address/entity/customer-address.entity';
import { CustomerAddressService } from '../../../customer-address/service/customer-address.service';
import { AddressService } from '../../service/address.service';
import { Address } from '../../entity/address.entity';
import { CustomerService } from '../../../customer/service/customer.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { Customer } from '../../../customer/entity/customer.entity';
import * as moment from 'moment';
import { CustomerAddressDTO } from '../../../customer-address/dto/customer-address-dto.dto';

@Component({
  selector: 'app-address-register-dynamic-dialog',
  templateUrl: './address-register-dynamic-dialog.component.html',
  styleUrls: ['./address-register-dynamic-dialog.component.css']
})
export class AddressRegisterDynamicDialogComponent implements OnInit {

  addressRegisterDynamicDialogUIDTO: AddressRegisterDynamicDialogUIDTO;

  @ViewChild('addressRegisterDynamicDialogForm') addressRegisterDynamicDialogForm: NgForm;

  constructor(
    private addressService: AddressService,
    private cityService: CityService,
    private countryService: CountryService,
    private customerAddressService: CustomerAddressService,
    private customerService: CustomerService,
    private dynamicDialogConfig: DynamicDialogConfig,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private sessionStorageService: SessionStorageService,
    private stateService: StateService,
    private translateService: TranslateService
  ) {}

  ngOnInit (): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetRegisterForm();
  }

  resetRegisterForm () {
    this.addressRegisterDynamicDialogUIDTO = new AddressRegisterDynamicDialogUIDTO();

    this.addressRegisterDynamicDialogUIDTO.address = new Address();
    this.addressRegisterDynamicDialogUIDTO.addressDTO = new AddressDTO();

    this.addressRegisterDynamicDialogUIDTO.customer = new Customer();
    this.addressRegisterDynamicDialogUIDTO.customerAddress = new CustomerAddress();

    this.addressRegisterDynamicDialogUIDTO.newRegister = this.dynamicDialogConfig.data.newRegister;
    this.addressRegisterDynamicDialogUIDTO.addressType = this.dynamicDialogConfig.data.addressType;

    if (this.addressRegisterDynamicDialogUIDTO.newRegister == false) {
      this.addressRegisterDynamicDialogUIDTO.addressDTO = Address.toDTO(this.dynamicDialogConfig.data.customerAddress.address);
      this.addressRegisterDynamicDialogUIDTO.customerAddressDTO = CustomerAddress.toDTO(this.dynamicDialogConfig.data.customerAddress)
      this.changeCountry(this.dynamicDialogConfig.data.customerAddress.address.country);
      this.changeState(this.dynamicDialogConfig.data.customerAddress.address.state);
      this.addressRegisterDynamicDialogUIDTO.selectedCountry = this.dynamicDialogConfig.data.customerAddress.address.country;
      this.addressRegisterDynamicDialogUIDTO.selectedState = this.dynamicDialogConfig.data.customerAddress.address.state;
      this.addressRegisterDynamicDialogUIDTO.selectedCity = this.dynamicDialogConfig.data.customerAddress.address.city;

      if (this.addressRegisterDynamicDialogUIDTO.addressDTO.createdDate != null) {
        this.addressRegisterDynamicDialogUIDTO.addressDTO.createdDate = moment(this.addressRegisterDynamicDialogUIDTO.addressDTO.createdDate).toDate();
      }
      if (this.addressRegisterDynamicDialogUIDTO.addressDTO.modifiedDate != null) {
        this.addressRegisterDynamicDialogUIDTO.addressDTO.modifiedDate = moment(this.addressRegisterDynamicDialogUIDTO.addressDTO.modifiedDate).toDate();
      }
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'success_message_service_Generic',
        'save_success_message_service_AddressRegisterDynamicDialog',
        'update_success_message_service_AddressRegisterDynamicDialog',
        'no_connection_to_the_api_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.addressRegisterDynamicDialogUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.addressRegisterDynamicDialogUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.addressRegisterDynamicDialogUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.addressRegisterDynamicDialogUIDTO.save_success_message_service_AddressRegisterDynamicDialog = translations['save_success_message_service_AddressRegisterDynamicDialog'];
      this.addressRegisterDynamicDialogUIDTO.update_success_message_service_AddressRegisterDynamicDialog = translations['update_success_message_service_AddressRegisterDynamicDialog'];
      this.addressRegisterDynamicDialogUIDTO.no_connection_to_the_api_message_service_Generic = translations['no_connection_to_the_api_message_service_Generic'];

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: 'error',
          summary: '' + this.addressRegisterDynamicDialogUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    // Customer
    try {

      const currentUser = this.sessionStorageService.getUser();

      const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

      if (resultCustomerFindByEmail.status == 200) {

        if (resultCustomerFindByEmail.body != null) {
          this.addressRegisterDynamicDialogUIDTO.customer = resultCustomerFindByEmail.body;
        }
      }

    } catch (error: any) {

      if (error.status == 404) {;

        this.messageService.add({ severity: 'warn', 
                                  summary: 'Não encontrado dados do cliente.', 
                                  detail: 'Não encontrado dados do cliente, favor seguir os passos para a validação.'
                                });
      }

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    try {

      const resultCountryServiceFindAll = await firstValueFrom(this.countryService.findAll().pipe(first()));

      if (resultCountryServiceFindAll.status == 200) {

        if (resultCountryServiceFindAll.body != null) {
          this.addressRegisterDynamicDialogUIDTO.countries = resultCountryServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: 'error',
          summary: '' + this.addressRegisterDynamicDialogUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async changeCountry(country: Country) {

    try {

      const resultStateServiceFindAll = await firstValueFrom(this.stateService.findByCountryId(country.countryId).pipe(first()));

      if (resultStateServiceFindAll.status == 200) {

        if (resultStateServiceFindAll.body != null) {
          this.addressRegisterDynamicDialogUIDTO.states = resultStateServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: 'error',
          summary: '' + this.addressRegisterDynamicDialogUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }
  }

  async changeState(state: State) {

    try {

      const resultStateServiceFindAll = await firstValueFrom(this.cityService.findByStateId(state.stateId).pipe(first()));

      if (resultStateServiceFindAll.status == 200) {

        if (resultStateServiceFindAll.body != null) {
          this.addressRegisterDynamicDialogUIDTO.cities = resultStateServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: 'error',
          summary: '' + this.addressRegisterDynamicDialogUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }
  }

  async save() {

    this.ngxSpinnerService.show();

    try {

      this.addressRegisterDynamicDialogUIDTO.address = AddressDTO.toEntity(this.addressRegisterDynamicDialogUIDTO.addressDTO);

      this.addressRegisterDynamicDialogUIDTO.address.country = this.addressRegisterDynamicDialogUIDTO.selectedCountry;
      this.addressRegisterDynamicDialogUIDTO.address.state = this.addressRegisterDynamicDialogUIDTO.selectedState;
      this.addressRegisterDynamicDialogUIDTO.address.city = this.addressRegisterDynamicDialogUIDTO.selectedCity;
      this.addressRegisterDynamicDialogUIDTO.address.addressType = this.addressRegisterDynamicDialogUIDTO.addressType;

      const resultAddressServiceSave = await firstValueFrom(this.addressService.save(this.addressRegisterDynamicDialogUIDTO.address).pipe(first()));

      if (resultAddressServiceSave.status == 200) {

        if (resultAddressServiceSave.body != null) {

          this.addressRegisterDynamicDialogUIDTO.customerAddress.address = resultAddressServiceSave.body;
          this.addressRegisterDynamicDialogUIDTO.customerAddress.customer = this.addressRegisterDynamicDialogUIDTO.customer;

          const resutlCustomerAddressServiceSave = await firstValueFrom(this.customerAddressService.save(this.addressRegisterDynamicDialogUIDTO.customerAddress).pipe(first()));

          if (resutlCustomerAddressServiceSave.status == 200) {

            this.messageService.add({
              severity: 'success',
              summary: '' + this.addressRegisterDynamicDialogUIDTO.success_message_service_Generic,
              detail: '' + this.addressRegisterDynamicDialogUIDTO.save_success_message_service_AddressRegisterDynamicDialog,
            });
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: 'error',
          summary: '' + this.addressRegisterDynamicDialogUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async update() {

    this.ngxSpinnerService.show();

    try {

      this.addressRegisterDynamicDialogUIDTO.address = AddressDTO.toEntity(this.addressRegisterDynamicDialogUIDTO.addressDTO);

      this.addressRegisterDynamicDialogUIDTO.address.country = this.addressRegisterDynamicDialogUIDTO.selectedCountry;
      this.addressRegisterDynamicDialogUIDTO.address.state = this.addressRegisterDynamicDialogUIDTO.selectedState;
      this.addressRegisterDynamicDialogUIDTO.address.city = this.addressRegisterDynamicDialogUIDTO.selectedCity;
      this.addressRegisterDynamicDialogUIDTO.address.addressType = 'CUSTOMER';

      const resultAddressServiceSave = await firstValueFrom(this.addressService.update(this.addressRegisterDynamicDialogUIDTO.address).pipe(first()));

      if (resultAddressServiceSave.status == 200) {

        if (resultAddressServiceSave.body != null) {

          this.addressRegisterDynamicDialogUIDTO.customerAddress = CustomerAddressDTO.toEntity(this.addressRegisterDynamicDialogUIDTO.customerAddressDTO);

          this.addressRegisterDynamicDialogUIDTO.customerAddress.address = resultAddressServiceSave.body;
          this.addressRegisterDynamicDialogUIDTO.customerAddress.customer = this.addressRegisterDynamicDialogUIDTO.customer;

          const resutlCustomerAddressServiceSave = await firstValueFrom(this.customerAddressService.update(this.addressRegisterDynamicDialogUIDTO.customerAddress).pipe(first()));

          if (resutlCustomerAddressServiceSave.status == 200) {

            this.messageService.add({
              severity: 'success',
              summary: '' + this.addressRegisterDynamicDialogUIDTO.success_message_service_Generic,
              detail: '' + this.addressRegisterDynamicDialogUIDTO.update_success_message_service_AddressRegisterDynamicDialog,
            });
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: 'error',
          summary: '' + this.addressRegisterDynamicDialogUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  delete() {

    this.ngxSpinnerService.show();

    this.ngxSpinnerService.hide();
  }
}