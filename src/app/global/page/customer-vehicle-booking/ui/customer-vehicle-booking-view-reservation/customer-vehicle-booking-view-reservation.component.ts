import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleBookingViewReservationUIDTO } from './dto/customer-vehicle-booking-view-reservation-ui-dto.dto';
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { MomentUtilsService } from 'src/app/utils/service/moment-utils-service';

@Component({
  selector: 'app-customer-vehicle-booking-view-reservation',
  templateUrl: './customer-vehicle-booking-view-reservation.component.html',
  styleUrls: ['./customer-vehicle-booking-view-reservation.component.css']
})
export class CustomerVehicleBookingViewReservationComponent implements OnInit {

  // DTO que contém os dados do sucesso do agendamento do veículo do cliente.
  customerVehicleBookingViewReservationUIDTO: CustomerVehicleBookingViewReservationUIDTO;

  constructor(
    // Injeção dos serviços necessários.
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private messageService: MessageService,
    private momentUtilsService: MomentUtilsService,
    private ngxSpinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) { }

  // Método que é executado quando o componente é inicializado.
  ngOnInit() {
    // Define o idioma padrão como 'pt_BR'.
    this.translateService.setDefaultLang('pt_BR');
    // Reseta o formulário e carrega os parâmetros da rota.
    this.resetForm();
  }

  // Método para inicializar e resetar os dados do formulário.
  resetForm() {

    // Cria uma nova instância do DTO para armazenar os dados.
    this.customerVehicleBookingViewReservationUIDTO = new CustomerVehicleBookingViewReservationUIDTO();

    // Obtém os parâmetros da URL (query params) e os armazena no DTO.
    this.route.queryParams.subscribe(params => {
      this.customerVehicleBookingViewReservationUIDTO.collectionId = params['collection_id'];
      this.customerVehicleBookingViewReservationUIDTO.collectionStatus = params['collection_status'];
      this.customerVehicleBookingViewReservationUIDTO.paymentId = params['payment_id'];
      this.customerVehicleBookingViewReservationUIDTO.status = params['status'];
      this.customerVehicleBookingViewReservationUIDTO.externalReference = params['external_reference'];
      this.customerVehicleBookingViewReservationUIDTO.paymentType = params['payment_type'];
      this.customerVehicleBookingViewReservationUIDTO.merchantOrderId = params['merchant_order_id'];
      this.customerVehicleBookingViewReservationUIDTO.preferenceId = params['preference_id'];
      this.customerVehicleBookingViewReservationUIDTO.siteId = params['site_id'];
      this.customerVehicleBookingViewReservationUIDTO.processingMode = params['processing_mode'];
      this.customerVehicleBookingViewReservationUIDTO.merchantAccountId = params['merchant_account_id'];
    });

    // Chama o método assíncrono para carregar os dados e realizar as operações.
    this.asyncCallFunctions();
  }

  // Método assíncrono que realiza várias chamadas de serviço para buscar dados e traduzir textos.
  async asyncCallFunctions() {

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
      // Primeira operação: carrega as traduções necessárias para as mensagens genéricas.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Armazena as traduções no DTO.
      this.customerVehicleBookingViewReservationUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleBookingViewReservationUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleBookingViewReservationUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.customerVehicleBookingViewReservationUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];

      // Segunda operação: busca os dados da reserva de veículo do cliente pelo paymentId.
      const resultCustomerVehicleBookingServiceFindById = await firstValueFrom(this.customerVehicleBookingService.findByPaymentId(this.customerVehicleBookingViewReservationUIDTO.paymentId).pipe(first()));

      if (resultCustomerVehicleBookingServiceFindById.status == 200) {
        if (resultCustomerVehicleBookingServiceFindById.body != null) {
          // Se a reserva for encontrada, armazena os dados no DTO.
          this.customerVehicleBookingViewReservationUIDTO.customerVehicleBooking = resultCustomerVehicleBookingServiceFindById.body;
          // Calcula a diferença de dias entre a data de início e fim da reserva.
          this.customerVehicleBookingViewReservationUIDTO.days = this.momentUtilsService.diffDays(this.customerVehicleBookingViewReservationUIDTO.customerVehicleBooking.reservationStartDate, this.customerVehicleBookingViewReservationUIDTO.customerVehicleBooking.reservationEndDate);
        }
      }

      // Terceira operação: se houver um ID de veículo do cliente, busca a foto de capa do veículo.
      if (this.customerVehicleBookingViewReservationUIDTO.customerVehicleBooking.customerVehicle.customerVehicleId != null) {

        const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(this.customerVehicleBookingViewReservationUIDTO.customerVehicleBooking.customerVehicle.customerVehicleId).pipe(first()));
        
        if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200) {
          if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
            // Se a foto for encontrada, armazena no DTO e gera o URI de base64 para exibição.
            this.customerVehicleBookingViewReservationUIDTO.customerVehicleFilePhoto = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
            this.customerVehicleBookingViewReservationUIDTO.customerVehicleFilePhoto.dataURI = `data:${this.customerVehicleBookingViewReservationUIDTO.customerVehicleFilePhoto.contentType};base64,${this.customerVehicleBookingViewReservationUIDTO.customerVehicleFilePhoto.dataAsByteArray}`;
          }
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe a mensagem de erro usando o serviço de mensagens.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBookingViewReservationUIDTO.error_message_service_Generic,
        detail: error.error?.message || error.toString()
      });
    } finally {
      // Oculta o spinner de carregamento após todas as operações.
      this.ngxSpinnerService.hide();
    }
  }

  // Método que define as chaves que serão usadas para carregar as traduções.
  private loadKeys(): any {
    // Define as chaves para tradução.
    const keys = [
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic'
    ];
    return keys;
  }

  // Método para imprimir a página.
  printPage() {
    window.print();
  }
}