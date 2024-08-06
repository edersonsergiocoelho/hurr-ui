import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerVehicleEditAddressesUIDTO } from './dto/customer-vehicle-edit-addresses-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';

@Component({
  selector: 'app-customer-vehicle-edit-addresses',
  templateUrl: './customer-vehicle-edit-addresses.component.html',
  styleUrls: ['./customer-vehicle-edit-addresses.component.css']
})
export class CustomerVehicleEditAddressesComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditAddressesUIDTO: CustomerVehicleEditAddressesUIDTO;

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
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleEditAddressesUIDTO = new CustomerVehicleEditAddressesUIDTO();

    this.customerVehicleEditAddressesUIDTO.customerVehicle = new CustomerVehicle();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'success_message_service_Generic',
        'save_success_message_service_CustomerVehicleEditAddresses'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditAddressesUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleEditAddressesUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleEditAddressesUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerVehicleEditAddressesUIDTO.save_success_message_service_CustomerVehicleEditAddresses = translations['save_success_message_service_CustomerVehicleEditAddresses'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      if (this.customerVehicleId != null) {
        
        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleId).pipe(first()));

        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.customerVehicleEditAddressesUIDTO.customerVehicle = customerVehicleServiceFindById.body;
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async ngSubmit() {

    this.ngxSpinnerService.show();

    try {

      const customerVehicleServiceSave = await firstValueFrom(this.customerVehicleService.update(this.customerVehicleEditAddressesUIDTO.customerVehicle).pipe(first()));

      if (customerVehicleServiceSave.status == 200 && customerVehicleServiceSave.body != null) {

        this.messageService.add({
          severity: SeverityConstants.SUCCESS,
          summary: '' + this.customerVehicleEditAddressesUIDTO.success_message_service_Generic,
          detail: '' + this.customerVehicleEditAddressesUIDTO.save_success_message_service_CustomerVehicleEditAddresses,
        });
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAddressesUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }
}