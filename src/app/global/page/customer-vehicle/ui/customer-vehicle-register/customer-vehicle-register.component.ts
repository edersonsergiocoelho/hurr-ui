import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerVehicleRegisterUIDTO } from './dto/customer-vehicle-register-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'src/app/page/admin/country/service/country.service';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-customer-vehicle-register',
  templateUrl: './customer-vehicle-register.component.html',
  styleUrls: ['./customer-vehicle-register.component.css']
})
export class CustomerVehicleRegisterComponent implements OnInit {

  customerVehicleRegisterUIDTO: CustomerVehicleRegisterUIDTO;

  isValidateStep1: boolean = false;
  isValidateStep2: boolean = false;
  isValidateStep3: boolean = false;

  handleIsValidateStep1(isValidateStep1: boolean) {
    this.isValidateStep1 = isValidateStep1;
    this.changeDetectorRef.detectChanges();
  }

  handleIsValidateStep2(isValidateStep2: boolean) {
    this.isValidateStep2 = isValidateStep2;
    this.changeDetectorRef.detectChanges();
  }

  handleIsValidateStep3(isValidateStep3: boolean) {
    this.isValidateStep3 = isValidateStep3;
    this.changeDetectorRef.detectChanges();
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private countryService: CountryService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetCustomerVehicleRegisterForm();
  }

  resetCustomerVehicleRegisterForm () {

    this.customerVehicleRegisterUIDTO = new CustomerVehicleRegisterUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const countryServiceFindAll = await firstValueFrom(this.countryService.findAll().pipe(first()));

      if (countryServiceFindAll.status == 200 && countryServiceFindAll.body != null) {
        this.customerVehicleRegisterUIDTO.countries = countryServiceFindAll.body;
      }

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: 'Erro', 
          detail: error.toString() 
        });
      }
    }
          
    this.ngxSpinnerService.hide();
  }

  nextStep() {
    this.customerVehicleRegisterUIDTO.step++;
  }

  previousStep() {
    this.customerVehicleRegisterUIDTO.step--;
  }

  validateCurrentStep(): boolean {

    const step = this.customerVehicleRegisterUIDTO.step;
    
    switch(step) {
      case 1:
        return this.isValidateStep1;
      case 2:
        return this.isValidateStep2;
      case 2:
        return this.isValidateStep3;
      default:
        return false;
    }
  }

  requestMoney() {

  }
}