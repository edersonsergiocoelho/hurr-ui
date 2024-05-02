import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DecimalPipe, Location } from '@angular/common';
import { first, firstValueFrom } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

import { CustomerVehicleDetailUIDTO } from './dto/customer-vehicle-detail-ui.dto';
import { CustomerVehicleReviewService } from '../../../customer-vehicle-review/service/customer-vehicle-review.service';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { CustomerVehicleAddressService } from '../../../customer-vehicle-address/service/customer-vehicle-address.service';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';
import { AddressType } from 'src/app/page/admin/address-type/address-type.enum';
import { MessageService } from 'primeng/api';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { CustomerService } from '../../../customer/service/customer.service';
import { UserService } from 'src/app/page/user/service/user.service';
import { FileService } from 'src/app/page/file/service/file.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-vehicle-detail',
  templateUrl: './customer-vehicle-detail.component.html',
  styleUrls: ['./customer-vehicle-detail.component.css']
})
export class CustomerVehicleDetailComponent implements OnInit {

  customerVehicleDetailUIDTO: CustomerVehicleDetailUIDTO;

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
              private translateService: TranslateService,
              private customerService: CustomerService,
              private customerVehicleService: CustomerVehicleService,
              private customerVehicleReviewService: CustomerVehicleReviewService,
              private customerVehicleAddressService: CustomerVehicleAddressService,
              private userService: UserService,
              private fileService: FileService,
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

    this.resetDetailForm();
  }

  resetDetailForm () {

    this.customerVehicleDetailUIDTO = new CustomerVehicleDetailUIDTO();

    const state = this.location.getState() as any;
    
    if (state != null) {
      this.customerVehicleDetailUIDTO.customerVehicleId = state.customerVehicleId;

      this.customerVehicleDetailUIDTO.dateInit = state.dateInit;
      this.customerVehicleDetailUIDTO.selectedHourInit = state.selectedHourInit;
      this.customerVehicleDetailUIDTO.dateEnd = state.dateEnd;
      this.customerVehicleDetailUIDTO.selectedHourEnd = state.selectedHourEnd;

      this.customerVehicleDetailUIDTO.dateCancelFree = new Date(this.customerVehicleDetailUIDTO.dateInit);
      this.customerVehicleDetailUIDTO.dateCancelFree.setDate(this.customerVehicleDetailUIDTO.dateCancelFree.getDate() - 1);
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    try {

      const resultFindAllByCustomerVehicleId = await firstValueFrom(this.customerVehicleReviewService.findAllByCustomerVehicleId(this.customerVehicleDetailUIDTO.customerVehicleId).pipe(first()));

      if (resultFindAllByCustomerVehicleId.status == 200) {

        if (resultFindAllByCustomerVehicleId.body != null) {
          this.customerVehicleDetailUIDTO.customersVehiclesReviews = resultFindAllByCustomerVehicleId.body;

          // Inicializar contadores para cada nota
          let counts = [0, 0, 0, 0, 0];

          // Iterar sobre as revisões dos clientes
          for (const review of this.customerVehicleDetailUIDTO.customersVehiclesReviews) {

            this.getUser(review);

            // Incrementar o contador correspondente à nota da revisão
            counts[review.rating - 1]++;
          }

          // Calcular porcentagem para cada nota
          const totalReviews = this.customerVehicleDetailUIDTO.customersVehiclesReviews.length;

          this.percentages = counts.map(count => {
            return (count / totalReviews) * 100;
          });

        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultCustomerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleDetailUIDTO.customerVehicleId).pipe(first()));

      if (resultCustomerVehicleServiceFindById.status == 200) {

        if (resultCustomerVehicleServiceFindById.body != null) {
          this.customerVehicleDetailUIDTO.customerVehicle = resultCustomerVehicleServiceFindById.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle = await firstValueFrom(this.customerVehicleAddressService.findAllByCustomerVehicleIdAndAddressType(this.customerVehicleDetailUIDTO.customerVehicleId, AddressType.VEHICLE).pipe(first()));

      if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.status == 200) {

        if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.body != null) {
          this.customerVehicleDetailUIDTO.listCustomerVehicleAddressVehicle = resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultCVAFindAllByCustomerVehicleIdAndAddressTypeDelivery = await firstValueFrom(this.customerVehicleAddressService.findAllByCustomerVehicleIdAndAddressType(this.customerVehicleDetailUIDTO.customerVehicleId, AddressType.DELIVERY).pipe(first()));

      if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeDelivery.status == 200) {

        if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeDelivery.body != null) {
          this.customerVehicleDetailUIDTO.listCustomerVehicleAddressDelivery = resultCVAFindAllByCustomerVehicleIdAndAddressTypeDelivery.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultCVAFindAllByCustomerVehicleIdAndAddressTypePickup = await firstValueFrom(this.customerVehicleAddressService.findAllByCustomerVehicleIdAndAddressType(this.customerVehicleDetailUIDTO.customerVehicleId, AddressType.PICKUP).pipe(first()));

      if (resultCVAFindAllByCustomerVehicleIdAndAddressTypePickup.status == 200) {

        if (resultCVAFindAllByCustomerVehicleIdAndAddressTypePickup.body != null) {
          this.customerVehicleDetailUIDTO.listCustomerVehicleAddressPickup = resultCVAFindAllByCustomerVehicleIdAndAddressTypePickup.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }
  }

  async getUser(customerVehicleReview: any) {

    try {

      const userServiceFindByEmail = await firstValueFrom(this.userService.findByEmail(customerVehicleReview.customer.email).pipe(first()));

      if (userServiceFindByEmail.status == 200) {

        customerVehicleReview.user = userServiceFindByEmail.body;

        if (customerVehicleReview.user.photoFileId != null) {
          this.getFile(customerVehicleReview)
        }
      }

    } catch (error: any) {
      
      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }
  }

  async getFile (customerVehicleReview: any) {

    try {

      const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicleReview.user.photoFileId).pipe(first()));
        
      if (fileServiceFindById.status == 200) {
        if (fileServiceFindById.body != null) {
          
          customerVehicleReview.file = fileServiceFindById.body;
          customerVehicleReview.dataURI = `data:${customerVehicleReview.file.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
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

    if (this.customerVehicleDetailUIDTO && this.customerVehicleDetailUIDTO.customersVehiclesReviews) {
      const reviews = this.customerVehicleDetailUIDTO.customersVehiclesReviews;
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
    this.customerVehicleDetailUIDTO.dateCancelFree = new Date(this.customerVehicleDetailUIDTO.dateInit);
    this.customerVehicleDetailUIDTO.dateCancelFree.setDate(this.customerVehicleDetailUIDTO.dateCancelFree.getDate() - 1);

    this.rateUtils.calculateTotalRate(this.customerVehicleDetailUIDTO.dateInit, this.customerVehicleDetailUIDTO.dateEnd, this.customerVehicleDetailUIDTO.customerVehicle.dailyRate)
  }

  ngModelChangeDateEnd() {
    this.rateUtils.calculateTotalRate(this.customerVehicleDetailUIDTO.dateInit, this.customerVehicleDetailUIDTO.dateEnd, this.customerVehicleDetailUIDTO.customerVehicle.dailyRate)
  }

  async onClickContinue() {

    const currentUser = this.sessionStorageService.getUser();

    const navigationExtras: NavigationExtras = {
      state: {
        customerVehicleId: this.customerVehicleDetailUIDTO.customerVehicleId,
        dateInit: this.customerVehicleDetailUIDTO.dateInit,
        selectedHourInit: this.customerVehicleDetailUIDTO.selectedHourInit,
        dateEnd: this.customerVehicleDetailUIDTO.dateEnd,
        selectedHourEnd: this.customerVehicleDetailUIDTO.selectedHourEnd,
      }
    };
    
    if (currentUser == null) {
  
      this.router.navigate(['user/login'], navigationExtras);
      
    } else {

      // Customer
      try {

        const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

        if (resultCustomerFindByEmail.status == 200) {

          if (resultCustomerFindByEmail.body != null) {
            const customer = resultCustomerFindByEmail.body;

            if (currentUser.photoValidated == true &&
                customer.phoneValidated == true &&
                customer.emailValidated == true &&
                customer.identityNumberValidated == true &&
                customer.driverLicenseValidated == true) {

              this.router.navigate(['checkout'], navigationExtras);
            }
          }
        }

      } catch (error: any) {

        if (error.status == 404) {
          this.router.navigate(['customer/customer-validation'], navigationExtras);
          return;
        }

        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }
  }
}