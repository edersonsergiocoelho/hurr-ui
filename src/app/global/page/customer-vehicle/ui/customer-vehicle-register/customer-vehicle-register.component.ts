import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerVehicleRegisterUIDTO } from './dto/customer-vehicle-register-ui-dto.dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

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
  isValidateStep4: boolean = false;
  isValidateStep5: boolean = false;

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

  handleIsValidateStep4(isValidateStep4: boolean) {
    this.isValidateStep4 = isValidateStep4;
    this.changeDetectorRef.detectChanges();
  }

  handleIsValidateStep5(isValidateStep5: boolean) {
    this.isValidateStep5 = isValidateStep5;
    this.changeDetectorRef.detectChanges();
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
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
          
    this.ngxSpinnerService.hide();
  }

  nextStep(): void {
    if (this.customerVehicleRegisterUIDTO.currentStepIndex < this.customerVehicleRegisterUIDTO.steps.length - 1) {
      this.customerVehicleRegisterUIDTO.steps[this.customerVehicleRegisterUIDTO.currentStepIndex].isCompleted = true;
      this.customerVehicleRegisterUIDTO.currentStepIndex++;
    }
  }

  previousStep(): void {
    if (this.customerVehicleRegisterUIDTO.currentStepIndex > 0) {
      this.customerVehicleRegisterUIDTO.steps[this.customerVehicleRegisterUIDTO.currentStepIndex].isCompleted = false;
      this.customerVehicleRegisterUIDTO.currentStepIndex--;
    }
  }

  validateCurrentStep(): boolean {

    const currentStepIndex = this.customerVehicleRegisterUIDTO.currentStepIndex;
    
    switch(currentStepIndex) {
      case 1:
        return this.isValidateStep1;
      case 2:
        return this.isValidateStep2;
      case 3:
        return this.isValidateStep3;
      case 4:
        return this.isValidateStep4;
      default:
        return false;
    }
  }

  requestMoney() {

  }
}