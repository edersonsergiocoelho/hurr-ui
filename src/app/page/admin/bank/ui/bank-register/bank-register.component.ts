import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { BankService } from '../../service/bank.service';
import { BankDTO } from '../../dto/bank-dto.dto';
import { NgForm } from '@angular/forms';
import { Bank } from '../../entity/bank.entity';
import { first, firstValueFrom } from 'rxjs';
import { BankRegisterUIDTO } from './dto/bank-register-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { TranslateService } from '@ngx-translate/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-bank-register',
  templateUrl: './bank-register.component.html',
  styleUrls: ['./bank-register.component.css']
})
export class BankRegisterComponent implements OnInit {

  @Output() rowModified = new EventEmitter<void>(); // Emissor para notificar alterações

  bankRegisterUIDTO: BankRegisterUIDTO;
  bankRegisterForm: NgForm;
  labelSize: string = 'text-base';
  inputSize: string = 'p-inputtext-md';
  buttonSize: string = 'p-button-md';

  @ViewChild('fileUpload') fileUpload: FileUpload;

  constructor(
    private messageService: MessageService, // Serviço para exibir mensagens para o usuário
    private ngxSpinnerService: NgxSpinnerService, // Serviço para mostrar e esconder o spinner de carregamento
    private bankService: BankService, // Serviço para realizar operações CRUD de status de pagamento
    private translateService: TranslateService // Serviço para tradução de textos
  ) { }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado.
    this.resetRegisterForm(); // Reseta o formulário e configurações
  }

  resetRegisterForm(): void {
    // Inicializa o UIDTO e o DTO para o status de pagamento.
    this.bankRegisterUIDTO = new BankRegisterUIDTO();
    this.bankRegisterUIDTO.bankDTO = new BankDTO();

    this.bankRegisterUIDTO.uploadedFiles = [];
    this.bankRegisterUIDTO.files = [];

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
      this.bankRegisterUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.bankRegisterUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.bankRegisterUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.bankRegisterUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.bankRegisterUIDTO.save_summary_message_service_Generic = translations['save_summary_message_service_Generic'];
      this.bankRegisterUIDTO.save_success_message_service_BankRegister = translations['save_success_message_service_BankRegister'];
      this.bankRegisterUIDTO.update_summary_message_service_Generic = translations['update_summary_message_service_Generic'];
      this.bankRegisterUIDTO.update_success_message_service_BankRegister = translations['update_success_message_service_BankRegister'];
      this.bankRegisterUIDTO.delete_summary_message_service_Generic = translations['delete_summary_message_service_Generic'];
      this.bankRegisterUIDTO.delete_success_message_service_BankRegister = translations['delete_success_message_service_BankRegister'];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.bankRegisterUIDTO.error_summary_message_service_Generic,
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
      'save_success_message_service_BankRegister',
      'update_success_message_service_BankRegister',
      'update_summary_message_service_Generic',
      'delete_summary_message_service_Generic',
      'delete_success_message_service_BankRegister'
    ];
  }

  onRowSelectEdit(data: any): void {
    // Preenche o DTO com os dados selecionados na interface de busca para edição.

    this.bankRegisterUIDTO.bankDTO = new BankDTO();

    if (data != null) {
      this.bankRegisterUIDTO.bankDTO = Bank.toDTO(data);

      // Converte as datas para objetos Date, se estiverem presentes.
      this.bankRegisterUIDTO.bankDTO.createdDate = new Date(this.bankRegisterUIDTO.bankDTO.createdDate);

      if (this.bankRegisterUIDTO.bankDTO.modifiedDate != null) {
        this.bankRegisterUIDTO.bankDTO.modifiedDate = new Date(this.bankRegisterUIDTO.bankDTO.modifiedDate);
      }

      if (data.file != null) {
        this.bankRegisterUIDTO.bankDTO.dataURI = `data:${data.file.contentType};base64,${data.file.dataAsByteArray}`
      }
    }
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const bank = BankDTO.toEntity(this.bankRegisterUIDTO.bankDTO);

    if (this.bankRegisterUIDTO.files != null && this.bankRegisterUIDTO.files.length > 0) {
      bank.file = this.bankRegisterUIDTO.files[0];
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
      const data = await firstValueFrom(this.bankService.save(bank).pipe(first()));

      if (data.status === 201) {
        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.bankRegisterUIDTO.save_summary_message_service_Generic, 
          detail: this.bankRegisterUIDTO.save_success_message_service_BankRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.bankRegisterUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetRegisterForm();
      this.fileUpload.clear();
      this.ngxSpinnerService.hide();
      this.rowModified.emit();
    }
  }
  
  async update(): Promise<void> {
    // Método chamado para atualizar um status de pagamento existente.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const bank = BankDTO.toEntity(this.bankRegisterUIDTO.bankDTO);

    if (this.bankRegisterUIDTO.files != null && this.bankRegisterUIDTO.files.length > 0) {
      bank.file = this.bankRegisterUIDTO.files[0];
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de atualização.
      const data = await firstValueFrom(this.bankService.update(bank).pipe(first()));
  
      if (data.status === 200) {
        // Exibe mensagem de sucesso se o status da resposta for 200 OK.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.bankRegisterUIDTO.update_summary_message_service_Generic, 
          detail: this.bankRegisterUIDTO.update_success_message_service_BankRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.bankRegisterUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetRegisterForm();
      this.fileUpload.clear();
      this.ngxSpinnerService.hide();
      this.rowModified.emit();
    }
  }
  
  async delete(data: any): Promise<void> {
    // Método chamado para deletar um status de pagamento existente.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    let bank;

    if (data != null) {
      bank = BankDTO.toEntity(data);
    } else {
      bank = BankDTO.toEntity(this.bankRegisterUIDTO.bankDTO);
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de deleção.
      const data = await firstValueFrom(this.bankService.delete(bank.bankId).pipe(first()));
  
      if (data && data.status === 204) {
        // Exibe mensagem de sucesso se o status da resposta for 204 No Content.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.bankRegisterUIDTO.delete_summary_message_service_Generic, 
          detail: this.bankRegisterUIDTO.delete_success_message_service_BankRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.bankRegisterUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.ngxSpinnerService.hide();
      this.resetRegisterForm();
      this.rowModified.emit();
    }
  }

  uploadHandlerFile(event: any): void {

    this.bankRegisterUIDTO.uploadedFiles = [];
    this.bankRegisterUIDTO.files = [];

    for (let file of event.files) {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.bankRegisterUIDTO.uploadedFiles.push(file);

        const base64String = (reader.result as string).split(',')[1];

        const customerVehicleFilePhoto = {
          contentType: file.type,
          originalFileName: file.name,
          dataAsByteArray: base64String,
          dataURI: `data:${file.type};base64,${base64String}`
        };

        this.bankRegisterUIDTO.files.push(customerVehicleFilePhoto);
      };
    }
  }
}