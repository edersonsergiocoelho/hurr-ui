import { Component, OnInit } from '@angular/core'; // Importa o decorador para definir um componente Angular
import { first, firstValueFrom } from 'rxjs'; // Importa operadores do RxJS para trabalhar com Observables
import { TranslateService } from '@ngx-translate/core'; // Serviço para suporte de traduções
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'; // Importa configuração de diálogo dinâmico do PrimeNG
import { MessageService } from 'primeng/api'; // Serviço para exibir mensagens (notificações) do PrimeNG
import { NgxSpinnerService } from 'ngx-spinner'; // Serviço para exibir um spinner de carregamento
import { SeverityConstants } from 'src/app/commom/severity.constants'; // Importa constantes de severidade para mensagens de erro e sucesso

// Importa DTOs e entidades do projeto
import { CustomerVehicleBooking } from '../../entity/customer-vehicle-booking.entity'; 
import { CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO } from './dto/customer-vehicle-booking-customer-vehicle-check-in-dynamic-dialog-ui-dto.dto'; 
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service'; // Importa o serviço para manipular bookings de veículos

@Component({
  selector: 'app-customer-vehicle-booking-customer-vehicle-check-in-dynamic-dialog',
  templateUrl: './customer-vehicle-booking-customer-vehicle-check-in-dynamic-dialog.component.html',
  styleUrls: ['./customer-vehicle-booking-customer-vehicle-check-in-dynamic-dialog.component.css']
})
export class CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent implements OnInit {

  // DTO que armazena informações relacionadas ao diálogo dinâmico de check-in de veículo do cliente
  customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO: CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO;

  constructor(
    private customerVehicleBookingService: CustomerVehicleBookingService, // Serviço que lida com bookings de veículos
    private dynamicDialogConfig: DynamicDialogConfig, // Configuração de diálogo dinâmico que injeta dados no componente
    private dynamicDialogRef: DynamicDialogRef, // Referência ao diálogo dinâmico para controlar seu fechamento
    private messageService: MessageService, // Serviço que exibe notificações de sucesso e erro
    private ngxSpinnerService: NgxSpinnerService, // Serviço para exibir e ocultar o spinner de carregamento
    private translateService: TranslateService // Serviço de tradução para suportar internacionalização
  ) { }

  ngOnInit() {
    // Reseta o formulário inicializando os dados
    this.resetForm();
  }

  // Método para resetar o formulário e carregar dados do booking e traduções
  resetForm() {
    this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO = new CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO();
    this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.customerVehicleBooking = new CustomerVehicleBooking();

    // Carrega os dados de booking recebidos no diálogo dinâmico
    this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.customerVehicleBooking = this.dynamicDialogConfig.data.customerVehicleBooking;

    // Chama funções assíncronas, como carregar as traduções
    this.asyncCallFunctions();
  }

  // Função assíncrona que faz a chamada ao serviço de tradução e exibe o spinner enquanto as funções são executadas
  async asyncCallFunctions() {
    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento

    try {
      // Carrega as traduções para as chaves necessárias
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções obtidas aos campos do UIDTO
      this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.check_in_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog = translations['check_in_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog'];
      this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.check_in_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog = translations['check_in_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog'];

    } catch (error: any) {
      // Exibe uma mensagem de erro, caso a chamada falhe
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });
    } finally {
      this.ngxSpinnerService.hide(); // Esconde o spinner de carregamento
    }
  }

  // Método para carregar as chaves de tradução que serão utilizadas
  private loadKeys(): string[] {
    return [
      'warn_summary_message_service_Generic',
      'error_summary_message_service_Generic',
      'info_summary_message_service_Generic',
      'success_summary_message_service_Generic',
      'check_in_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog',
      'check_in_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog'
    ];
  }

  // Método assíncrono que realiza o check-in do booking de veículo
  async checkIn() {
    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento
  
    try {

      // Faz a chamada ao serviço para atualizar o booking do veículo
      const data = await firstValueFrom(
        this.customerVehicleBookingService.checkIn(this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.customerVehicleBooking).pipe(first())
      );
  
      // Verifica se a resposta foi bem-sucedida (status 200)
      if (data && data.status === 200) {
        // Exibe uma mensagem de sucesso
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.check_in_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog, // Mensagem de sucesso
          detail: this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.check_in_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog // Detalhes da mensagem
        });

        // Fechar o diálogo após o sucesso
        this.dynamicDialogRef.close(); // Fecha o diálogo
      }
  
    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra um problema na atualização
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO.error_summary_message_service_Generic, // Mensagem de erro
        detail: error.error?.message || error.toString() // Detalhes do erro
      });
  
    } finally {
      // Garante que o spinner seja escondido após a conclusão do processo
      this.ngxSpinnerService.hide();
    }
  }
}