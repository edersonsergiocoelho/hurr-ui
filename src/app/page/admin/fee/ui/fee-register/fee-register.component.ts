import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { FeeService } from '../../service/fee.service';
import { FeeDTO } from '../../dto/fee-dto.dto';
import { NgForm } from '@angular/forms';
import { Fee } from '../../entity/fee.entity';
import { first, firstValueFrom } from 'rxjs';
import { FeeRegisterUIDTO } from './dto/fee-register-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fee-register',
  templateUrl: './fee-register.component.html',
  styleUrls: ['./fee-register.component.css']
})
export class FeeRegisterComponent implements OnInit {

  @Output() rowModified = new EventEmitter<void>(); // Emissor para notificar alterações

  feeRegisterUIDTO: FeeRegisterUIDTO;
  feeRegisterForm: NgForm;
  labelSize: string = 'text-base';
  inputSize: string = 'p-inputtext-md';
  buttonSize: string = 'p-button-md';

  constructor(
    private messageService: MessageService, // Serviço para exibir mensagens para o usuário
    private ngxSpinnerService: NgxSpinnerService, // Serviço para mostrar e esconder o spinner de carregamento
    private feeService: FeeService, // Serviço para realizar operações CRUD de status de pagamento
    private translateService: TranslateService // Serviço para tradução de textos
  ) { }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado.
    this.resetRegisterForm(); // Reseta o formulário e configurações
  }

  resetRegisterForm(): void {
    // Inicializa o UIDTO e o DTO para o status de pagamento.
    this.feeRegisterUIDTO = new FeeRegisterUIDTO();
    this.feeRegisterUIDTO.feeDTO = new FeeDTO();

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
      this.feeRegisterUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.feeRegisterUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.feeRegisterUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.feeRegisterUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.feeRegisterUIDTO.save_summary_message_service_Generic = translations['save_summary_message_service_Generic'];
      this.feeRegisterUIDTO.save_success_message_service_FeeRegister = translations['save_success_message_service_FeeRegister'];
      this.feeRegisterUIDTO.update_summary_message_service_Generic = translations['update_summary_message_service_Generic'];
      this.feeRegisterUIDTO.update_success_message_service_FeeRegister = translations['update_success_message_service_FeeRegister'];
      this.feeRegisterUIDTO.delete_summary_message_service_Generic = translations['delete_summary_message_service_Generic'];
      this.feeRegisterUIDTO.delete_success_message_service_FeeRegister = translations['delete_success_message_service_FeeRegister'];

      this.feeRegisterUIDTO.feeTypes = [
        { name: 'Comissão', code: 'COMISSION' },
        { name: 'Cancelamento', code: 'CANCELLATION' }
      ];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.feeRegisterUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });
    } finally {
      // Esconde o spinner após a conclusão da carga dos dados.
      this.ngxSpinnerService.hide();
    }
  }

  private loadKeys(): string[] {
    // Define as chaves para tradução que serão carregadas.
    return [
      'warn_summary_message_service_Generic',
      'error_summary_message_service_Generic',
      'info_summary_message_service_Generic',
      'success_summary_message_service_Generic',
      'save_summary_message_service_Generic',
      'save_success_message_service_FeeRegister',
      'update_success_message_service_FeeRegister',
      'update_summary_message_service_Generic',
      'delete_summary_message_service_Generic',
      'delete_success_message_service_FeeRegister'
    ];
  }

  onRowSelectEdit(data: any): void {
    // Preenche o DTO com os dados selecionados na interface de busca para edição.

    this.feeRegisterUIDTO.feeDTO = new FeeDTO();

    if (data != null) {
      this.feeRegisterUIDTO.feeDTO = Fee.toDTO(data);

      // Converte as datas para objetos Date, se estiverem presentes.
      this.feeRegisterUIDTO.feeDTO.startDate = new Date(this.feeRegisterUIDTO.feeDTO.startDate);
      this.feeRegisterUIDTO.feeDTO.endDate = new Date(this.feeRegisterUIDTO.feeDTO.endDate);
      this.feeRegisterUIDTO.feeDTO.createdDate = new Date(this.feeRegisterUIDTO.feeDTO.createdDate);

      if (this.feeRegisterUIDTO.feeDTO.modifiedDate != null) {
        this.feeRegisterUIDTO.feeDTO.modifiedDate = new Date(this.feeRegisterUIDTO.feeDTO.modifiedDate);
      }

      const currentFeeType = this.feeRegisterUIDTO.feeDTO.feeType;
      const selectedFeeType = this.feeRegisterUIDTO.feeTypes.find(language => language.code === currentFeeType);
      
      if (selectedFeeType) {
        this.feeRegisterUIDTO.selectedFeeType = selectedFeeType;
      }
    }
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const fee = FeeDTO.toEntity(this.feeRegisterUIDTO.feeDTO);

    fee.feeType = this.feeRegisterUIDTO.selectedFeeType.code;

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
      const data = await firstValueFrom(this.feeService.save(fee).pipe(first()));

      if (data.status === 201) {
        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.feeRegisterUIDTO.save_summary_message_service_Generic, 
          detail: this.feeRegisterUIDTO.save_success_message_service_FeeRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.feeRegisterUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetRegisterForm();
      this.ngxSpinnerService.hide();
      this.rowModified.emit();
    }
  }
  
  async update(): Promise<void> {
    // Método chamado para atualizar um status de pagamento existente.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const fee = FeeDTO.toEntity(this.feeRegisterUIDTO.feeDTO);

    fee.feeType = this.feeRegisterUIDTO.selectedFeeType.code;

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de atualização.
      const data = await firstValueFrom(this.feeService.update(fee).pipe(first()));
  
      if (data.status === 200) {
        // Exibe mensagem de sucesso se o status da resposta for 200 OK.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.feeRegisterUIDTO.update_summary_message_service_Generic, 
          detail: this.feeRegisterUIDTO.update_success_message_service_FeeRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.feeRegisterUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetRegisterForm();
      this.ngxSpinnerService.hide();
      this.rowModified.emit();
    }
  }
  
  async delete(data: any): Promise<void> {
    // Método chamado para deletar um status de pagamento existente.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    let fee;

    if (data != null) {
      fee = FeeDTO.toEntity(data);
    } else {
      fee = FeeDTO.toEntity(this.feeRegisterUIDTO.feeDTO);
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de deleção.
      const data = await firstValueFrom(this.feeService.delete(fee.feeId).pipe(first()));
  
      if (data && data.status === 204) {
        // Exibe mensagem de sucesso se o status da resposta for 204 No Content.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.feeRegisterUIDTO.delete_summary_message_service_Generic, 
          detail: this.feeRegisterUIDTO.delete_success_message_service_FeeRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.feeRegisterUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.ngxSpinnerService.hide();
      this.resetRegisterForm();
      this.rowModified.emit();
    }
  }
}