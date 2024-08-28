import { Component, OnInit } from '@angular/core';
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
import { AddressRegisterDynamicDialogComponent } from '../../../address/ui/address-register-dynamic-dialog/address-register-dynamic-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomerAddressService } from '../../../customer-address/service/customer-address.service';
import * as moment from 'moment';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-customer-vehicle-detail',
  templateUrl: './customer-vehicle-detail.component.html',
  styleUrls: ['./customer-vehicle-detail.component.css']
})
export class CustomerVehicleDetailComponent implements OnInit {

  customerVehicleDetailUIDTO: CustomerVehicleDetailUIDTO;
  rateUtilsService: RateUtilsService;

  constructor(
    private customerService: CustomerService,
    private customerAddressService: CustomerAddressService,
    private customerVehicleAddressService: CustomerVehicleAddressService,
    private customerVehicleReviewService: CustomerVehicleReviewService,
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private dialogService: DialogService,
    private decimalPipe: DecimalPipe,
    private fileService: FileService,
    private location: Location,
    private messageService: MessageService,
    private rateUtils: RateUtilsService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService,
    private userService: UserService,
  ) {
                
    this.rateUtilsService = rateUtils;
  }

  ngOnInit(): void {
    this.resetDetailForm();
  }

  resetDetailForm() {

    this.customerVehicleDetailUIDTO = new CustomerVehicleDetailUIDTO();

    const state = this.location.getState() as any;
    
    if (state != null) {

      this.customerVehicleDetailUIDTO.customerVehicleId = state.customerVehicleId;

      this.customerVehicleDetailUIDTO.today = moment().toDate();
      this.customerVehicleDetailUIDTO.dateInit = moment(state.dateInit).toDate();
      this.customerVehicleDetailUIDTO.selectedHourInit = state.selectedHourInit;
      this.customerVehicleDetailUIDTO.dateEnd = moment(state.dateEnd).toDate();
      this.customerVehicleDetailUIDTO.selectedHourEnd = state.selectedHourEnd;

      const dateInitMoment = moment(this.customerVehicleDetailUIDTO.dateInit);

      if (dateInitMoment.isSame(moment(), 'day')) {
        this.customerVehicleDetailUIDTO.dateCancelFree = dateInitMoment.toDate();
      } else {
        this.customerVehicleDetailUIDTO.dateCancelFree = moment(this.customerVehicleDetailUIDTO.dateInit).subtract(1, 'day').toDate();
      }
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    try {

      const keys = [
        'error_message_service_Generic', 
        'warn_message_service_Generic',
        'header_Address_CustomerVehicleDetail'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.customerVehicleDetailUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleDetailUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleDetailUIDTO.header_Address_CustomerVehicleDetail = translations['header_Address_CustomerVehicleDetail'];

      this.loadHoursInit();

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    /*
    try {

      const currentUser = this.sessionStorageService.getUser();

      const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

      if (resultCustomerFindByEmail.status == 200) {

        if (resultCustomerFindByEmail.body != null) {
          this.customerVehicleDetailUIDTO.customer = resultCustomerFindByEmail.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }
    */

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

          this.customerVehicleDetailUIDTO.percentages = counts.map(count => {
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
          this.getUserFromCustomerVehicle(this.customerVehicleDetailUIDTO.customerVehicle)
        }
      }

    } catch (error: any) {

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    try {

      const resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle = await firstValueFrom(this.customerVehicleAddressService.findAllByCustomerVehicleIdAndAddressType(this.customerVehicleDetailUIDTO.customerVehicleId, AddressType.VEHICLE).pipe(first()));

      if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.status == 200) {

        if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.body != null) {
          this.customerVehicleDetailUIDTO.listCustomerVehicleAddressVehicle = resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.body;
        }
      }

    } catch (error: any) {
      
      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    try {

      const customerAddressServiceFindByCustomerIdAndAddressTypeName = await firstValueFrom(this.customerAddressService.findByCustomerIdAndAddressTypeName(this.customerVehicleDetailUIDTO.customer.customerId, AddressType.DELIVERY).pipe(first()));

      if (customerAddressServiceFindByCustomerIdAndAddressTypeName.status == 200) {

        if (customerAddressServiceFindByCustomerIdAndAddressTypeName.body != null) {
          this.customerVehicleDetailUIDTO.listCustomerAddressDelivery = customerAddressServiceFindByCustomerIdAndAddressTypeName.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    try {

      const customerAddressServiceFindByCustomerIdAndAddressTypeName = await firstValueFrom(this.customerAddressService.findByCustomerIdAndAddressTypeName(this.customerVehicleDetailUIDTO.customer.customerId, AddressType.PICKUP).pipe(first()));

      if (customerAddressServiceFindByCustomerIdAndAddressTypeName.status == 200) {

        if (customerAddressServiceFindByCustomerIdAndAddressTypeName.body != null) {
          this.customerVehicleDetailUIDTO.listCustomerAddressPickUp = customerAddressServiceFindByCustomerIdAndAddressTypeName.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
    }

    try {

      if (this.customerVehicleDetailUIDTO.customerVehicleId != null) {
        
        const customerVehicleFilePhotoServiceFindByCustomerVehicle = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicle(this.customerVehicleDetailUIDTO.customerVehicleId).pipe(first()));

        if (customerVehicleFilePhotoServiceFindByCustomerVehicle.status == 200) {
          if (customerVehicleFilePhotoServiceFindByCustomerVehicle.body != null) {
            this.customerVehicleDetailUIDTO.customerVehicleFilePhotos = customerVehicleFilePhotoServiceFindByCustomerVehicle.body.map(customerVehicleFilePhoto => {
              return {
                ...customerVehicleFilePhoto,
                dataURI: `data:${customerVehicleFilePhoto.contentType};base64,${customerVehicleFilePhoto.dataAsByteArray}`
              };
            });
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.customerVehicleDetailUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }
  }

  loadHoursInit() {

    const now = new Date();
    const isToday = this.isSameDay(this.customerVehicleDetailUIDTO.dateInit, this.customerVehicleDetailUIDTO.today);

    // Verifica se o horário atual é 23:30 ou mais tarde
    if (now.getHours() === 23 && now.getMinutes() >= 30) {
      this.customerVehicleDetailUIDTO.dateInit = new Date();
      this.customerVehicleDetailUIDTO.dateInit.setDate(this.customerVehicleDetailUIDTO.dateInit.getDate() + 1);
    }

    // Adiciona uma hora ao horário atual
    now.setHours(now.getHours() + 1);

    // Calcula hoursInit com base na dataInit atualizada
    this.customerVehicleDetailUIDTO.hoursInit = Array.from({ length: 48 }, (_, index) => {
      const hour = Math.floor(index / 2);
      const minute: number = index % 2 === 0 ? 0 : 30;
      const hourStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      // Mostra todas as horas se dateInit for amanhã ou mais tarde
      if (this.customerVehicleDetailUIDTO.dateInit > now || !isToday) {
        return hourStr;
      }

      // Caso contrário, mostra apenas as horas futuras de hoje
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
        return ''; // Para horas passadas, retorna uma string vazia
      } else {
        return hourStr;
      }
    }).filter(hour => hour !== ''); // Filtra as horas vazias

    this.ngModelChangeDateInit();
  }

  // Método auxiliar para verificar se duas datas são do mesmo dia
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
  }

  async getUserFromCustomerVehicle(customerVehicle: any) {

    try {

      const userServiceFindByEmail = await firstValueFrom(this.userService.findByEmail(customerVehicle.customer.email).pipe(first()));

      if (userServiceFindByEmail.status == 200) {

        customerVehicle.customer.user = userServiceFindByEmail.body;

        if (customerVehicle.customer.user.photoFileId != null) {
          this.getFileFromCustomerVehicle(customerVehicle);
        }        
      }

    } catch (error: any) {
      
      if (error.status == 500) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
      }
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

  async getFileFromCustomerVehicle (customerVehicle: any) {

    try {

      const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.customer.user.photoFileId).pipe(first()));
        
      if (fileServiceFindById.status == 200) {
        if (fileServiceFindById.body != null) {
          customerVehicle.customer.user.file = fileServiceFindById.body;
          customerVehicle.customer.user.dataURI = `data:${customerVehicle.customer.user.file.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
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

  ngModelChangeDateInit() {

    if (this.customerVehicleDetailUIDTO.customerVehicle != null) {
  
      const dateInitMoment = moment(this.customerVehicleDetailUIDTO.dateInit);
  
      if (dateInitMoment.isSame(moment(), 'day')) {
        this.customerVehicleDetailUIDTO.dateCancelFree = dateInitMoment.toDate();
      } else {
        this.customerVehicleDetailUIDTO.dateCancelFree = moment(this.customerVehicleDetailUIDTO.dateInit).subtract(1, 'day').toDate();
      }
  
      this.rateUtils.calculateTotalRate(
          moment(this.customerVehicleDetailUIDTO.dateInit).toDate(),
          moment(this.customerVehicleDetailUIDTO.dateEnd).toDate(),
          this.customerVehicleDetailUIDTO.customerVehicle.dailyRate
      );
    }
  }

  ngModelChangeDateEnd() {
    this.rateUtils.calculateTotalRate(this.customerVehicleDetailUIDTO.dateInit, this.customerVehicleDetailUIDTO.dateEnd, this.customerVehicleDetailUIDTO.customerVehicle.dailyRate)
  }

  newAddressDeliveryRegisterDynamicDialog(): void {
    const ref = this.dialogService.open(AddressRegisterDynamicDialogComponent, {
      header: '' + this.customerVehicleDetailUIDTO.header_Address_CustomerVehicleDetail,
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow-y': 'auto' },
      baseZIndex: 10000,
      style: { 'max-height': '90%', 'overflow-y': 'auto' },
      closable: true,
      data: {
        newRegister: true
      }
    });
  
    ref.onClose.subscribe((result: any) => {

    });
  }

  newAddressPickUpRegisterDynamicDialog(): void {
    const ref = this.dialogService.open(AddressRegisterDynamicDialogComponent, {
      header: '' + this.customerVehicleDetailUIDTO.header_Address_CustomerVehicleDetail,
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow-y': 'auto' },
      baseZIndex: 10000,
      style: { 'max-height': '90%', 'overflow-y': 'auto' },
      closable: true,
      data: {
        newRegister: true
      }
    });
  
    ref.onClose.subscribe((result: any) => {

    });
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
        selectCustomerAddressDelivery: this.customerVehicleDetailUIDTO.selectedCustomerAddressDelivery,
        selectCustomerAddressPickUp: this.customerVehicleDetailUIDTO.selectedCustomerAddressPickUp
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

            } else {

              this.messageService.add({ 
                severity: 'warn', 
                summary: 'Alerta',
                detail: 'Não é possível termine de validar sua conta primeiro'
              });

            }
          }
        }

      } catch (error: any) {

        if (error.status == 404) {
          this.router.navigate(['customer/customer-validation'], navigationExtras);
          return;
        }

        if (error.status == 500) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
        }
      }
    }
  }
}