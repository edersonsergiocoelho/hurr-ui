import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleService } from 'src/app/global/page/customer-vehicle/service/customer-vehicle.service';
import { CustomerAddress } from 'src/app/global/page/customer-address/entity/customer-address.entity';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { CheckOutMPUIDTO } from './dto/check-out-mp-ui-dto.dto';

export type MetadataMap = { [key: string]: any };

declare const MercadoPago: any;

@Component({
  selector: 'app-check-out-mp',
  templateUrl: './check-out-mp.component.html',
  styleUrls: ['./check-out-mp.component.css']
})
export class CheckOutMPComponent implements OnInit, OnChanges {

  checkOutMPUIDTO: CheckOutMPUIDTO;
  
  @Input() customerId: string;

  @Input() selectedCustomerAddressBilling: CustomerAddress | null;

  @Input() selectedCustomerAddressDelivery: CustomerAddress | null;
  @Input() customerAddressDeliveryValue: number | null;

  @Input() selectedCustomerAddressPickUp: CustomerAddress | null;
  @Input() customerAddressPickUpValue: number | null;
  

  @Input() totalBookingValue: number;

  constructor(
    private customerService: CustomerService,
    private customerVehicleService: CustomerVehicleService,
    private location: Location,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {

    if (simpleChanges['selectedCustomerAddressDelivery']) {
      this.selectedCustomerAddressDelivery = simpleChanges['selectedCustomerAddressDelivery'].currentValue;
    }

    if (simpleChanges['selectCustomerAddressPickUp']) {
      this.selectedCustomerAddressPickUp = simpleChanges['selectedCustomerAddressPickUp'].currentValue;
    }

    if (simpleChanges['selectedCustomerAddressBilling']) {
      this.selectedCustomerAddressBilling = simpleChanges['selectedCustomerAddressBilling'].currentValue;
    }

    if (simpleChanges['totalBookingValue']) {
      this.totalBookingValue = simpleChanges['totalBookingValue'].currentValue;
    }
  }

  resetForm() {

    this.checkOutMPUIDTO = new CheckOutMPUIDTO();

    const state = this.location.getState() as any;
   
    if (state != null) {

      this.checkOutMPUIDTO.customerVehicleId = state.customerVehicleId;

      this.checkOutMPUIDTO.dateInit = state.dateInit;
      this.checkOutMPUIDTO.selectedHourInit = state.selectedHourInit;
      this.checkOutMPUIDTO.dateEnd = state.dateEnd;
      this.checkOutMPUIDTO.selectedHourEnd = state.selectedHourEnd;
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_summary_message_service_Generic',
        'warn_summary_message_service_Generic',
        'select_customer_address_Address_Checkout'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.checkOutMPUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.checkOutMPUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.checkOutMPUIDTO.select_customer_address_Address_Checkout = translations['select_customer_address_Address_Checkout'];

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.checkOutMPUIDTO.error_summary_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const resultCustomerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.checkOutMPUIDTO.customerVehicleId).pipe(first()));

      if (resultCustomerVehicleServiceFindById.status == 200) {

        if (resultCustomerVehicleServiceFindById.body != null) {
          this.checkOutMPUIDTO.customerVehicle = resultCustomerVehicleServiceFindById.body;
        }
      }
      
      const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findById(this.customerId).pipe(first()));

      if (resultCustomerFindByEmail.status == 200) {

        if (resultCustomerFindByEmail.body != null) {
          this.checkOutMPUIDTO.customer = resultCustomerFindByEmail.body;
        }
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR, 
        summary: this.checkOutMPUIDTO.error_summary_message_service_Generic,
        detail: error.toString() 
      });
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      this.setupMercadoPago();
    };
    document.body.appendChild(script);

    this.ngxSpinnerService.hide();

  }

  private setupMercadoPago(): void {

    const mp = new MercadoPago(`${environment.publicKeyMercadoPago}`, {
      locale: 'pt-BR'
    });

    const bricksBuilder = mp.bricks();
    const renderWalletBrick = async (bricksBuilder) => {
      const settings = {
        initialization: {
          redirectMode: 'modal',
        },
        customization: {
          texts: {
            action: 'pay',
            valueProp: 'security_safety',
          },
          visual: {
            hideValueProp: false,
            buttonBackground: 'default', // default, black, blue, white
            valuePropColor: 'grey', // grey, white
            buttonHeight: '48px', // min 48px - max free
            borderRadius: '6px',
            verticalPadding: '16px', // min 16px - max free
            horizontalPadding: '0px', // min 0px - max free
          },
          checkout: {
            theme: {
              elementsColor: '#4287F5', // color hex code
              headerColor: '#4287F5', // color hex code
            },
          },
        },
        callbacks: {
          onReady: () => {
          /*
          Callback called when Brick is ready.
          Here you can hide loadings from your site, for example.
          */
          },
          onSubmit: (formData) => {
            /*
            Callback called when clicking Wallet Brick
            this is possible because the brick is a button
            at this time of submit, you must create the preference
            */

            if (this.selectedCustomerAddressBilling == null) {

              this.messageService.add({
                severity: SeverityConstants.WARN,
                summary: '' + this.checkOutMPUIDTO.warn_summary_message_service_Generic,
                detail: '' + this.checkOutMPUIDTO.select_customer_address_Address_Checkout
              });

              return;
            }

            const metadataMap = new Map<string, any>();
            metadataMap.set('webhookAction', 'CUSTOMER_VEHICLE_BOOKING_PAYMENT');
            metadataMap.set('customerVehicleId', this.checkOutMPUIDTO.customerVehicleId);
            metadataMap.set('customerId', this.customerId);
            metadataMap.set('customerAddressBillingId', this.selectedCustomerAddressBilling.customerAddressId);

            if (this.selectedCustomerAddressDelivery != null) {
              metadataMap.set('customerAddressDeliveryId', this.selectedCustomerAddressDelivery.customerAddressId);
              metadataMap.set('customerAddressDeliveryValue', this.customerAddressDeliveryValue);
            }

            if (this.selectedCustomerAddressPickUp != null) {
              metadataMap.set('customerAddressPickUpId', this.selectedCustomerAddressPickUp.customerAddressId);
              metadataMap.set('customerAddressPickUpValue', this.customerAddressPickUpValue);
            }

            metadataMap.set('reservationStartDate', this.checkOutMPUIDTO.dateInit);
            metadataMap.set('reservationStartTime', this.checkOutMPUIDTO.selectedHourInit);
            metadataMap.set('reservationEndDate', this.checkOutMPUIDTO.dateEnd);
            metadataMap.set('reservationEndTime', this.checkOutMPUIDTO.selectedHourEnd);
            metadataMap.set('totalBookingValue', this.totalBookingValue);
            
            const metadataObject = Object.fromEntries(metadataMap);

            const preferenceRequest = {
              items: [
                {
                  title: this.checkOutMPUIDTO.customerVehicle.vehicle.vehicleBrand.vehicleBrandName + ' ' + this.checkOutMPUIDTO.customerVehicle.vehicle.vehicleName + ' ' + this.checkOutMPUIDTO.customerVehicle.yearOfTheCar,
                  quantity: 1,
                  unitPrice: this.totalBookingValue,
                },
              ],
              payer: {
                name: this.checkOutMPUIDTO.customer.firstName,
                surname: this.checkOutMPUIDTO.customer.lastName,
                email: this.checkOutMPUIDTO.customer.email,
                address: {
                  streetName: this.selectedCustomerAddressBilling.address.streetAddress,
                  streetNumber: this.selectedCustomerAddressBilling.address.number,
                  zipCode: this.selectedCustomerAddressBilling.address.zipCode.replace(".", "").replace("-", ""),
                },
              },
              notificationUrl: `${environment.apiMercadoPago}`,
              backUrls: {
                success: `${environment.apiUI}/customer-vehicle-booking/success`
              },
              metadata: metadataObject
            };

            return new Promise((resolve, reject) => {

              fetch(`${environment.api}/mp/preference`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.sessionStorageService.getToken()}`
                },
                  body: JSON.stringify(preferenceRequest),
                })
                  .then((response) => response.json())
                  .then((response) => {
                  // resolve the promise with the ID of the preference
                  resolve(response.id);
                })
                .catch((error) => {
                  // handle error response when trying to create preference
                  reject();
                });
            });
          },
        },
      };

      try {
        mp.bricks().create("wallet", "walletBrick_container", settings);
      } catch (error) {
        console.error('Error creating Bricks:', error);
      }
    };
    
    renderWalletBrick(bricksBuilder);
  }
}