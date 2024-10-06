import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { environment } from 'src/environments/environment';
import { CheckOutMPPaymentAdditionalUIDTO } from './dto/check-out-mp-payment-additional-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleService } from 'src/app/global/page/customer-vehicle/service/customer-vehicle.service';
import { CustomerAddress } from 'src/app/global/page/customer-address/entity/customer-address.entity';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerService } from 'src/app/global/page/customer/service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerVehicleBookingService } from 'src/app/global/page/customer-vehicle-booking/service/customer-vehicle-booking.service';

export type MetadataMap = { [key: string]: any };

declare const MercadoPago: any;

@Component({
  selector: 'app-check-out-mp-payment-additional',
  templateUrl: './check-out-mp-payment-additional.component.html',
  styleUrls: ['./check-out-mp-payment-additional.component.css']
})
export class CheckOutMPPaymentAdditionalComponent implements OnInit {

  checkOutMPPaymentAdditionalUIDTO: CheckOutMPPaymentAdditionalUIDTO;
  
  @Input() customerId: string;
  @Input() customerVehicleBookingId: string | null;

  @Input() selectCustomerAddressDelivery: CustomerAddress | null;
  @Input() customerAddressDeliveryValue: number | null;

  @Input() selectCustomerAddressPickUp: CustomerAddress | null;
  @Input() customerAddressPickUpValue: number | null;
  
  @Input() selectCustomerAddress: CustomerAddress | null;

  @Input() totalBookingValue: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private location: Location,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleBookingId = params.get('customerVehicleBookingId');
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  /*
  ngOnChanges(simpleChanges: SimpleChanges): void {

    if (simpleChanges['selectCustomerAddressDelivery']) {
      this.selectCustomerAddressDelivery = simpleChanges['selectCustomerAddressDelivery'].currentValue;
    }

    if (simpleChanges['selectCustomerAddressPickUp']) {
      this.selectCustomerAddressPickUp = simpleChanges['selectCustomerAddressPickUp'].currentValue;
    }

    if (simpleChanges['selectCustomerAddress']) {
      this.selectCustomerAddress = simpleChanges['selectCustomerAddress'].currentValue;
    }

    if (simpleChanges['totalBookingValue']) {
      this.totalBookingValue = simpleChanges['totalBookingValue'].currentValue;
    }
  }
  */

  resetForm() {

    this.checkOutMPPaymentAdditionalUIDTO = new CheckOutMPPaymentAdditionalUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic',
        'warn_message_service_Generic',
        'select_customer_address_Address_Checkout'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.checkOutMPPaymentAdditionalUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.checkOutMPPaymentAdditionalUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];

    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.checkOutMPPaymentAdditionalUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      if (this.customerVehicleBookingId != null) {

        const resultCustomerVehicleServiceFindById = await firstValueFrom(this.customerVehicleBookingService.findById(this.customerVehicleBookingId).pipe(first()));
  
        if (resultCustomerVehicleServiceFindById.status == 200) {
  
          if (resultCustomerVehicleServiceFindById.body != null) {
            this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking = resultCustomerVehicleServiceFindById.body;
          }
        }
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: SeverityConstants.ERROR, 
        summary: this.checkOutMPPaymentAdditionalUIDTO.error_message_service_Generic,
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

            const metadataMap = new Map<string, any>();
            metadataMap.set('customerVehicleId', this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customerVehicle.customerVehicleId);
            metadataMap.set('customerId', this.customerId);

            if (this.selectCustomerAddressDelivery != null) {
              metadataMap.set('customerAddressDeliveryId', this.selectCustomerAddressDelivery.customerAddressId);
              metadataMap.set('customerAddressDeliveryValue', this.selectCustomerAddressDelivery.customerAddressId);
            }

            if (this.selectCustomerAddressPickUp != null) {
              metadataMap.set('customerAddressPickUpId', this.selectCustomerAddressPickUp.customerAddressId);
              metadataMap.set('customerAddressPickUpValue', this.selectCustomerAddressPickUp.customerAddressId);
            }

            metadataMap.set('customerAddressId', this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customerAddressBilling?.customerAddressId);
            metadataMap.set('reservationStartDate', this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.reservationStartDate);
            metadataMap.set('reservationStartTime', this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.reservationStartTime);
            metadataMap.set('reservationEndDate', this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.reservationEndDate);
            metadataMap.set('reservationEndTime', this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.reservationEndTime);
            metadataMap.set('totalBookingValue', this.totalBookingValue);
            
            const metadataObject = Object.fromEntries(metadataMap);

            const preferenceRequest = {
              items: [
                {
                  title: this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customerVehicle.vehicle.vehicleBrand.vehicleBrandName + ' ' + this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customerVehicle.vehicle.vehicleName + ' ' + this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customerVehicle.yearOfTheCar,
                  quantity: 1,
                  unitPrice: this.totalBookingValue,
                },
              ],
              payer: {
                name: this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customer.firstName,
                surname: this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customer.lastName,
                email: this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customer.email,
                address: {
                  streetName: this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customerAddressBilling?.address.streetAddress,
                  streetNumber: this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customerAddressBilling?.address.number,
                  zipCode: this.checkOutMPPaymentAdditionalUIDTO.customerVehicleBooking.customerAddressBilling?.address.zipCode.replace(".", "").replace("-", ""),
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