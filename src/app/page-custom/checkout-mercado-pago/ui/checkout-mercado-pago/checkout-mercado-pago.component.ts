import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { environment } from 'src/environments/environment';
import { CheckoutMercadoPagoUIDTO } from './dto/checkout-mercado-pago-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleService } from 'src/app/global/page/customer-vehicle/service/customer-vehicle.service';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';

declare const MercadoPago: any;

@Component({
  selector: 'app-checkout-mercado-pago',
  templateUrl: './checkout-mercado-pago.component.html',
  styleUrls: ['./checkout-mercado-pago.component.css']
})
export class CheckoutMercadoPagoComponent implements OnInit, OnChanges {

  checkoutMercadoPagoUIDTO: CheckoutMercadoPagoUIDTO;

  @Input() variavel1: any;
  @Input() variavel2: any;
  @Input() selectAddress: any;

  constructor(private customerVehicleService: CustomerVehicleService,
              private location: Location,
              private messageService: MessageService,
              private ngxSpinnerService: NgxSpinnerService,
              private rateUtilsService: RateUtilsService,
              private sessionStorageService: SessionStorageService,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Este método é chamado sempre que houver alterações nas propriedades de entrada.
    // Você pode colocar aqui a lógica para recarregar os valores quando as variáveis mudarem.
    if (changes) {
      // Faça algo quando variavel1 mudar, por exemplo:
      // this.variavel1 = changes.variavel1.currentValue;
    }

    if (changes) {
      // Faça algo quando variavel2 mudar, por exemplo:
      // this.variavel2 = changes.variavel2.currentValue;
    }
  }

  resetForm() {

    this.checkoutMercadoPagoUIDTO = new CheckoutMercadoPagoUIDTO();

    const state = this.location.getState() as any;
    
    if (state != null) {

      this.checkoutMercadoPagoUIDTO.customerVehicleId = state.customerVehicleId;

      this.checkoutMercadoPagoUIDTO.dateInit = state.dateInit;
      this.checkoutMercadoPagoUIDTO.selectedHourInit = state.selectedHourInit;
      this.checkoutMercadoPagoUIDTO.dateEnd = state.dateEnd;
      this.checkoutMercadoPagoUIDTO.selectedHourEnd = state.selectedHourEnd;
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'error_message_service_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.checkoutMercadoPagoUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.checkoutMercadoPagoUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    try {

      const resultCustomerVehicleServiceGetCustomerVehicleById = await firstValueFrom(this.customerVehicleService.getCustomerVehicleById(this.checkoutMercadoPagoUIDTO.customerVehicleId).pipe(first()));

      if (resultCustomerVehicleServiceGetCustomerVehicleById.status == 200) {

        if (resultCustomerVehicleServiceGetCustomerVehicleById.body != null) {
          this.checkoutMercadoPagoUIDTO.customerVehicle = resultCustomerVehicleServiceGetCustomerVehicleById.body;

          this.checkoutMercadoPagoUIDTO.totalBookingValue = this.rateUtilsService.calculateTotalRate(this.checkoutMercadoPagoUIDTO.dateInit, this.checkoutMercadoPagoUIDTO.dateEnd, this.checkoutMercadoPagoUIDTO.customerVehicle.dailyRate);
        }
      }

    } catch (error: any) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '' + this.checkoutMercadoPagoUIDTO.error_message_service_Generic,
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

    const mp = new MercadoPago('TEST-c5ae5bd9-83f9-4d4f-932d-c9449af2cb3e', {
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

            const yourRequestBodyHere = {
              payer: {
                address: {
                  streetName: 'Street Name',
                  streetNumber: '123',
                  zipCode: '12345',
                },
              },
              notificationUrl: `${environment.api}/mercado-pago/webhook`,
              items: [
                {
                  title: this.checkoutMercadoPagoUIDTO.customerVehicle.vehicle.vehicleBrand.vehicleBrandName + ' ' + this.checkoutMercadoPagoUIDTO.customerVehicle.vehicle.vehicleName + ' ' + this.checkoutMercadoPagoUIDTO.customerVehicle.yearOfTheCar,
                  quantity: 1,
                  unitPrice: this.checkoutMercadoPagoUIDTO.totalBookingValue,
                },
              ],
              externalReference: '',
            };

            return new Promise((resolve, reject) => {

              fetch(`${environment.api}/mercado-pago/create-preference`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.sessionStorageService.getToken()}`
                },
                  body: JSON.stringify(yourRequestBodyHere),
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