import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerVehicleRegisterUIDTO } from './dto/customer-vehicle-register-ui-dto.dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleRegisterStep1UIDTO } from '../customer-vehicle-register-step1/dto/customer-vehicle-register-step1-ui-dto.dto';
import { CustomerVehicleRegisterStep2UIDTO } from '../customer-vehicle-register-step2/dto/customer-vehicle-register-step2-ui-dto.dto';
import { CustomerVehicleRegisterStep3UIDTO } from '../customer-vehicle-register-step3/dto/customer-vehicle-register-step3-ui-dto.dto';
import { CustomerVehicleRegisterStep4UIDTO } from '../customer-vehicle-register-step4/dto/customer-vehicle-register-step4-ui-dto.dto';
import { CustomerVehicleRegisterStep5UIDTO } from '../customer-vehicle-register-step5/dto/customer-vehicle-register-step5-ui-dto.dto';
import { CustomerVehicleRegisterStep6UIDTO } from '../customer-vehicle-register-step6/dto/customer-vehicle-register-step6-ui-dto.dto';
import { CustomerVehicleRegisterStep7UIDTO } from '../customer-vehicle-register-step7/dto/customer-vehicle-register-step7-ui-dto.dto';
import { CustomerVehicleSaveDTO } from '../../dto/customer-vehicle-save-dto.dto';
import { Address } from '../../../address/entity/address.entity';
import { Router } from '@angular/router';

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
  isValidateStep6: boolean = false;
  isValidateStep7: boolean = false;

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

  handleIsValidateStep6(isValidateStep6: boolean) {
    this.isValidateStep6 = isValidateStep6;
    this.changeDetectorRef.detectChanges();
  }

  handleIsValidateStep7(isValidateStep7: boolean) {
    this.isValidateStep7 = isValidateStep7;
    this.changeDetectorRef.detectChanges();
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private customerVehicleService: CustomerVehicleService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm () {

    this.customerVehicleRegisterUIDTO = new CustomerVehicleRegisterUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'span_button_label_save_Generic',
        'span_button_label_cancel_Generic',
        'header_ConfirmDialog_CustomerVehicleRegister',
        'message_ConfirmDialog_CustomerVehicleRegister',
        'reject_summary_message_service_ConfirmDialog_CustomerVehicleRegister',
        'reject_detail_message_service_ConfirmDialog_CustomerVehicleRegister',
        'save_message_service_Generic',
        'save_success_message_service_CustomerVehicleRegister'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleRegisterUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleRegisterUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleRegisterUIDTO.span_button_label_save_Generic = translations['span_button_label_save_Generic'];
      this.customerVehicleRegisterUIDTO.span_button_label_cancel_Generic = translations['span_button_label_cancel_Generic'];
      this.customerVehicleRegisterUIDTO.header_ConfirmDialog_CustomerVehicleRegister = translations['header_ConfirmDialog_CustomerVehicleRegister'];
      this.customerVehicleRegisterUIDTO.message_ConfirmDialog_CustomerVehicleRegister = translations['message_ConfirmDialog_CustomerVehicleRegister'];
      this.customerVehicleRegisterUIDTO.reject_summary_message_service_ConfirmDialog_CustomerVehicleRegister = translations['reject_summary_message_service_ConfirmDialog_CustomerVehicleRegister'];
      this.customerVehicleRegisterUIDTO.reject_detail_message_service_ConfirmDialog_CustomerVehicleRegister = translations['reject_detail_message_service_ConfirmDialog_CustomerVehicleRegister'];
      this.customerVehicleRegisterUIDTO.save_message_service_Generic = translations['save_message_service_Generic'];
      this.customerVehicleRegisterUIDTO.save_success_message_service_CustomerVehicleRegister = translations['save_success_message_service_CustomerVehicleRegister'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleRegisterUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }
          
    this.ngxSpinnerService.hide();
  }

  nextStep(): void {
    if (this.customerVehicleRegisterUIDTO.currentStepIndex < this.customerVehicleRegisterUIDTO.customervehicleRegisterSteps.length - 1) {
      this.customerVehicleRegisterUIDTO.customervehicleRegisterSteps[this.customerVehicleRegisterUIDTO.currentStepIndex].isCompleted = true;
      this.customerVehicleRegisterUIDTO.currentStepIndex++;
    }
  }

  previousStep(): void {
    if (this.customerVehicleRegisterUIDTO.currentStepIndex > 0) {
      this.customerVehicleRegisterUIDTO.customervehicleRegisterSteps[this.customerVehicleRegisterUIDTO.currentStepIndex].isCompleted = false;
      this.customerVehicleRegisterUIDTO.currentStepIndex--;
    }
  }

  validateCurrentStep(): boolean {

    const currentStepIndex = this.customerVehicleRegisterUIDTO.currentStepIndex;
   
    switch(currentStepIndex) {
      case 0:
        return this.isValidateStep1;
      case 1:
        return this.isValidateStep2;
      case 2:
        return this.isValidateStep3;
      case 3:
        return this.isValidateStep4;
      case 4:
        return this.isValidateStep5;
      case 5:
        return this.isValidateStep6;
      case 6:
        return this.isValidateStep7;
      default:
        return false;
    }
  }

  save() {

    this.ngxSpinnerService.show();

    let address: Address = new Address();
    let customerVehicle: CustomerVehicle = new CustomerVehicle();

    const customerVehicleRegisterStep1UIDTO: CustomerVehicleRegisterStep1UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep1UIDTO") as string);
    const customerVehicleRegisterStep2UIDTO: CustomerVehicleRegisterStep2UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep2UIDTO") as string);
    const customerVehicleRegisterStep3UIDTO: CustomerVehicleRegisterStep3UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep3UIDTO") as string);
    const customerVehicleRegisterStep4UIDTO: CustomerVehicleRegisterStep4UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep4UIDTO") as string);
    const customerVehicleRegisterStep5UIDTO: CustomerVehicleRegisterStep5UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep5UIDTO") as string);
    const customerVehicleRegisterStep6UIDTO: CustomerVehicleRegisterStep6UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep6UIDTO") as string);
    const customerVehicleRegisterStep7UIDTO: CustomerVehicleRegisterStep7UIDTO = JSON.parse(sessionStorage.getItem("customerVehicleRegisterStep7UIDTO") as string);

    // Informações Da Etapa 1
    address.country = customerVehicleRegisterStep1UIDTO.selectedCountry;
    address.state = customerVehicleRegisterStep1UIDTO.selectedState;
    address.city = customerVehicleRegisterStep1UIDTO.selectedCity;
    address.nickname = customerVehicleRegisterStep1UIDTO.nickname;
    address.streetAddress = customerVehicleRegisterStep1UIDTO.streetAddress;
    address.number = customerVehicleRegisterStep1UIDTO.number;
    address.complement = customerVehicleRegisterStep1UIDTO.complement;
    address.zipCode = customerVehicleRegisterStep1UIDTO.zipCode;

    // Informações Da Etapa 2
    customerVehicle.vehicle = customerVehicleRegisterStep2UIDTO.selectedVehicle;
    customerVehicle.vehicleModel = customerVehicleRegisterStep2UIDTO.selectedVehicleModel;

    // Informações Da Etapa 3
    customerVehicle.vehicleTransmission = customerVehicleRegisterStep3UIDTO.selectedVehicleTransmission;
    customerVehicle.mileageCreated = customerVehicleRegisterStep3UIDTO.mileageCreated;

    // Informações Da Etapa 4
    customerVehicle.vehicleValue = customerVehicleRegisterStep4UIDTO.vehicleValue;

    // Informações Da Etapa 5
    customerVehicle.licensePlate = customerVehicleRegisterStep5UIDTO.licensePlate;
    customerVehicle.renavam = customerVehicleRegisterStep5UIDTO.renavam;
    customerVehicle.renavamState = customerVehicleRegisterStep5UIDTO.selectedState;
    customerVehicle.chassis = customerVehicleRegisterStep5UIDTO.chassis;
    customerVehicle.yearOfManufacture = new Date(customerVehicleRegisterStep5UIDTO.yearOfManufacture).getFullYear();
    customerVehicle.yearOfTheCar = new Date(customerVehicleRegisterStep5UIDTO.yearOfTheCar).getFullYear();
    customerVehicle.description = customerVehicleRegisterStep5UIDTO.description;
    customerVehicle.vehicleColor = customerVehicleRegisterStep5UIDTO.selectedVehicleColor;
    customerVehicle.vehicleFuelType = customerVehicleRegisterStep5UIDTO.selectedVehicleFuelType;

    let customerVehicleSaveDTO: CustomerVehicleSaveDTO = new CustomerVehicleSaveDTO();
    customerVehicleSaveDTO.customerVehicle = customerVehicle;
    customerVehicleSaveDTO.address = address;
    customerVehicleSaveDTO.customerVehicleFilePhotos = customerVehicleRegisterStep6UIDTO.customerVehicleFilePhotos;
    customerVehicleSaveDTO.customerVehicleFileInsurances = customerVehicleRegisterStep7UIDTO.customerVehicleFileInsurances;

    this.customerVehicleService.save(customerVehicleSaveDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 201) {

          this.messageService.add({ 
            severity: 'success', 
            summary: '' + this.customerVehicleRegisterUIDTO.save_message_service_Generic, 
            detail: '' + this.customerVehicleRegisterUIDTO.save_success_message_service_CustomerVehicleRegister 
          });

          this.navigateToCustomerVehicleSearch();
        }

      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({ 
            severity: 'error', 
            summary: '' + this.customerVehicleRegisterUIDTO.error_message_service_Generic, 
            detail: error.error.message 
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.resetForm();
        this.ngxSpinnerService.hide();
      }
    });
  }

  confirmDialogSave() {

    this.confirmationService.confirm({
      header: '' + this.customerVehicleRegisterUIDTO.header_ConfirmDialog_CustomerVehicleRegister,
      message: '' + this.customerVehicleRegisterUIDTO.message_ConfirmDialog_CustomerVehicleRegister,
      acceptLabel: '' + this.customerVehicleRegisterUIDTO.span_button_label_save_Generic,
      acceptIcon: 'pi pi-save mr-2',
      rejectLabel: '' + this.customerVehicleRegisterUIDTO.span_button_label_cancel_Generic,
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.save();
      },
      reject: () => {

        this.messageService.add({ 
          severity: SeverityConstants.INFO, 
          summary: '' + this.customerVehicleRegisterUIDTO.reject_summary_message_service_ConfirmDialog_CustomerVehicleRegister, 
          detail: '' + this.customerVehicleRegisterUIDTO.reject_detail_message_service_ConfirmDialog_CustomerVehicleRegister
        });
      }
    });
  }

  navigateToCustomerVehicleSearch() {
    this.router.navigate(['/customer-vehicle/']);
  }
}