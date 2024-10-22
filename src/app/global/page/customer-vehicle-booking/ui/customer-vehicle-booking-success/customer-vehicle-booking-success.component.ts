import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleBookingSuccessUIDTO } from './dto/customer-vehicle-booking-success-ui-dto.dto';
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { MomentUtilsService } from 'src/app/utils/service/moment-utils-service';

@Component({
  selector: 'app-customer-vehicle-booking-success',
  templateUrl: './customer-vehicle-booking-success.component.html',
  styleUrls: ['./customer-vehicle-booking-success.component.css']
})
export class CustomerVehicleBookingSuccessComponent implements OnInit {

  // DTO que contém os dados do sucesso do agendamento do veículo do cliente.
  customerVehicleBookingSuccessUIDTO: CustomerVehicleBookingSuccessUIDTO;

  constructor(
    // Injeção dos serviços necessários.
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private messageService: MessageService,
    private momentUtilsService: MomentUtilsService,
    private ngxSpinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) { }

  // Método que é executado quando o componente é inicializado.
  ngOnInit() {
    // Reseta o formulário e carrega os parâmetros da rota.
    this.resetForm();
  }

  // Método para inicializar e resetar os dados do formulário.
  resetForm() {

    // Cria uma nova instância do DTO para armazenar os dados.
    this.customerVehicleBookingSuccessUIDTO = new CustomerVehicleBookingSuccessUIDTO();

    // Obtém os parâmetros da URL (query params) e os armazena no DTO.
    this.activatedRoute.queryParams.subscribe(params => {
      this.customerVehicleBookingSuccessUIDTO.collectionId = params['collection_id'];
      this.customerVehicleBookingSuccessUIDTO.collectionStatus = params['collection_status'];
      this.customerVehicleBookingSuccessUIDTO.paymentId = params['payment_id'];
      this.customerVehicleBookingSuccessUIDTO.status = params['status'];
      this.customerVehicleBookingSuccessUIDTO.externalReference = params['external_reference'];
      this.customerVehicleBookingSuccessUIDTO.paymentType = params['payment_type'];
      this.customerVehicleBookingSuccessUIDTO.merchantOrderId = params['merchant_order_id'];
      this.customerVehicleBookingSuccessUIDTO.preferenceId = params['preference_id'];
      this.customerVehicleBookingSuccessUIDTO.siteId = params['site_id'];
      this.customerVehicleBookingSuccessUIDTO.processingMode = params['processing_mode'];
      this.customerVehicleBookingSuccessUIDTO.merchantAccountId = params['merchant_account_id'];
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
      this.customerVehicleBookingSuccessUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.customerVehicleBookingSuccessUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleBookingSuccessUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.customerVehicleBookingSuccessUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      // Segunda operação: busca os dados da reserva de veículo do cliente pelo paymentId.
      const resultCustomerVehicleBookingServiceFindById = await firstValueFrom(this.customerVehicleBookingService.findByPaymentId(this.customerVehicleBookingSuccessUIDTO.paymentId).pipe(first()));

      if (resultCustomerVehicleBookingServiceFindById.status == 200) {
        if (resultCustomerVehicleBookingServiceFindById.body != null) {
          // Se a reserva for encontrada, armazena os dados no DTO.
          this.customerVehicleBookingSuccessUIDTO.customerVehicleBooking = resultCustomerVehicleBookingServiceFindById.body;
          // Calcula a diferença de dias entre a data de início e fim da reserva.
          this.customerVehicleBookingSuccessUIDTO.days = this.momentUtilsService.diffDays(this.customerVehicleBookingSuccessUIDTO.customerVehicleBooking.reservationStartDate, this.customerVehicleBookingSuccessUIDTO.customerVehicleBooking.reservationEndDate);
        }
      }

      // Terceira operação: se houver um ID de veículo do cliente, busca a foto de capa do veículo.
      if (this.customerVehicleBookingSuccessUIDTO.customerVehicleBooking.customerVehicle.customerVehicleId != null) {

        const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(this.customerVehicleBookingSuccessUIDTO.customerVehicleBooking.customerVehicle.customerVehicleId).pipe(first()));
        
        if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200) {
          if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
            // Se a foto for encontrada, armazena no DTO e gera o URI de base64 para exibição.
            this.customerVehicleBookingSuccessUIDTO.customerVehicleFilePhoto = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
            this.customerVehicleBookingSuccessUIDTO.customerVehicleFilePhoto.dataURI = `data:${this.customerVehicleBookingSuccessUIDTO.customerVehicleFilePhoto.contentType};base64,${this.customerVehicleBookingSuccessUIDTO.customerVehicleFilePhoto.dataAsByteArray}`;
          }
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe a mensagem de erro usando o serviço de mensagens.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBookingSuccessUIDTO.error_summary_message_service_Generic,
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
      'warn_summary_message_service_Generic',
      'error_summary_message_service_Generic',
      'info_summary_message_service_Generic',
      'success_summary_message_service_Generic'
    ];
    return keys;
  }

  getVehicleColorStyle(vehicleColorName: string): string {
    switch(vehicleColorName.toLowerCase()) {
      case 'preto': return '#000000';
      case 'branco': return '#FFFFFF';
      case 'prata': return '#C0C0C0';
      case 'cinza': return '#808080';
      case 'vermelho': return '#FF0000';
      case 'azul': return '#0000FF';
      case 'amarelo': return '#FFFF00';
      case 'verde': return '#008000';
      case 'marrom': return '#A52A2A';
      case 'bege': return '#F5F5DC';
      default: return '#D3D3D3';  // Cor padrão para cores não mapeadas
    }
  }

  // Método para imprimir a página.
  navigateToCustomerVehicleBooking() {
    this.router.navigate(['customer-vehicle-booking']);
  }

  // Método para imprimir a página.
  printPage() {
    window.print();
  }
}