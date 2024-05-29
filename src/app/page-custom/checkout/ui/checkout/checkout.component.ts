import { Component, OnInit } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CheckoutUIDTO } from './dto/checkout-ui-dto.dto';
import { AddressRegisterDynamicDialogComponent } from 'src/app/global/page/address/ui/address-register-dynamic-dialog/address-register-dynamic-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { CustomerVehicleService } from 'src/app/global/page/customer-vehicle/service/customer-vehicle.service';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';
import * as moment from 'moment';
import { CustomerAddressService } from 'src/app/global/page/customer-address/service/customer-address.service';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { CustomerAddress } from 'src/app/global/page/customer-address/entity/customer-address.entity';
import { AddressType } from 'src/app/page/admin/address-type/address-type.enum';
import { DecimalPipeService } from 'src/app/utils/service/decimal-utils-service';

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
    private customerService: CustomerService,
    private customerAddressService: CustomerAddressService,
    private customerVehicleService: CustomerVehicleService,
    private decimalPipeService: DecimalPipeService,
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

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'header_Address_Checkout'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.checkoutUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.checkoutUIDTO.header_Address_Checkout = translations['header_Address_Checkout'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.checkoutUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    const currentUser = this.sessionStorageService.getUser();

    try {

      const customerServiceFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

      if (customerServiceFindByEmail.status == 200 && customerServiceFindByEmail.body != null) {
        this.checkoutUIDTO.customer = customerServiceFindByEmail.body;
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.checkoutUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    try {

      const resultCustomerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.checkoutUIDTO.customerVehicleId).pipe(first()));

      if (resultCustomerVehicleServiceFindById.status == 200 && resultCustomerVehicleServiceFindById.body != null) {

        this.checkoutUIDTO.customerVehicle = resultCustomerVehicleServiceFindById.body;

        this.checkoutUIDTO.totalBookingValue = this.rateUtilsService.calculateTotalRate(this.checkoutUIDTO.dateInit, this.checkoutUIDTO.dateEnd, this.checkoutUIDTO.customerVehicle.dailyRate);
        this.checkoutUIDTO.totalBookingValueFormat = this.decimalPipeService.formatR$(this.checkoutUIDTO.totalBookingValue);

        const dateInit = moment(this.checkoutUIDTO.dateInit);
        const dateEnd = moment(this.checkoutUIDTO.dateEnd);

        this.checkoutUIDTO.days = dateEnd.diff(dateInit, 'days');

        this.checkoutUIDTO.dailyRateFormat = this.rateUtilsService.formatDailyRateWithComma(this.checkoutUIDTO.customerVehicle.dailyRate);
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.checkoutUIDTO.error_message_service_Generic,
        detail: error.toString() 
      });
    }

    this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNameCustomer();
    this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNameDelivery();
    this.getCustomerAddressServiceFindByCustomerIdAndAddressTypeNamePickUp();

    this.ngxSpinnerService.hide();
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
      
            if (state.selectCustomerAddressDelivery != null) {
              this.selectCustomerAddressDelivery2(state.selectCustomerAddressDelivery);
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
            
            if (state.selectCustomerAddressPickUp) {
              this.selectCustomerAddressPickUp2(state.selectCustomerAddressPickUp);
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

  selectCustomerAddress(customerAddress: CustomerAddress) {

    if (this.checkoutUIDTO.selectCustomerAddress === customerAddress) {
      this.checkoutUIDTO.selectCustomerAddress = null;
    } else {
      this.checkoutUIDTO.selectCustomerAddress = customerAddress;
    }
  }

  async selectCustomerAddressDelivery(customerAddress: CustomerAddress) {

    if (this.checkoutUIDTO.selectCustomerAddressDelivery === customerAddress) {

      this.checkoutUIDTO.selectCustomerAddressDelivery = null;
      this.checkoutUIDTO.deliveryCost = null;
      this.checkoutUIDTO.deliveryCostFormat = null;

      this.calculateTotalBookingValue();

    } else {
  
      this.checkoutUIDTO.selectCustomerAddressDelivery = customerAddress;
      
      let vehicleAddress = '';
      let addressDelivery = '';

      if (this.checkoutUIDTO.customerVehicle.addresses.length > 0) {

        vehicleAddress = this.checkoutUIDTO.customerVehicle.addresses[0].address.streetAddress + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.number + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.city.cityName + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.city.state.stateName + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.country.countryName;
      }

      if (this.checkoutUIDTO.selectCustomerAddressDelivery != null) {

        addressDelivery = this.checkoutUIDTO.selectCustomerAddressDelivery.address.streetAddress + ', ' +
        this.checkoutUIDTO.selectCustomerAddressDelivery.address.number + ', ' +
        this.checkoutUIDTO.selectCustomerAddressDelivery.address.city.cityName + ', ' +
        this.checkoutUIDTO.selectCustomerAddressDelivery.address.city.state.stateName + ', ' +
        this.checkoutUIDTO.selectCustomerAddressDelivery.address.country.countryName;
      }

      try {

        const distanceInKilometers = await this.calculateDistance(vehicleAddress, addressDelivery);
        const mileageFeeDelivery = this.checkoutUIDTO.customerVehicle.mileageFeeDelivery;
        
        const deliveryCost = distanceInKilometers * mileageFeeDelivery;
        this.checkoutUIDTO.deliveryCost = deliveryCost;
        this.checkoutUIDTO.deliveryCostFormat = this.rateUtilsService.formatBRL(deliveryCost);

        this.calculateTotalBookingValue();
    
      } catch (error) {
          console.error('Erro ao calcular a distância:', error);
      }
    }
  }

  async selectCustomerAddressDelivery2(customerAddress: CustomerAddress) {

    this.checkoutUIDTO.selectCustomerAddressDelivery = customerAddress;
    
    let vehicleAddress = '';
    let addressDelivery = '';

    if (this.checkoutUIDTO.customerVehicle.addresses.length > 0) {

      vehicleAddress = this.checkoutUIDTO.customerVehicle.addresses[0].address.streetAddress + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.number + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.city.cityName + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.city.state.stateName + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.country.countryName;
    }

    if (this.checkoutUIDTO.selectCustomerAddressDelivery != null) {

      addressDelivery = this.checkoutUIDTO.selectCustomerAddressDelivery.address.streetAddress + ', ' +
      this.checkoutUIDTO.selectCustomerAddressDelivery.address.number + ', ' +
      this.checkoutUIDTO.selectCustomerAddressDelivery.address.city.cityName + ', ' +
      this.checkoutUIDTO.selectCustomerAddressDelivery.address.city.state.stateName + ', ' +
      this.checkoutUIDTO.selectCustomerAddressDelivery.address.country.countryName;
    }

    try {

      const distanceInKilometers = await this.calculateDistance(vehicleAddress, addressDelivery);
      const mileageFeeDelivery = this.checkoutUIDTO.customerVehicle.mileageFeeDelivery;
      
      const deliveryCost = distanceInKilometers * mileageFeeDelivery;
      this.checkoutUIDTO.deliveryCost = deliveryCost;
      this.checkoutUIDTO.deliveryCostFormat = this.rateUtilsService.formatBRL(deliveryCost);

      this.calculateTotalBookingValue();
  
    } catch (error) {
        console.error('Erro ao calcular a distância:', error);
    }
  }

  async selectCustomerAddressPickUp(customerAddress: CustomerAddress) {

    if (this.checkoutUIDTO.selectCustomerAddressPickUp === customerAddress) {

      this.checkoutUIDTO.selectCustomerAddressPickUp = null;
      this.checkoutUIDTO.pickUpCost = null;
      this.checkoutUIDTO.pickUpCostFormat = null;

      this.calculateTotalBookingValue();

    } else {

      this.checkoutUIDTO.selectCustomerAddressPickUp = customerAddress;
    
      let vehicleAddress = '';
      let addressPickup = '';
  
      if (this.checkoutUIDTO.customerVehicle.addresses.length > 0) {
  
        vehicleAddress = this.checkoutUIDTO.customerVehicle.addresses[0].address.streetAddress + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.number + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.city.cityName + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.city.state.stateName + ', ' +
        this.checkoutUIDTO.customerVehicle.addresses[0].address.country.countryName;
      }
  
      if (this.checkoutUIDTO.selectCustomerAddressPickUp != null) {
  
        addressPickup = this.checkoutUIDTO.selectCustomerAddressPickUp.address.streetAddress + ', ' +
        this.checkoutUIDTO.selectCustomerAddressPickUp.address.number + ', ' +
        this.checkoutUIDTO.selectCustomerAddressPickUp.address.city.cityName + ', ' +
        this.checkoutUIDTO.selectCustomerAddressPickUp.address.city.state.stateName + ', ' +
        this.checkoutUIDTO.selectCustomerAddressPickUp.address.country.countryName;
      }
  
      try {
  
        const distanceInKilometers = await this.calculateDistance(vehicleAddress, addressPickup);
        const mileageFeePickUp = this.checkoutUIDTO.customerVehicle.mileageFeePickUp;
        
        const pickupCost = distanceInKilometers * mileageFeePickUp;
        this.checkoutUIDTO.pickUpCost = pickupCost;
        this.checkoutUIDTO.pickUpCostFormat = this.rateUtilsService.formatBRL(pickupCost);

        this.calculateTotalBookingValue();
    
      } catch (error) {
          console.error('Erro ao calcular a distância:', error);
      }
    }
  }

  async selectCustomerAddressPickUp2(customerAddress: CustomerAddress) {

    this.checkoutUIDTO.selectCustomerAddressPickUp = customerAddress;
  
    let vehicleAddress = '';
    let addressPickup = '';

    if (this.checkoutUIDTO.customerVehicle.addresses.length > 0) {

      vehicleAddress = this.checkoutUIDTO.customerVehicle.addresses[0].address.streetAddress + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.number + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.city.cityName + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.city.state.stateName + ', ' +
      this.checkoutUIDTO.customerVehicle.addresses[0].address.country.countryName;
    }

    if (this.checkoutUIDTO.selectCustomerAddressPickUp != null) {

      addressPickup = this.checkoutUIDTO.selectCustomerAddressPickUp.address.streetAddress + ', ' +
      this.checkoutUIDTO.selectCustomerAddressPickUp.address.number + ', ' +
      this.checkoutUIDTO.selectCustomerAddressPickUp.address.city.cityName + ', ' +
      this.checkoutUIDTO.selectCustomerAddressPickUp.address.city.state.stateName + ', ' +
      this.checkoutUIDTO.selectCustomerAddressPickUp.address.country.countryName;
    }

    try {

      const distanceInKilometers = await this.calculateDistance(vehicleAddress, addressPickup);
      const mileageFeePickUp = this.checkoutUIDTO.customerVehicle.mileageFeePickUp;
      
      const pickupCost = distanceInKilometers * mileageFeePickUp;
      this.checkoutUIDTO.pickUpCost = pickupCost;
      this.checkoutUIDTO.pickUpCostFormat = this.rateUtilsService.formatBRL(pickupCost);

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

    this.checkoutUIDTO.totalBookingValueFormat = this.decimalPipeService.formatR$(this.checkoutUIDTO.totalBookingValue);
  }
}