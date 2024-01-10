import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DecimalPipe, Location } from '@angular/common';

import { CustomerVehicleDetailUUIDTO } from './dto/customer-vehicle-detail-ui.dto';

import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleReviewService } from '../../../customer-vehicle-review/service/customer-vehicle-review.service';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { CustomerVehicleAddressService } from '../../../customer-vehicle-address/service/customer-vehicle-address.service';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';
import { AddressType } from 'src/app/page/admin/address-type/address-type.enum';
import { MessageService } from 'primeng/api';
import { NavigationExtras, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';

@Component({
  selector: 'app-customer-vehicle-detail',
  templateUrl: './customer-vehicle-detail.component.html',
  styleUrls: ['./customer-vehicle-detail.component.css']
})
export class CustomerVehicleDetailComponent implements OnInit {

  customerVehicleDetailUUIDTO: CustomerVehicleDetailUUIDTO;

  rateUtilsService: RateUtilsService;

  images: any;
  responsiveOptions: any;
  valueRating: number = 5;
  percentages: any;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private location: Location,
              private decimalPipe: DecimalPipe,
              private router: Router,

              private sessionStorageService: SessionStorageService,

              private messageService: MessageService,

              private customerVehicleService: CustomerVehicleService,
              private customerVehicleReviewService: CustomerVehicleReviewService,
              private customerVehicleAddressService: CustomerVehicleAddressService,
              
              private rateUtils: RateUtilsService) {
                
    this.rateUtilsService = rateUtils;

    this.images = [
      { itemImageSrc: 'assets/images/vehicle/Corolla.png', thumbnailImageSrc: 'assets/images/vehicle/Corolla.png' },
      // Adicione mais imagens se necessário no mesmo formato
    ];

    // Defina suas opções de resposta (responsive options) conforme necessário
    this.responsiveOptions = [
      // Defina suas opções de resposta aqui
    ];
  }

  ngOnInit(): void {

    this.resetRegisterForm();
  }

  resetRegisterForm () {

    this.customerVehicleDetailUUIDTO = new CustomerVehicleDetailUUIDTO();

    const state = this.location.getState() as any;
    
    if (state != null) {
      this.customerVehicleDetailUUIDTO.customerVehicleId = state.customerVehicleId;

      this.customerVehicleDetailUUIDTO.dateInit = state.dateInit;
      this.customerVehicleDetailUUIDTO.selectedHourInit = state.selectedHourInit;
      this.customerVehicleDetailUUIDTO.dateEnd = state.dateEnd;
      this.customerVehicleDetailUUIDTO.selectedHourEnd = state.selectedHourEnd;

      this.customerVehicleDetailUUIDTO.dateCancelFree = new Date(this.customerVehicleDetailUUIDTO.dateInit);
      this.customerVehicleDetailUUIDTO.dateCancelFree.setDate(this.customerVehicleDetailUUIDTO.dateCancelFree.getDate() - 1);
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    try {

      const resultFindAllByCustomerVehicleId = await firstValueFrom(this.customerVehicleReviewService.findAllByCustomerVehicleId(this.customerVehicleDetailUUIDTO.customerVehicleId).pipe(first()));

      if (resultFindAllByCustomerVehicleId.status == 200) {

        if (resultFindAllByCustomerVehicleId.body != null) {
          this.customerVehicleDetailUUIDTO.customersVehiclesReviews = resultFindAllByCustomerVehicleId.body;

          // Inicializar contadores para cada nota
          let counts = [0, 0, 0, 0, 0];

          // Contar o número de ocorrências para cada nota
          this.customerVehicleDetailUUIDTO.customersVehiclesReviews.forEach(review => {
            counts[review.rating - 1]++;
          });

          // Calcular porcentagem para cada nota
          const totalReviews = this.customerVehicleDetailUUIDTO.customersVehiclesReviews.length;

          this.percentages = counts.map(count => {
            return (count / totalReviews) * 100;
          });

        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultFindAllByCustomerVehicleId = await firstValueFrom(this.customerVehicleService.getCustomerVehicleById(this.customerVehicleDetailUUIDTO.customerVehicleId).pipe(first()));

      if (resultFindAllByCustomerVehicleId.status == 200) {

        if (resultFindAllByCustomerVehicleId.body != null) {
          this.customerVehicleDetailUUIDTO.customerVehicle = resultFindAllByCustomerVehicleId.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle = await firstValueFrom(this.customerVehicleAddressService.findAllByCustomerVehicleIdAndAddressType(this.customerVehicleDetailUUIDTO.customerVehicleId, AddressType.VEHICLE).pipe(first()));

      if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.status == 200) {

        if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.body != null) {
          this.customerVehicleDetailUUIDTO.listCustomerVehicleAddressVehicle = resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultCVAFindAllByCustomerVehicleIdAndAddressTypeDelivery = await firstValueFrom(this.customerVehicleAddressService.findAllByCustomerVehicleIdAndAddressType(this.customerVehicleDetailUUIDTO.customerVehicleId, AddressType.DELIVERY).pipe(first()));

      if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeDelivery.status == 200) {

        if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeDelivery.body != null) {
          this.customerVehicleDetailUUIDTO.listCustomerVehicleAddressDelivery = resultCVAFindAllByCustomerVehicleIdAndAddressTypeDelivery.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultCVAFindAllByCustomerVehicleIdAndAddressTypePickup = await firstValueFrom(this.customerVehicleAddressService.findAllByCustomerVehicleIdAndAddressType(this.customerVehicleDetailUUIDTO.customerVehicleId, AddressType.PICKUP).pipe(first()));

      if (resultCVAFindAllByCustomerVehicleIdAndAddressTypePickup.status == 200) {

        if (resultCVAFindAllByCustomerVehicleIdAndAddressTypePickup.body != null) {
          this.customerVehicleDetailUUIDTO.listCustomerVehicleAddressPickup = resultCVAFindAllByCustomerVehicleIdAndAddressTypePickup.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }
  }

  getFilledStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    const emptyStars = 5 - rating;
    return Array(emptyStars).fill(0);
  }

  getAverageRating(): number {
    let totalRating = 0;

    if (this.customerVehicleDetailUUIDTO && this.customerVehicleDetailUUIDTO.customersVehiclesReviews) {
      const reviews = this.customerVehicleDetailUUIDTO.customersVehiclesReviews;
      const totalReviews = reviews.length;

      if (totalReviews > 0) {
        totalRating = reviews.reduce((acc: number, review: any) => acc + review.rating, 0);
        return totalRating / totalReviews;
      }
    }

    return totalRating;
  }

  handlePercentage(percentage: number): string {
    return !isNaN(percentage) ? percentage.toFixed(2) + '%' : '0';
  }

  formatDailyRateWithComma(dailyRate: number): string {
    return this.decimalPipe?.transform(dailyRate, '1.2-2')?.replace('.', ',') ?? '';
  }

  ngModelChangeDateInit() {
    this.customerVehicleDetailUUIDTO.dateCancelFree = new Date(this.customerVehicleDetailUUIDTO.dateInit);
    this.customerVehicleDetailUUIDTO.dateCancelFree.setDate(this.customerVehicleDetailUUIDTO.dateCancelFree.getDate() - 1);

    this.rateUtils.calculateTotalRate(this.customerVehicleDetailUUIDTO.dateInit, this.customerVehicleDetailUUIDTO.dateEnd, this.customerVehicleDetailUUIDTO.customerVehicle.dailyRate)
  }

  ngModelChangeDateEnd() {
    this.rateUtils.calculateTotalRate(this.customerVehicleDetailUUIDTO.dateInit, this.customerVehicleDetailUUIDTO.dateEnd, this.customerVehicleDetailUUIDTO.customerVehicle.dailyRate)
  }

  onClickContinue() {

    const token = this.sessionStorageService.getToken();
    
    if (token == null) {

      const navigationExtras: NavigationExtras = {
        state: {
          //customerVehicleId: customerVehicle.customerVehicleId,
          //place: JSON.stringify(this.place),
          //dateInit: this.dateInit,
          //selectedHourInit: this.selectedHourInit,
          //dateEnd: this.dateEnd,
          //selectedHourEnd: this.selectedHourEnd,
        }
      };
  
      this.router.navigate(['user/login'], navigationExtras);
      
    } else {

      const navigationExtras: NavigationExtras = {
        state: {
          //customerVehicleId: customerVehicle.customerVehicleId,
          //place: JSON.stringify(this.place),
          //dateInit: this.dateInit,
          //selectedHourInit: this.selectedHourInit,
          //dateEnd: this.dateEnd,
          //selectedHourEnd: this.selectedHourEnd,
        }
      };

      this.router.navigate(['customer/customer-validation'], navigationExtras);
    }
  }
}