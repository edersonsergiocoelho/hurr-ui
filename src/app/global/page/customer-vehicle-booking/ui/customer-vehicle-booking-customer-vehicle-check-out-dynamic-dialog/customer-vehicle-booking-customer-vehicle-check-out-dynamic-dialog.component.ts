import { Component, OnInit } from '@angular/core'; // Importa o decorador para definir um componente Angular
import { first, firstValueFrom } from 'rxjs'; // Importa operadores do RxJS para trabalhar com Observables
import { TranslateService } from '@ngx-translate/core'; // Serviço para suporte de traduções
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'; // Importa configuração de diálogo dinâmico do PrimeNG
import { MessageService } from 'primeng/api'; // Serviço para exibir mensagens (notificações) do PrimeNG
import { NgxSpinnerService } from 'ngx-spinner'; // Serviço para exibir um spinner de carregamento
import { SeverityConstants } from 'src/app/commom/severity.constants'; // Importa constantes de severidade para mensagens de erro e sucesso

// Importa DTOs e entidades do projeto
import { CustomerVehicleBooking } from '../../entity/customer-vehicle-booking.entity'; 
import { CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO } from './dto/customer-vehicle-booking-customer-vehicle-check-out-dynamic-dialog-ui-dto.dto'; 
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service'; // Importa o serviço para manipular bookings de veículos

@Component({
  selector: 'app-customer-vehicle-booking-customer-vehicle-check-out-dynamic-dialog',
  templateUrl: './customer-vehicle-booking-customer-vehicle-check-out-dynamic-dialog.component.html',
  styleUrls: ['./customer-vehicle-booking-customer-vehicle-check-out-dynamic-dialog.component.css']
})
export class CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent implements OnInit {

  // DTO que armazena informações relacionadas ao diálogo dinâmico de check-out de veículo do cliente
  customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO: CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO;

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
    this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO = new CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO();
    this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking = new CustomerVehicleBooking();

    // Carrega os dados de booking recebidos no diálogo dinâmico
    this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking = this.dynamicDialogConfig.data.customerVehicleBooking;

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
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.check_out_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog = translations['check_out_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog'];
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.check_out_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog = translations['check_out_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog'];

    } catch (error: any) {
      // Exibe uma mensagem de erro, caso a chamada falhe
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.error_summary_message_service_Generic,
        detail: error.toString()
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
      'check_out_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog',
      'check_out_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog'
    ];
  }

  // Método para alterar a taxa de limpeza e recalcular o valor final
  onChangeCleaningFee(event: any) {
    this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.cleaningFeeValue = event.value;
    this.calculateTotalFinalBookingValue(); // Recalcula o valor final
  }

  // Método que ajusta os valores de KM ao final do booking
  changeBookingEndKM() {
    let subtractBookingKM = this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.bookingEndKM - this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.bookingStartKM;

    if (subtractBookingKM > this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.customerVehicle.limitedMileageIncluded) {
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.limitedMileageTotalKM = subtractBookingKM - this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.customerVehicle.limitedMileageIncluded;
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.limitedMileageTotalValue = this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.limitedMileageTotalKM * this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.customerVehicle.limitedMileageValue;
    } else {
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.limitedMileageTotalKM = 0;
      this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.limitedMileageTotalValue = 0;
    }

    this.calculateTotalFinalBookingValue(); // Recalcula o valor final
  }

  // Método para calcular o valor final do booking
  calculateTotalFinalBookingValue() {
    const baseValue = this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.totalBookingValue || 0;
    const kmExtraValue = this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.limitedMileageTotalValue || 0;
    let cleaningFee = 0;

    if (this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.cleaningFeeValue === 'YES') {
      cleaningFee = this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.customerVehicle.cleaningFee || 0;
    }

    // Calcula o valor adicional (km adicional + taxa de limpeza)
    this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.totalAdditionalValue = kmExtraValue + cleaningFee;

    // Calcula o valor final da reserva (valor total da reserva + valor adicional)
    this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.totalFinalBookingValue = baseValue + this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.totalAdditionalValue;
  
    this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.withdrawableBookingValue = this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking.totalFinalBookingValue - 15;
  }

  // Método para finalizar o booking
  async checkOut() {
    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento

    try {

      // Chama o serviço para finalizar o booking
      const data = await firstValueFrom(this.customerVehicleBookingService.checkOut(this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.customerVehicleBooking).pipe(first()));

      // Verifica se a resposta foi bem-sucedida (status 200)
      if (data.status === 200) {
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.check_out_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog, 
          detail: this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.check_out_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog, 
        });

        // Fechar o diálogo após o sucesso
        this.dynamicDialogRef.close(); // Fecha o diálogo
      }
    } catch (error: any) {
      // Exibe uma mensagem de erro, caso a chamada falhe
      this.messageService.add({ 
        severity: SeverityConstants.ERROR, 
        summary: this.customerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO.error_summary_message_service_Generic, 
        detail: error.toString() 
      });
    } finally {
      this.ngxSpinnerService.hide(); // Esconde o spinner de carregamento
    }
  }
}