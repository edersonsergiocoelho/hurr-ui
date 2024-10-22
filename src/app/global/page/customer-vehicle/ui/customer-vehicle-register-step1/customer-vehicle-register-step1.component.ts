import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerVehicleRegisterStep1UIDTO } from './dto/customer-vehicle-register-step1-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CountryService } from 'src/app/page/admin/country/service/country.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { Country } from 'src/app/page/admin/country/entity/country.entity';
import { State } from 'src/app/page/admin/state/entity/state.entity';
import { StateService } from 'src/app/page/admin/state/service/state.service';
import { CityService } from 'src/app/page/admin/city/service/city.service';
import { City } from 'src/app/page/admin/city/entity/city.entity';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-vehicle-register-step1',
  templateUrl: './customer-vehicle-register-step1.component.html',
  styleUrls: ['./customer-vehicle-register-step1.component.css']
})
export class CustomerVehicleRegisterStep1Component implements OnInit {

  customerVehicleRegisterStep1UIDTO: CustomerVehicleRegisterStep1UIDTO;

  @Output() validateStep1 = new EventEmitter<boolean>();
  
  constructor(
    private cityService: CityService,
    private countryService: CountryService,
    private stateService: StateService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {

    const sessionStorageCustomerVehicleRegisterStep1UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep1UIDTO") as string);

    if (sessionStorageCustomerVehicleRegisterStep1UIDTO != null) {

      this.customerVehicleRegisterStep1UIDTO = sessionStorageCustomerVehicleRegisterStep1UIDTO;
      this.validateStep1.emit(this.customerVehicleRegisterStep1UIDTO.selectedCity.serviceAvailable);

    } else {

      this.customerVehicleRegisterStep1UIDTO = new CustomerVehicleRegisterStep1UIDTO();
  
      this.asyncCallFunctions();
    }
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'city_service_not_available_message_service_CustomerVehicleRegisterStep1'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleRegisterStep1UIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleRegisterStep1UIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleRegisterStep1UIDTO.city_service_not_available_message_service_CustomerVehicleRegisterStep1 = translations['city_service_not_available_message_service_CustomerVehicleRegisterStep1'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep1UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      const countryServiceFindAll = await firstValueFrom(this.countryService.findAll().pipe(first()));

      if (countryServiceFindAll.status == 200) {
        if (countryServiceFindAll.body != null && countryServiceFindAll.body.length > 0) {
          this.customerVehicleRegisterStep1UIDTO.countries = countryServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep1UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  onFormChange(ngForm: NgForm): void {
    if (ngForm) {
      this.customerVehicleRegisterStep1UIDTO.isFormValid = ngForm.valid ?? false;
      this.validateStep1.emit(this.customerVehicleRegisterStep1UIDTO.isFormValid);
      if (this.customerVehicleRegisterStep1UIDTO.isFormValid) {
        sessionStorage.setItem("customerVehicleRegisterStep1UIDTO", JSON.stringify(this.customerVehicleRegisterStep1UIDTO));
      }
    }
  }

  async changeCountry(country: Country) {

    this.ngxSpinnerService.show();

    try {

      const resultStateServiceFindAll = await firstValueFrom(this.stateService.findByCountryId(country.countryId).pipe(first()));

      if (resultStateServiceFindAll.status == 200) {

        if (resultStateServiceFindAll.body != null) {
          this.customerVehicleRegisterStep1UIDTO.states = resultStateServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep1UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async changeState(state: State) {

    this.ngxSpinnerService.show();

    try {

      const resultStateServiceFindAll = await firstValueFrom(this.cityService.findByStateId(state.stateId).pipe(first()));

      if (resultStateServiceFindAll.status == 200) {

        if (resultStateServiceFindAll.body != null) {
          this.customerVehicleRegisterStep1UIDTO.cities = resultStateServiceFindAll.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterStep1UIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async changeCity(city: City) {

    if (city.serviceAvailable == false) {

      this.messageService.add({
        severity: SeverityConstants.WARN,
        summary: '' + this.customerVehicleRegisterStep1UIDTO.warn_message_service_Generic,
        detail: '' + this.customerVehicleRegisterStep1UIDTO.city_service_not_available_message_service_CustomerVehicleRegisterStep1
      });
    }
  }
}