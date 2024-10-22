import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerVehicleEditPriceDiscountUIDTO } from './dto/customer-vehicle-edit-price-discount-ui-dto.dto';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { CustomerVehicle } from '../../entity/customer-vehicle.entity';

@Component({
  selector: 'app-customer-vehicle-edit-price-discount',
  templateUrl: './customer-vehicle-edit-price-discount.component.html',
  styleUrls: ['./customer-vehicle-edit-price-discount.component.css']
})
export class CustomerVehicleEditPriceDiscountComponent implements OnInit {

  customerVehicleId: string | null;
  customerVehicleEditPriceDiscountUIDTO: CustomerVehicleEditPriceDiscountUIDTO;

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

    this.customerVehicleEditPriceDiscountUIDTO = new CustomerVehicleEditPriceDiscountUIDTO();

    this.customerVehicleEditPriceDiscountUIDTO.customerVehicle = new CustomerVehicle();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'success_message_service_Generic',
        'save_success_message_service_CustomerVehicleEditPriceDiscount'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleEditPriceDiscountUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleEditPriceDiscountUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleEditPriceDiscountUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerVehicleEditPriceDiscountUIDTO.save_success_message_service_CustomerVehicleEditPriceDiscount = translations['save_success_message_service_CustomerVehicleEditPriceDiscount'];

    } catch (error: any) {

      if (error.status == 500) {
        
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditPriceDiscountUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      if (this.customerVehicleId != null) {
        
        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleId).pipe(first()));

        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.customerVehicleEditPriceDiscountUIDTO.customerVehicle = customerVehicleServiceFindById.body;
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditPriceDiscountUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async ngSubmit() {

    this.ngxSpinnerService.show();

    try {

      const customerVehicleServiceSave = await firstValueFrom(this.customerVehicleService.update(this.customerVehicleEditPriceDiscountUIDTO.customerVehicle).pipe(first()));

      if (customerVehicleServiceSave.status == 200 && customerVehicleServiceSave.body != null) {

        this.messageService.add({
          severity: SeverityConstants.SUCCESS,
          summary: '' + this.customerVehicleEditPriceDiscountUIDTO.success_message_service_Generic,
          detail: '' + this.customerVehicleEditPriceDiscountUIDTO.save_success_message_service_CustomerVehicleEditPriceDiscount,
        });
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleEditPriceDiscountUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }
}