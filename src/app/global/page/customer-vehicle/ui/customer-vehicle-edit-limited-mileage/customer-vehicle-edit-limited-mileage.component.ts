import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerVehicleEditLimitedMileageUIDTO } from './dto/customer-vehicle-edit-limited-mileage-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';

@Component({
  selector: 'app-customer-vehicle-edit-limited-mileage',
  templateUrl: './customer-vehicle-edit-limited-mileage.component.html',
  styleUrls: ['./customer-vehicle-edit-limited-mileage.component.css']
})
export class CustomerVehicleEditLimitedMileageComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditLimitedMileageUIDTO: CustomerVehicleEditLimitedMileageUIDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerVehicleService: CustomerVehicleService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleId = params.get('customerVehicleId');
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleEditLimitedMileageUIDTO = new CustomerVehicleEditLimitedMileageUIDTO();

    this.customerVehicleEditLimitedMileageUIDTO.customerVehicle = new CustomerVehicle();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'success_message_service_Generic',
        'save_success_message_service_CustomerVehicleEditLimitedMileage'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditLimitedMileageUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleEditLimitedMileageUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleEditLimitedMileageUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerVehicleEditLimitedMileageUIDTO.save_success_message_service_CustomerVehicleEditLimitedMileage = translations['save_success_message_service_CustomerVehicleEditLimitedMileage'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditLimitedMileageUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      if (this.customerVehicleId != null) {
        
        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleId).pipe(first()));

        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.customerVehicleEditLimitedMileageUIDTO.customerVehicle = customerVehicleServiceFindById.body;

            if (this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileage) {
              this.customerVehicleEditLimitedMileageUIDTO.limitedMileage = 'limitedMileage';
              this.customerVehicleEditLimitedMileageUIDTO.limitedMileageIncluded = this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileageIncluded;
              this.customerVehicleEditLimitedMileageUIDTO.limitedMileageValue = this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileageValue;
            }
            
            if (this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.unlimitedMileage) {
              this.customerVehicleEditLimitedMileageUIDTO.limitedMileage = 'unlimitedMileage';
            }
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditLimitedMileageUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  ngModelChangeLicensePlateType(type: string) {

  }

  async ngSubmit() {

    this.ngxSpinnerService.show();

    try {

      if (this.customerVehicleEditLimitedMileageUIDTO.limitedMileage == 'limitedMileage') {

        this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileage = true;
        this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileageIncluded = this.customerVehicleEditLimitedMileageUIDTO.limitedMileageIncluded;
        this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileageValue = this.customerVehicleEditLimitedMileageUIDTO.limitedMileageValue;

        this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.unlimitedMileage = false;
      }

      if (this.customerVehicleEditLimitedMileageUIDTO.limitedMileage == 'unlimitedMileage') {

        this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileage = false;
        this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileageIncluded = 0;
        this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.limitedMileageValue = 0;

        this.customerVehicleEditLimitedMileageUIDTO.customerVehicle.unlimitedMileage = true;
      }
      
      const customerVehicleServiceSave = await firstValueFrom(this.customerVehicleService.update(this.customerVehicleEditLimitedMileageUIDTO.customerVehicle).pipe(first()));

      if (customerVehicleServiceSave.status == 200 && customerVehicleServiceSave.body != null) {

        this.messageService.add({
          severity: SeverityConstants.SUCCESS,
          summary: '' + this.customerVehicleEditLimitedMileageUIDTO.success_message_service_Generic,
          detail: '' + this.customerVehicleEditLimitedMileageUIDTO.save_success_message_service_CustomerVehicleEditLimitedMileage,
        });
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditLimitedMileageUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }
}