import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { PaymentMethodService } from '../../service/payment-method.service';
import { PaymentMethodDTO } from '../../dto/payment-method-dto.dto';
import { NgForm } from '@angular/forms';
import { PaymentMethod } from '../../entity/payment-method.entity';
import { first, firstValueFrom } from 'rxjs';
import { PaymentMethodRegisterUIDTO } from './dto/payment-method-register-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { TranslateService } from '@ngx-translate/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-payment-method-register',
  templateUrl: './payment-method-register.component.html',
  styleUrls: ['./payment-method-register.component.css']
})
export class PaymentMethodRegisterComponent implements OnInit {

  @Output() rowModified = new EventEmitter<void>(); // Emissor para notificar alterações

  paymentMethodRegisterUIDTO: PaymentMethodRegisterUIDTO;
  paymentMethodRegisterForm: NgForm;
  labelSize: string = 'text-base';
  inputSize: string = 'p-inputtext-md';
  buttonSize: string = 'p-button-md';

  @ViewChild('fileUpload') fileUpload: FileUpload;

  constructor(
    private messageService: MessageService, // Serviço para exibir mensagens para o usuário
    private ngxSpinnerService: NgxSpinnerService, // Serviço para mostrar e esconder o spinner de carregamento
    private paymentMethodService: PaymentMethodService, // Serviço para realizar operações CRUD de status de pagamento
    private translateService: TranslateService // Serviço para tradução de textos
  ) { }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado.
    this.resetRegisterForm(); // Reseta o formulário e configurações
  }

  resetRegisterForm(): void {
    // Inicializa o UIDTO e o DTO para o status de pagamento.
    this.paymentMethodRegisterUIDTO = new PaymentMethodRegisterUIDTO();
    this.paymentMethodRegisterUIDTO.paymentMethodDTO = new PaymentMethodDTO();

    this.paymentMethodRegisterUIDTO.uploadedFiles = [];
    this.paymentMethodRegisterUIDTO.files = [];

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
      this.paymentMethodRegisterUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.paymentMethodRegisterUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.paymentMethodRegisterUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.paymentMethodRegisterUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];

      this.paymentMethodRegisterUIDTO.save_message_service_Generic = translations['save_message_service_Generic'];
      this.paymentMethodRegisterUIDTO.save_success_message_service_PaymentMethodRegister = translations['save_success_message_service_PaymentMethodRegister'];
      this.paymentMethodRegisterUIDTO.update_message_service_Generic = translations['update_message_service_Generic'];
      this.paymentMethodRegisterUIDTO.update_success_message_service_PaymentMethodRegister = translations['update_success_message_service_PaymentMethodRegister'];
      this.paymentMethodRegisterUIDTO.delete_message_service_Generic = translations['delete_message_service_Generic'];
      this.paymentMethodRegisterUIDTO.delete_success_message_service_PaymentMethodRegister = translations['delete_success_message_service_PaymentMethodRegister'];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentMethodRegisterUIDTO.error_message_service_Generic,
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
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic',
      'save_message_service_Generic',
      'save_success_message_service_PaymentMethodRegister',
      'update_success_message_service_PaymentMethodRegister',
      'update_message_service_Generic',
      'delete_message_service_Generic',
      'delete_success_message_service_PaymentMethodRegister'
    ];
  }

  onRowSelectEdit(data: any): void {
    // Preenche o DTO com os dados selecionados na interface de busca para edição.

    this.paymentMethodRegisterUIDTO.paymentMethodDTO = new PaymentMethodDTO();

    if (data != null) {
      this.paymentMethodRegisterUIDTO.paymentMethodDTO = PaymentMethod.toDTO(data);

      // Converte as datas para objetos Date, se estiverem presentes.
      this.paymentMethodRegisterUIDTO.paymentMethodDTO.createdDate = new Date(this.paymentMethodRegisterUIDTO.paymentMethodDTO.createdDate);

      if (this.paymentMethodRegisterUIDTO.paymentMethodDTO.modifiedDate != null) {
        this.paymentMethodRegisterUIDTO.paymentMethodDTO.modifiedDate = new Date(this.paymentMethodRegisterUIDTO.paymentMethodDTO.modifiedDate);
      }

      if (data.file != null) {
        this.paymentMethodRegisterUIDTO.paymentMethodDTO.dataURI = `data:${data.file.contentType};base64,${data.file.dataAsByteArray}`
      }
    }
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const paymentMethod = PaymentMethodDTO.toEntity(this.paymentMethodRegisterUIDTO.paymentMethodDTO);

    if (this.paymentMethodRegisterUIDTO.files != null && this.paymentMethodRegisterUIDTO.files.length > 0) {
      paymentMethod.file = this.paymentMethodRegisterUIDTO.files[0];
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
      const data = await firstValueFrom(this.paymentMethodService.save(paymentMethod).pipe(first()));

      if (data.status === 201) {
        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.paymentMethodRegisterUIDTO.save_message_service_Generic, 
          detail: this.paymentMethodRegisterUIDTO.save_success_message_service_PaymentMethodRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentMethodRegisterUIDTO.error_message_service_Generic,
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

    const paymentMethod = PaymentMethodDTO.toEntity(this.paymentMethodRegisterUIDTO.paymentMethodDTO);

    if (this.paymentMethodRegisterUIDTO.files != null && this.paymentMethodRegisterUIDTO.files.length > 0) {
      paymentMethod.file = this.paymentMethodRegisterUIDTO.files[0];
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de atualização.
      const data = await firstValueFrom(this.paymentMethodService.update(paymentMethod).pipe(first()));
  
      if (data.status === 200) {
        // Exibe mensagem de sucesso se o status da resposta for 200 OK.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.paymentMethodRegisterUIDTO.update_message_service_Generic, 
          detail: this.paymentMethodRegisterUIDTO.update_success_message_service_PaymentMethodRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentMethodRegisterUIDTO.error_message_service_Generic,
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

    let paymentMethod;

    if (data != null) {
      paymentMethod = PaymentMethodDTO.toEntity(data);
    } else {
      paymentMethod = PaymentMethodDTO.toEntity(this.paymentMethodRegisterUIDTO.paymentMethodDTO);
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de deleção.
      const data = await firstValueFrom(this.paymentMethodService.delete(paymentMethod.paymentMethodId).pipe(first()));
  
      if (data && data.status === 204) {
        // Exibe mensagem de sucesso se o status da resposta for 204 No Content.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.paymentMethodRegisterUIDTO.delete_message_service_Generic, 
          detail: this.paymentMethodRegisterUIDTO.delete_success_message_service_PaymentMethodRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentMethodRegisterUIDTO.error_message_service_Generic,
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

    this.paymentMethodRegisterUIDTO.uploadedFiles = [];
    this.paymentMethodRegisterUIDTO.files = [];

    for (let file of event.files) {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.paymentMethodRegisterUIDTO.uploadedFiles.push(file);

        const base64String = (reader.result as string).split(',')[1];

        const customerVehicleFilePhoto = {
          contentType: file.type,
          originalFileName: file.name,
          dataAsByteArray: base64String,
          dataURI: `data:${file.type};base64,${base64String}`
        };

        this.paymentMethodRegisterUIDTO.files.push(customerVehicleFilePhoto);
      };
    }
  }
}