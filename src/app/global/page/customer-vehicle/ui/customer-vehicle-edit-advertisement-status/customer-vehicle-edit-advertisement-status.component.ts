import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerVehicleEditAdvertisementStatusUIDTO } from './dto/customer-vehicle-edit-advertisement-status-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';

@Component({
  selector: 'app-customer-vehicle-edit-advertisement-status',
  templateUrl: './customer-vehicle-edit-advertisement-status.component.html',
  styleUrls: ['./customer-vehicle-edit-advertisement-status.component.css']
})
export class CustomerVehicleEditAdvertisementStatusComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditAdvertisementStatusUIDTO: CustomerVehicleEditAdvertisementStatusUIDTO;

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

    this.customerVehicleEditAdvertisementStatusUIDTO = new CustomerVehicleEditAdvertisementStatusUIDTO();

    this.customerVehicleEditAdvertisementStatusUIDTO.customerVehicle = new CustomerVehicle();

    this.customerVehicleEditAdvertisementStatusUIDTO.advertisementStatuses = [
      { name: 'DRAFT', code: 'DRAFT' },
      { name: 'CANCELED', code: 'CANCELED' },
      { name: 'PUBLISHED', code: 'PUBLISHED' }
    ];

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_summary_message_service_Generic',
        'warn_summary_message_service_Generic',
        'success_summary_message_service_Generic',
        'save_success_message_service_CustomerVehicleEditAdvertisementStatus'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditAdvertisementStatusUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleEditAdvertisementStatusUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.customerVehicleEditAdvertisementStatusUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];
      this.customerVehicleEditAdvertisementStatusUIDTO.save_success_message_service_CustomerVehicleEditAdvertisementStatus = translations['save_success_message_service_CustomerVehicleEditAdvertisementStatus'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAdvertisementStatusUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      if (this.customerVehicleId != null) {
        
        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleId).pipe(first()));

        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.customerVehicleEditAdvertisementStatusUIDTO.customerVehicle = customerVehicleServiceFindById.body;
            
            const advertisementStatus = this.customerVehicleEditAdvertisementStatusUIDTO.customerVehicle.advertisementStatus;
            const currentAdvertisementStatus = this.customerVehicleEditAdvertisementStatusUIDTO.advertisementStatuses.find(status => status.code === advertisementStatus);

            if (currentAdvertisementStatus) {
              this.customerVehicleEditAdvertisementStatusUIDTO.selectedAdvertisementStatus = currentAdvertisementStatus;
            }
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAdvertisementStatusUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async ngSubmit() {

    this.ngxSpinnerService.show();

    try {

      this.customerVehicleEditAdvertisementStatusUIDTO.customerVehicle.advertisementStatus = this.customerVehicleEditAdvertisementStatusUIDTO.selectedAdvertisementStatus.code;

      const customerVehicleServiceSave = await firstValueFrom(this.customerVehicleService.update(this.customerVehicleEditAdvertisementStatusUIDTO.customerVehicle).pipe(first()));

      if (customerVehicleServiceSave.status == 200 && customerVehicleServiceSave.body != null) {

        this.messageService.add({
          severity: SeverityConstants.SUCCESS,
          summary: '' + this.customerVehicleEditAdvertisementStatusUIDTO.success_summary_message_service_Generic,
          detail: '' + this.customerVehicleEditAdvertisementStatusUIDTO.save_success_message_service_CustomerVehicleEditAdvertisementStatus,
        });
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditAdvertisementStatusUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }
}