import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleBookingCustomerVehicleViewInvoiceUIDTO } from './dto/customer-vehicle-booking-customer-vehicle-view-invoice-ui-dto.dto';
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { MomentUtilsService } from 'src/app/utils/service/moment-utils-service';

@Component({
  selector: 'app-customer-vehicle-booking-customer-vehicle-view-invoice',
  templateUrl: './customer-vehicle-booking-customer-vehicle-view-invoice.component.html',
  styleUrls: ['./customer-vehicle-booking-customer-vehicle-view-invoice.component.css']
})
export class CustomerVehicleBookingCustomerVehicleViewInvoiceComponent implements OnInit {

  // DTO que contém os dados do sucesso do agendamento do veículo do cliente.
  customerVehicleBookingId: string | null;
  customerVehicleBookingCustomerVehicleViewInvoiceUIDTO: CustomerVehicleBookingCustomerVehicleViewInvoiceUIDTO;

  constructor(
    // Injeção dos serviços necessários.
    private activatedRoute: ActivatedRoute,
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private messageService: MessageService,
    private momentUtilsService: MomentUtilsService,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private translateService: TranslateService
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerVehicleBookingId = params.get('customerVehicleBookingId');
    });
  }

  // Método que é executado quando o componente é inicializado.
  ngOnInit() {
    // Reseta o formulário e carrega os parâmetros da rota.
    this.resetForm();
  }

  // Método para inicializar e resetar os dados do formulário.
  resetForm() {

    // Cria uma nova instância do DTO para armazenar os dados.
    this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO = new CustomerVehicleBookingCustomerVehicleViewInvoiceUIDTO();

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
      this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      // Segunda operação: busca os dados da reserva de veículo do cliente pelo paymentId.
      if (this.customerVehicleBookingId != null) {

        const resultCustomerVehicleBookingServiceFindById = await firstValueFrom(this.customerVehicleBookingService.findById(this.customerVehicleBookingId).pipe(first()));
        
        if (resultCustomerVehicleBookingServiceFindById.status == 200) {
          if (resultCustomerVehicleBookingServiceFindById.body != null) {
            // Se a reserva for encontrada, armazena os dados no DTO.
            this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking = resultCustomerVehicleBookingServiceFindById.body;

            // Calcula a diferença de dias entre a data de início e fim da reserva.
            this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.days = this.momentUtilsService.diffDays(this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.reservationStartDate, this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.reservationEndDate);

            this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleModel.vehicleCategory.file.dataURI = `data:${this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleModel.vehicleCategory.file.contentType};base64,${this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleModel.vehicleCategory.file.dataAsByteArray}`;
            this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleFuelType.file.dataURI = `data:${this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleFuelType.file.contentType};base64,${this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleFuelType.file.dataAsByteArray}`;
            this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleTransmission.file.dataURI = `data:${this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleTransmission.file.contentType};base64,${this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.vehicleTransmission.file.dataAsByteArray}`;
          }
        }
      }

      // Terceira operação: se houver um ID de veículo do cliente, busca a foto de capa do veículo.
      if (this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.customerVehicleId != null) {

        const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.customerVehicleId).pipe(first()));
        
        if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200) {
          if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
            // Se a foto for encontrada, armazena no DTO e gera o URI de base64 para exibição.
            this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.customerVehicleFilePhoto = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
            this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.dataURI = `data:${this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.customerVehicleFilePhoto.contentType};base64,${this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.customerVehicleBooking.customerVehicle.customerVehicleFilePhoto.dataAsByteArray}`;
          }
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe a mensagem de erro usando o serviço de mensagens.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBookingCustomerVehicleViewInvoiceUIDTO.error_summary_message_service_Generic,
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

  clickNavigateToCustomerVehicleBookingCustomerVehicle() {
    this.router.navigate(['customer-vehicle-booking/customer-vehicle']);
  }
}