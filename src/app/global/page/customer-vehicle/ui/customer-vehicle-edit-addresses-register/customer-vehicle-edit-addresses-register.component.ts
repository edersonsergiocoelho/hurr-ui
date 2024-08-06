import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerVehicleEditAddressesRegisterUIDTO } from './dto/customer-vehicle-edit-addresses-register-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { NgForm } from '@angular/forms';
import { CustomerVehicleAddressService } from '../../../customer-vehicle-address/service/customer-vehicle-address.service';
import { CustomerVehicleAddressDTO } from '../../../customer-vehicle-address/dto/customer-vehicle-address-dto.dto';
import { CustomerVehicleAddress } from '../../../customer-vehicle-address/entity/customer-vehicle-address.entity';
import { State } from 'src/app/page/admin/state/entity/state.entity';
import { Country } from 'src/app/page/admin/country/entity/country.entity';
import { StateService } from 'src/app/page/admin/state/service/state.service';
import { CountryService } from 'src/app/page/admin/country/service/country.service';
import { CityService } from 'src/app/page/admin/city/service/city.service';
import { AddressDTO } from '../../../address/dto/address-dto.dto';
import { AddressTypeService } from '../../../address-type/service/address-type.service';
import { AddressAddressTypeService } from '../../../address-address-type/service/address-address-type.service';
import { CustomerVehicleAddressSaveAddressDTO } from '../../../customer-vehicle-address/dto/customer-vehicle-address-save-address-dto.dto';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-vehicle-edit-addresses-register',
  templateUrl: './customer-vehicle-edit-addresses-register.component.html',
  styleUrls: ['./customer-vehicle-edit-addresses-register.component.css']
})
export class CustomerVehicleEditAddressesRegisterComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditAddressesRegisterUIDTO: CustomerVehicleEditAddressesRegisterUIDTO;
  customerVehicleEditAddressesRegisterForm: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private addressTypeService: AddressTypeService,
    private addressAddressTypeService: AddressAddressTypeService,
    private countryService: CountryService,
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleAddressService: CustomerVehicleAddressService,
    private ngxSpinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private stateService: StateService,
    private cityService: CityService,
    private translateService: TranslateService
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleId = params.get('customerVehicleId');
    });
  }

  ngOnInit (): void {
    this.resetRegisterForm();
  }

  resetRegisterForm () {

    this.customerVehicleEditAddressesRegisterUIDTO = new CustomerVehicleEditAddressesRegisterUIDTO();
    
    this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO = new CustomerVehicleAddressDTO();
    this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address = new AddressDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'success_message_service_Generic',
        'save_success_message_service_CustomerVehicleEditAddressesRegister',
        'update_success_message_service_CustomerVehicleEditAddressesRegister',
        'delete_success_message_service_CustomerVehicleEditAddressesRegister'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleEditAddressesRegisterUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleEditAddressesRegisterUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerVehicleEditAddressesRegisterUIDTO.save_success_message_service_CustomerVehicleEditAddressesRegister = translations['save_success_message_service_CustomerVehicleEditAddressesRegister'];
      this.customerVehicleEditAddressesRegisterUIDTO.update_success_message_service_CustomerVehicleEditAddressesRegister = translations['update_success_message_service_CustomerVehicleEditAddressesRegister'];
      this.customerVehicleEditAddressesRegisterUIDTO.delete_success_message_service_CustomerVehicleEditAddressesRegister = translations['delete_success_message_service_CustomerVehicleEditAddressesRegister'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      if (this.customerVehicleId != null) {
        
        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleId).pipe(first()));

        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.customerVehicleEditAddressesRegisterUIDTO.customerVehicle = customerVehicleServiceFindById.body;
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      const countryServiceFindAll = await firstValueFrom(this.countryService.findAll().pipe(first()));

      if (countryServiceFindAll.status == 200) {

        if (countryServiceFindAll.body != null) {
          this.customerVehicleEditAddressesRegisterUIDTO.countries = countryServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      const addressTypeServiceFindAll = await firstValueFrom(this.addressTypeService.findAll().pipe(first()));

      if (addressTypeServiceFindAll.status == 200) {

        if (addressTypeServiceFindAll.body != null) {
          this.customerVehicleEditAddressesRegisterUIDTO.addressTypes = addressTypeServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: 'error',
          summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async onRowSelectEdit (event: any) {

    this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO = new CustomerVehicleAddressDTO();

    if (event.data != null) {
      this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO = CustomerVehicleAddress.toDTO(event.data);

      await this.changeAddress(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address.addressId);
      await this.changeCountry(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address.country);
      await this.changeState(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address.state);

      this.customerVehicleEditAddressesRegisterUIDTO.selectedCountry = this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address.country;
      this.customerVehicleEditAddressesRegisterUIDTO.selectedState = this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address.state;
      this.customerVehicleEditAddressesRegisterUIDTO.selectedCity = this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address.city;

      this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.createdDate = new Date(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.createdDate);

      if (this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.modifiedDate != null) {
        this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.modifiedDate = new Date(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.modifiedDate);
      }
    }
  }

  async changeAddress(addressId: string) {

    try {

      const addressAddressTypeServiceFindAllByAddressId = await firstValueFrom(this.addressAddressTypeService.findAllByAddressId(addressId).pipe(first()));

      if (addressAddressTypeServiceFindAllByAddressId.status == 200) {

        if (addressAddressTypeServiceFindAllByAddressId.body != null) {
          this.customerVehicleEditAddressesRegisterUIDTO.selectedAddressTypes = addressAddressTypeServiceFindAllByAddressId.body.map(item => item.addressType);
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }
  }

  async changeCountry(country: Country) {

    try {

      const stateServiceFindByCountryId = await firstValueFrom(this.stateService.findByCountryId(country.countryId).pipe(first()));

      if (stateServiceFindByCountryId.status == 200) {

        if (stateServiceFindByCountryId.body != null) {
          this.customerVehicleEditAddressesRegisterUIDTO.states = stateServiceFindByCountryId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }
  }

  async changeState(state: State) {

    try {

      const cityServiceFindByStateId = await firstValueFrom(this.cityService.findByStateId(state.stateId).pipe(first()));

      if (cityServiceFindByStateId.status == 200) {

        if (cityServiceFindByStateId.body != null) {
          this.customerVehicleEditAddressesRegisterUIDTO.cities = cityServiceFindByStateId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }
  }

  ngSubmit() {

    this.ngxSpinnerService.show();

    this.customerVehicleEditAddressesRegisterUIDTO.address = AddressDTO.toEntity(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address);

    this.customerVehicleEditAddressesRegisterUIDTO.address.country = this.customerVehicleEditAddressesRegisterUIDTO.selectedCountry;
    this.customerVehicleEditAddressesRegisterUIDTO.address.state = this.customerVehicleEditAddressesRegisterUIDTO.selectedState;
    this.customerVehicleEditAddressesRegisterUIDTO.address.city = this.customerVehicleEditAddressesRegisterUIDTO.selectedCity;

    const customerAddressSaveAddressDTO: CustomerVehicleAddressSaveAddressDTO = new CustomerVehicleAddressSaveAddressDTO();
    customerAddressSaveAddressDTO.address = this.customerVehicleEditAddressesRegisterUIDTO.address;
    customerAddressSaveAddressDTO.addressTypes = this.customerVehicleEditAddressesRegisterUIDTO.selectedAddressTypes;
    customerAddressSaveAddressDTO.customerVehicle = this.customerVehicleEditAddressesRegisterUIDTO.customerVehicle;

    this.customerVehicleAddressService.saveAddress(customerAddressSaveAddressDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 201) {

          this.messageService.add({
            severity: SeverityConstants.SUCCESS,
            summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.success_message_service_Generic,
            detail: '' + this.customerVehicleEditAddressesRegisterUIDTO.save_success_message_service_CustomerVehicleEditAddressesRegister
          });
        }
      },
      error: (error) => {
        
        if (error.status == 500) {

          this.messageService.add({
            severity: SeverityConstants.ERROR,
            summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
            detail: error.toString()
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  update() {

    this.ngxSpinnerService.show();

    this.customerVehicleEditAddressesRegisterUIDTO.address = AddressDTO.toEntity(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.address);

    this.customerVehicleEditAddressesRegisterUIDTO.address.country = this.customerVehicleEditAddressesRegisterUIDTO.selectedCountry;
    this.customerVehicleEditAddressesRegisterUIDTO.address.state = this.customerVehicleEditAddressesRegisterUIDTO.selectedState;
    this.customerVehicleEditAddressesRegisterUIDTO.address.city = this.customerVehicleEditAddressesRegisterUIDTO.selectedCity;

    const customerAddressSaveAddressDTO: CustomerVehicleAddressSaveAddressDTO = new CustomerVehicleAddressSaveAddressDTO();
    customerAddressSaveAddressDTO.address = this.customerVehicleEditAddressesRegisterUIDTO.address;
    customerAddressSaveAddressDTO.addressTypes = this.customerVehicleEditAddressesRegisterUIDTO.selectedAddressTypes;
    customerAddressSaveAddressDTO.customerVehicle = this.customerVehicleEditAddressesRegisterUIDTO.customerVehicle;

    this.customerVehicleAddressService.updateAddress(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO.customerVehicleAddressId, customerAddressSaveAddressDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {

          this.messageService.add({
            severity: SeverityConstants.SUCCESS,
            summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.success_message_service_Generic,
            detail: '' + this.customerVehicleEditAddressesRegisterUIDTO.update_success_message_service_CustomerVehicleEditAddressesRegister
          });
        }

      },
      error: (error) => {
        
        if (error.status == 500) {

          this.messageService.add({
            severity: SeverityConstants.ERROR,
            summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
            detail: error.toString()
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  delete() {

    this.ngxSpinnerService.show();

    const customerVehicleAddress = CustomerVehicleAddressDTO.toEntity(this.customerVehicleEditAddressesRegisterUIDTO.customerVehicleAddressDTO);

    this.customerVehicleAddressService.delete(customerVehicleAddress.customerVehicleAddressId).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 204) {

          this.messageService.add({
            severity: SeverityConstants.SUCCESS,
            summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.success_message_service_Generic,
            detail: '' + this.customerVehicleEditAddressesRegisterUIDTO.delete_success_message_service_CustomerVehicleEditAddressesRegister
          });
        }
      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({
            severity: SeverityConstants.ERROR,
            summary: '' + this.customerVehicleEditAddressesRegisterUIDTO.error_message_service_Generic,
            detail: error.toString()
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }
}