import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { first, firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

// DTO's
import { CheckoutUIDTO } from './dto/checkout-ui-dto.dto';

// Component's
import { AddressRegisterDynamicDialogComponent } from 'src/app/global/page/address/ui/address-register-dynamic-dialog/address-register-dynamic-dialog.component';

// Entity's
import { CustomerAddress } from 'src/app/global/page/customer-address/entity/customer-address.entity';

// Enums's
import { AddressType } from 'src/app/page/admin/address-type/address-type.enum';

// Service's
import { CustomerAddressService } from 'src/app/global/page/customer-address/service/customer-address.service';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { CustomerVehicleService } from 'src/app/global/page/customer-vehicle/service/customer-vehicle.service';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    DialogService
  ]
})
export class CheckoutComponent implements OnInit {

  checkoutUIDTO: CheckoutUIDTO;

  constructor(
    private customerAddressService: CustomerAddressService,
    private customerService: CustomerService,
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private dialogService: DialogService,
    private location: Location,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private rateUtilsService: RateUtilsService,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.checkoutUIDTO = new CheckoutUIDTO();

    const state = this.location.getState() as any;
    
    if (state != null) {
      
      this.checkoutUIDTO.customerVehicleId = state.customerVehicleId;

      this.checkoutUIDTO.dateInit = moment(state.dateInit).toDate();
      this.checkoutUIDTO.selectedHourInit = state.selectedHourInit;
      this.checkoutUIDTO.dateEnd = moment(state.dateEnd).toDate();
      this.checkoutUIDTO.selectedHourEnd = state.selectedHourEnd;

      const dateInitMoment = moment(this.checkoutUIDTO.dateInit);

      if (dateInitMoment.isSame(moment(), 'day')) {
        this.checkoutUIDTO.dateCancelFree = dateInitMoment.toDate();
      } else {
        this.checkoutUIDTO.dateCancelFree = moment(this.checkoutUIDTO.dateInit).subtract(1, 'day').toDate();
      }
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
        // Primeiro, carregue as traduções.
        const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

        this.checkoutUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
        this.checkoutUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
        this.checkoutUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
        this.checkoutUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
        this.checkoutUIDTO.header_Address_Checkout = translations['header_Address_Checkout'];

        // Agora, faça as chamadas assíncronas simultaneamente com Promise.all
        const currentUser = this.sessionStorageService.getUser();

        const [customerServiceFindByEmail, customerVehicleServiceFindById, customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto] = await Promise.all([
          firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first())),
          firstValueFrom(this.customerVehicleService.findById(this.checkoutUIDTO.customerVehicleId).pipe(first())),
          firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(this.checkoutUIDTO.customerVehicleId).pipe(first()))
        ]);

        if (customerServiceFindByEmail.status === 200 && customerServiceFindByEmail.body != null) {
            this.checkoutUIDTO.customer = customerServiceFindByEmail.body;
        }

        if (customerVehicleServiceFindById.status === 200 && customerVehicleServiceFindById.body != null) {
            this.checkoutUIDTO.customerVehicle = customerVehicleServiceFindById.body;

            this.checkoutUIDTO.totalBookingValue = this.rateUtilsService.calculateTotalRate(this.checkoutUIDTO.dateInit, this.checkoutUIDTO.dateEnd, this.checkoutUIDTO.customerVehicle.dailyRate);

            const dateInit = moment(this.checkoutUIDTO.dateInit);
            const dateEnd = moment(this.checkoutUIDTO.dateEnd);

            this.checkoutUIDTO.days = dateEnd.diff(dateInit, 'days');
        }

        if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status === 200 && customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
          this.checkoutUIDTO.customerVehicle.file = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
          this.checkoutUIDTO.customerVehicle.dataURI = `data:${customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body.contentType};base64,${customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body.dataAsByteArray}`;
        }

        // Agora, faça as chamadas relacionadas ao endereço, também de forma simultânea.
        await Promise.all([
            this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNameCustomer(),
            this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNameDelivery(),
            this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNamePickUp()
        ]);

    } catch (error: any) {
        this.messageService.add({
            severity: 'error',
            summary: this.checkoutUIDTO.error_message_service_Generic,
            detail: error.toString()
        });
    } finally {
        this.ngxSpinnerService.hide(); // Oculta o spinner de carregamento.
    }
  }

  private loadKeys(): any {
    // Define as chaves para tradução.
    const keys = [
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic',
      'header_Address_Checkout'
    ];
    return keys;
  }

  async getCustomerAddressServiceFindByCustomerIdAndAddressTypeNameCustomer() {

    if (this.checkoutUIDTO.customer != null) {

      try {
        
        const customerAddressServiceFindByCustomerIdAndAddressTypeName = await firstValueFrom(this.customerAddressService.findByCustomerIdAndAddressTypeName(this.checkoutUIDTO.customer.customerId, AddressType.CUSTOMER).pipe(first()));
        
        if (customerAddressServiceFindByCustomerIdAndAddressTypeName.status == 200 && customerAddressServiceFindByCustomerIdAndAddressTypeName.body != null) {
          this.checkoutUIDTO.customersAddresses = customerAddressServiceFindByCustomerIdAndAddressTypeName.body;
        }
        
      } catch (error: any) {
        this.messageService.add({ 
          severity: 'error', 
          summary: '' + this.checkoutUIDTO.error_message_service_Generic,
          detail: error.toString() 
        });
      }
    }
  }

  async getCustomerAddressServiceFindByCustomerIdAndAddressTypeNameDelivery () {

    if (this.checkoutUIDTO.customer != null) {

      try {
        
        const customerAddressServiceFindByCustomerIdAndAddressTypeName = await firstValueFrom(this.customerAddressService.findByCustomerIdAndAddressTypeName(this.checkoutUIDTO.customer.customerId, AddressType.DELIVERY).pipe(first()));
        
        if (customerAddressServiceFindByCustomerIdAndAddressTypeName.status == 200 && customerAddressServiceFindByCustomerIdAndAddressTypeName.body != null) {
          this.checkoutUIDTO.customerAddressDeliverys = customerAddressServiceFindByCustomerIdAndAddressTypeName.body;

          const state = this.location.getState() as any;
    
          if (state != null) {
      
            if (state.selectedCustomerAddressDelivery != null) {
              this.selectedCustomerAddressDelivery2(state.selectedCustomerAddressDelivery);
            }
          }
        }
        
      } catch (error: any) {
        this.messageService.add({ 
          severity: 'error', 
          summary: '' + this.checkoutUIDTO.error_message_service_Generic,
          detail: error.toString() 
        });
      }
    }
  }

  async getCustomerAddressServiceFindByCustomerIdAndAddressTypeNamePickUp () {

    if (this.checkoutUIDTO.customer != null) {

      try {
        
        const customerAddressServiceFindByCustomerIdAndAddressTypeName = await firstValueFrom(this.customerAddressService.findByCustomerIdAndAddressTypeName(this.checkoutUIDTO.customer.customerId, AddressType.PICKUP).pipe(first()));
        
        if (customerAddressServiceFindByCustomerIdAndAddressTypeName.status == 200 && customerAddressServiceFindByCustomerIdAndAddressTypeName.body != null) {
          this.checkoutUIDTO.customersAddressPickups = customerAddressServiceFindByCustomerIdAndAddressTypeName.body;

          const state = this.location.getState() as any;
    
          if (state != null) {
            
            if (state.selectedCustomerAddressPickUp) {
              this.selectedCustomerAddressPickUp2(state.selectedCustomerAddressPickUp);
            }
          }
        }
        
      } catch (error: any) {
        this.messageService.add({ 
          severity: 'error', 
          summary: '' + this.checkoutUIDTO.error_message_service_Generic,
          detail: error.toString() 
        });
      }
    }
  }

  newAddressRegisterDynamicDialog(): void {
    const ref = this.dialogService.open(AddressRegisterDynamicDialogComponent, {
      header: '' + this.checkoutUIDTO.header_Address_Checkout,
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

  editAddressRegisterDynamicDialog(customerAddress: CustomerAddress): void {
    const ref = this.dialogService.open(AddressRegisterDynamicDialogComponent, {
      header: '' + this.checkoutUIDTO.header_Address_Checkout,
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow-y': 'auto' },
      baseZIndex: 10000,
      style: { 'max-height': '90%', 'overflow-y': 'auto' },
      closable: true,
      data: {
        newRegister: false,
        customerAddress: customerAddress
      }
    });
  
    ref.onClose.subscribe((result: any) => {

      this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNameCustomer();
      this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNameDelivery();
      this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNamePickUp();
    });
  }

  selectedCustomerAddress(customerAddress: CustomerAddress) {

    if (this.checkoutUIDTO.selectedCustomerAddress === customerAddress) {
      this.checkoutUIDTO.selectedCustomerAddress = null;
    } else {
      this.checkoutUIDTO.selectedCustomerAddress = customerAddress;
    }
  }

  async selectedCustomerAddressDelivery(customerAddress: CustomerAddress) {

    if (this.checkoutUIDTO.selectedCustomerAddressDelivery === customerAddress) {

      this.checkoutUIDTO.selectedCustomerAddressDelivery = null;
      this.checkoutUIDTO.deliveryCost = null;

      this.calculateTotalBookingValue();

    } else {
  
      this.checkoutUIDTO.selectedCustomerAddressDelivery = customerAddress;
      
      let vehicleAddress = '';
      let addressDelivery = '';

      if (this.checkoutUIDTO.customerVehicle.addresses.length > 0) {

        vehicleAddress = this.checkoutUIDTO.customerVehicle.addresses[0].address.streetAddress + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.number + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.city.cityName + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.city.state.stateName + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.country.countryName;
      }

      if (this.checkoutUIDTO.selectedCustomerAddressDelivery != null) {

        addressDelivery = this.checkoutUIDTO.selectedCustomerAddressDelivery.address.streetAddress + ', ' +
        this.checkoutUIDTO.selectedCustomerAddressDelivery.address.number + ', ' +
        this.checkoutUIDTO.selectedCustomerAddressDelivery.address.city.cityName + ', ' +
        this.checkoutUIDTO.selectedCustomerAddressDelivery.address.city.state.stateName + ', ' +
        this.checkoutUIDTO.selectedCustomerAddressDelivery.address.country.countryName;
      }

      try {

        const distanceInKilometers = await this.calculateDistance(vehicleAddress, addressDelivery);
        const mileageFeeDelivery = this.checkoutUIDTO.customerVehicle.mileageFeeDelivery;
        
        const deliveryCost = distanceInKilometers * mileageFeeDelivery;
        this.checkoutUIDTO.deliveryCost = deliveryCost;

        this.calculateTotalBookingValue();
    
      } catch (error) {
          console.error('Erro ao calcular a distância:', error);
      }
    }
  }

  async selectedCustomerAddressDelivery2(customerAddress: CustomerAddress) {

    this.checkoutUIDTO.selectedCustomerAddressDelivery = customerAddress;
    
    let vehicleAddress = '';
    let addressDelivery = '';

    if (this.checkoutUIDTO.customerVehicle.addresses.length > 0) {

      vehicleAddress = this.checkoutUIDTO.customerVehicle.addresses[0].address.streetAddress + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.number + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.city.cityName + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.city.state.stateName + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.country.countryName;
    }

    if (this.checkoutUIDTO.selectedCustomerAddressDelivery != null) {

      addressDelivery = this.checkoutUIDTO.selectedCustomerAddressDelivery.address.streetAddress + ', ' +
      this.checkoutUIDTO.selectedCustomerAddressDelivery.address.number + ', ' +
      this.checkoutUIDTO.selectedCustomerAddressDelivery.address.city.cityName + ', ' +
      this.checkoutUIDTO.selectedCustomerAddressDelivery.address.city.state.stateName + ', ' +
      this.checkoutUIDTO.selectedCustomerAddressDelivery.address.country.countryName;
    }

    try {

      const distanceInKilometers = await this.calculateDistance(vehicleAddress, addressDelivery);
      const mileageFeeDelivery = this.checkoutUIDTO.customerVehicle.mileageFeeDelivery;
      
      const deliveryCost = distanceInKilometers * mileageFeeDelivery;
      this.checkoutUIDTO.deliveryCost = deliveryCost;

      this.calculateTotalBookingValue();
  
    } catch (error) {
        console.error('Erro ao calcular a distância:', error);
    }
  }

  async selectedCustomerAddressPickUp(customerAddress: CustomerAddress) {

    if (this.checkoutUIDTO.selectedCustomerAddressPickUp === customerAddress) {

      this.checkoutUIDTO.selectedCustomerAddressPickUp = null;
      this.checkoutUIDTO.pickUpCost = null;

      this.calculateTotalBookingValue();

    } else {

      this.checkoutUIDTO.selectedCustomerAddressPickUp = customerAddress;
    
      let vehicleAddress = '';
      let addressPickup = '';
  
      if (this.checkoutUIDTO.customerVehicle.addresses.length > 0) {
  
        vehicleAddress = this.checkoutUIDTO.customerVehicle.addresses[0].address.streetAddress + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.number + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.city.cityName + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.city.state.stateName + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.country.countryName;
      }
  
      if (this.checkoutUIDTO.selectedCustomerAddressPickUp != null) {
  
        addressPickup = this.checkoutUIDTO.selectedCustomerAddressPickUp.address.streetAddress + ', ' +
        this.checkoutUIDTO.selectedCustomerAddressPickUp.address.number + ', ' +
        this.checkoutUIDTO.selectedCustomerAddressPickUp.address.city.cityName + ', ' +
        this.checkoutUIDTO.selectedCustomerAddressPickUp.address.city.state.stateName + ', ' +
        this.checkoutUIDTO.selectedCustomerAddressPickUp.address.country.countryName;
      }
  
      try {
  
        const distanceInKilometers = await this.calculateDistance(vehicleAddress, addressPickup);
        const mileageFeePickUp = this.checkoutUIDTO.customerVehicle.mileageFeePickUp;
        
        const pickupCost = distanceInKilometers * mileageFeePickUp;
        this.checkoutUIDTO.pickUpCost = pickupCost;

        this.calculateTotalBookingValue();
    
      } catch (error) {
          console.error('Erro ao calcular a distância:', error);
      }
    }
  }

  async selectedCustomerAddressPickUp2(customerAddress: CustomerAddress) {

    this.checkoutUIDTO.selectedCustomerAddressPickUp = customerAddress;
  
    let vehicleAddress = '';
    let addressPickup = '';

    if (this.checkoutUIDTO.customerVehicle.addresses.length > 0) {

      vehicleAddress = this.checkoutUIDTO.customerVehicle.addresses[0].address.streetAddress + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.number + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.city.cityName + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.city.state.stateName + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.country.countryName;
    }

    if (this.checkoutUIDTO.selectedCustomerAddressPickUp != null) {

      addressPickup = this.checkoutUIDTO.selectedCustomerAddressPickUp.address.streetAddress + ', ' +
      this.checkoutUIDTO.selectedCustomerAddressPickUp.address.number + ', ' +
      this.checkoutUIDTO.selectedCustomerAddressPickUp.address.city.cityName + ', ' +
      this.checkoutUIDTO.selectedCustomerAddressPickUp.address.city.state.stateName + ', ' +
      this.checkoutUIDTO.selectedCustomerAddressPickUp.address.country.countryName;
    }

    try {

      const distanceInKilometers = await this.calculateDistance(vehicleAddress, addressPickup);
      const mileageFeePickUp = this.checkoutUIDTO.customerVehicle.mileageFeePickUp;
      
      const pickupCost = distanceInKilometers * mileageFeePickUp;
      this.checkoutUIDTO.pickUpCost = pickupCost;

      this.calculateTotalBookingValue();
  
    } catch (error) {
        console.error('Erro ao calcular a distância:', error);
    }
  }

  async calculateDistance(vehicleAddress: string, deliveryAddress: string): Promise<number> {

    const directionsService = new google.maps.DirectionsService();

    const request = {
        origin: vehicleAddress,
        destination: deliveryAddress,
        travelMode: google.maps.TravelMode.DRIVING
    };

    return new Promise<number>((resolve, reject) => {
      directionsService.route(request, (response: any, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            const route = response.routes[0];
            const legs = route.legs[0];
            const distanceInKilometers = legs.distance.value / 1000;
            resolve(distanceInKilometers);
        } else {
            reject(new Error('Failed to calculate directions'));
        }
      });
    });
  }

  calculateTotalBookingValue () {

    this.checkoutUIDTO.totalBookingValue = this.rateUtilsService.calculateTotalRate(this.checkoutUIDTO.dateInit, this.checkoutUIDTO.dateEnd, this.checkoutUIDTO.customerVehicle.dailyRate);
    
    if (this.checkoutUIDTO.deliveryCost != null) {
      this.checkoutUIDTO.totalBookingValue += this.checkoutUIDTO.deliveryCost;
    }

    if (this.checkoutUIDTO.pickUpCost != null) {
      this.checkoutUIDTO.totalBookingValue += this.checkoutUIDTO.pickUpCost;
    }
  }
}