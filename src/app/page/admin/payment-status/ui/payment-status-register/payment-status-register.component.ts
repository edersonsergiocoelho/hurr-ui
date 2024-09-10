import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentStatusService } from '../../service/payment-status.service';
import { PaymentStatusDTO } from '../../dto/payment-status-dto.dto';
import { NgForm } from '@angular/forms';
import { PaymentStatus } from '../../entity/payment-status.entity';
import { first, firstValueFrom } from 'rxjs';
import { PaymentStatusRegisterUIDTO } from './dto/payment-status-register-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-status-register',
  templateUrl: './payment-status-register.component.html',
  styleUrls: ['./payment-status-register.component.css']
})
export class PaymentStatusRegisterComponent implements OnInit {

  paymentStatusRegisterUIDTO: PaymentStatusRegisterUIDTO;
  paymentStatusRegisterForm: NgForm;
  labelSize: string = 'text-base';
  inputSize: string = 'p-inputtext-md';
  buttonSize: string = 'p-button-md';

  constructor(
    private messageService: MessageService, // Serviço para exibir mensagens para o usuário
    private ngxSpinnerService: NgxSpinnerService, // Serviço para mostrar e esconder o spinner de carregamento
    private paymentStatusService: PaymentStatusService, // Serviço para realizar operações CRUD de status de pagamento
    private translateService: TranslateService // Serviço para tradução de textos
  ) { }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado.
    this.resetRegisterForm(); // Reseta o formulário e configurações
  }

  resetRegisterForm(): void {
    // Inicializa o UIDTO e o DTO para o status de pagamento.
    this.paymentStatusRegisterUIDTO = new PaymentStatusRegisterUIDTO();
    this.paymentStatusRegisterUIDTO.paymentStatusDTO = new PaymentStatusDTO();

    // Chama funções assíncronas para carregar dados necessários.
    this.asyncCallFunctions();
  }

  async asyncCallFunctions(): Promise<void> {
    // Método para carregar as traduções e outras configurações assíncronas.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
      // Carrega as traduções necessárias para os textos da interface.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções obtidas aos campos do UIDTO.
      this.paymentStatusRegisterUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.paymentStatusRegisterUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.paymentStatusRegisterUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.paymentStatusRegisterUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];

      this.paymentStatusRegisterUIDTO.save_message_service_Generic = translations['save_message_service_Generic'];
      this.paymentStatusRegisterUIDTO.save_success_message_service_PaymentStatusRegister = translations['save_success_message_service_PaymentStatusRegister'];
      this.paymentStatusRegisterUIDTO.update_message_service_Generic = translations['update_message_service_Generic'];
      this.paymentStatusRegisterUIDTO.update_success_message_service_PaymentStatusRegister = translations['update_success_message_service_PaymentStatusRegister'];
      this.paymentStatusRegisterUIDTO.delete_message_service_Generic = translations['delete_message_service_Generic'];
      this.paymentStatusRegisterUIDTO.delete_success_message_service_PaymentStatusRegister = translations['delete_success_message_service_PaymentStatusRegister'];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: 'error',
        summary: '' + this.paymentStatusRegisterUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    } finally {
      // Esconde o spinner após a conclusão da carga dos dados.
      this.ngxSpinnerService.hide();
    }
  }

  private loadKeys(): string[] {
    // Define as chaves para tradução que serão carregadas.
    return [
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic',
      'save_message_service_Generic',
      'save_success_message_service_PaymentStatusRegister',
      'update_success_message_service_PaymentStatusRegister',
      'update_message_service_Generic',
      'delete_message_service_Generic',
      'delete_success_message_service_PaymentStatusRegister'
    ];
  }

  onRowSelectEdit(data: any): void {
    // Preenche o DTO com os dados selecionados na interface de busca para edição.

    this.paymentStatusRegisterUIDTO.paymentStatusDTO = new PaymentStatusDTO();

    if (data != null) {
      this.paymentStatusRegisterUIDTO.paymentStatusDTO = PaymentStatus.toDTO(data);

      // Converte as datas para objetos Date, se estiverem presentes.
      this.paymentStatusRegisterUIDTO.paymentStatusDTO.createdDate = new Date(this.paymentStatusRegisterUIDTO.paymentStatusDTO.createdDate);

      if (this.paymentStatusRegisterUIDTO.paymentStatusDTO.modifiedDate != null) {
        this.paymentStatusRegisterUIDTO.paymentStatusDTO.modifiedDate = new Date(this.paymentStatusRegisterUIDTO.paymentStatusDTO.modifiedDate);
      }
    }
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const paymentStatus = PaymentStatusDTO.toEntity(this.paymentStatusRegisterUIDTO.paymentStatusDTO);

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
      const data = await firstValueFrom(this.paymentStatusService.save(paymentStatus).pipe(first()));

      if (data.status === 201) {
        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.paymentStatusRegisterUIDTO.save_message_service_Generic, 
          detail: this.paymentStatusRegisterUIDTO.save_success_message_service_PaymentStatusRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentStatusRegisterUIDTO.error_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetRegisterForm();
      this.ngxSpinnerService.hide();
    }
  }
  
  async update(): Promise<void> {
    // Método chamado para atualizar um status de pagamento existente.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const paymentStatus = PaymentStatusDTO.toEntity(this.paymentStatusRegisterUIDTO.paymentStatusDTO);

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de atualização.
      const data = await firstValueFrom(this.paymentStatusService.update(paymentStatus).pipe(first()));
  
      if (data.status === 200) {
        // Exibe mensagem de sucesso se o status da resposta for 200 OK.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.paymentStatusRegisterUIDTO.update_message_service_Generic, 
          detail: this.paymentStatusRegisterUIDTO.update_success_message_service_PaymentStatusRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentStatusRegisterUIDTO.error_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetRegisterForm();
      this.ngxSpinnerService.hide();
    }
  }
  
  async delete(data: any): Promise<void> {
    // Método chamado para deletar um status de pagamento existente.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    let paymentStatus;

    if (data != null) {
      paymentStatus = PaymentStatusDTO.toEntity(data);
    } else {
      paymentStatus = PaymentStatusDTO.toEntity(this.paymentStatusRegisterUIDTO.paymentStatusDTO);
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de deleção.
      const data = await firstValueFrom(this.paymentStatusService.delete(paymentStatus.paymentStatusId).pipe(first()));
  
      if (data && data.status === 204) {
        // Exibe mensagem de sucesso se o status da resposta for 204 No Content.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.paymentStatusRegisterUIDTO.delete_message_service_Generic, 
          detail: this.paymentStatusRegisterUIDTO.delete_success_message_service_PaymentStatusRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentStatusRegisterUIDTO.error_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.ngxSpinnerService.hide();
      this.resetRegisterForm();
    }
  }
}