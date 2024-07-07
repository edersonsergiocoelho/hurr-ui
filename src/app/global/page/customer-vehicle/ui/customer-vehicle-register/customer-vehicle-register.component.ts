import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerVehicleRegisterUIDTO } from './dto/customer-vehicle-register-ui-dto.dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';
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
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService,
    private messageService: MessageService
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

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'span_button_label_save_Generic',
        'span_button_label_cancel_Generic',
        'header_ConfirmDialog_CustomerVehicleRegister',
        'message_ConfirmDialog_CustomerVehicleRegister',
        'reject_summary_message_service_ConfirmDialog_CustomerVehicleRegister',
        'reject_detail_message_service_ConfirmDialog_CustomerVehicleRegister',
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

    let customerVehicle: CustomerVehicle = new CustomerVehicle();

    this.customerVehicleService.save(customerVehicle).pipe(first()).subscribe({
      next: (data: any) => {

        /*
        this.messageService.add({ 
          severity: 'success', 
          summary: '' + this.customerVehicleRegisterUIDTO.save_message_service_Generic, 
          detail: '' + this.customerVehicleRegisterUIDTO.save_success_message_service_UserRoleRegister 
        });
        */

      },
      error: (error) => {

        this.messageService.add({ 
          severity: 'error', 
          summary: '' + this.customerVehicleRegisterUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.resetCustomerVehicleRegisterForm();
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
}