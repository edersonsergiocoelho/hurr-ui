import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { VehicleBrandDTO } from '../../dto/vehicle-brand-dto.dto';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { VehicleBrand } from '../../entity/vehicle-brand.entity';
import { VehicleBrandRegisterUIDTO } from './dto/vehicle-brand-register-ui-dto.dto';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleBrandService } from '../../service/vehicle-brand.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageHandlerService } from 'src/app/core/message-handler/service/message-handler.service';

@Component({
  selector: 'app-vehicle-brand-register',
  templateUrl: './vehicle-brand-register.component.html',
  styleUrls: ['./vehicle-brand-register.component.css']
})
export class VehicleBrandRegisterComponent {

  @Output() rowModified = new EventEmitter<void>(); // Emissor para notificar alterações

  vehicleBrandRegisterUIDTO: VehicleBrandRegisterUIDTO;
  vehicleBrandRegisterForm: NgForm;
  labelSize: string = 'text-base';
  inputSize: string = 'p-inputtext-md';
  buttonSize: string = 'p-button-md';

  @ViewChild('fileUpload') fileUpload: FileUpload;

  constructor(
    private messageService: MessageService, // Serviço para exibir mensagens para o usuário
    private messageHandlerService: MessageHandlerService,
    private ngxSpinnerService: NgxSpinnerService, // Serviço para mostrar e esconder o spinner de carregamento
    private vehicleBrandService: VehicleBrandService, // Serviço para realizar operações CRUD de status de pagamento
    private translateService: TranslateService // Serviço para tradução de textos
  ) { }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado.
    this.resetRegisterForm(); // Reseta o formulário e configurações
  }

  resetRegisterForm(): void {
    // Inicializa o UIDTO e o DTO para o status de pagamento.
    this.vehicleBrandRegisterUIDTO = new VehicleBrandRegisterUIDTO();
    this.vehicleBrandRegisterUIDTO.vehicleBrandDTO = new VehicleBrandDTO();

    this.vehicleBrandRegisterUIDTO.uploadedFiles = [];
    this.vehicleBrandRegisterUIDTO.files = [];

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
      this.vehicleBrandRegisterUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.vehicleBrandRegisterUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.vehicleBrandRegisterUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.vehicleBrandRegisterUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.vehicleBrandRegisterUIDTO.save_summary_message_service_Generic = translations['save_summary_message_service_Generic'];
      this.vehicleBrandRegisterUIDTO.save_success_detail_message_service_VehicleBrandRegister = translations['save_success_detail_message_service_VehicleBrandRegister'];
      this.vehicleBrandRegisterUIDTO.update_summary_message_service_Generic = translations['update_summary_message_service_Generic'];
      this.vehicleBrandRegisterUIDTO.update_success_detail_message_service_VehicleBrandRegister = translations['update_success_detail_message_service_VehicleBrandRegister'];
      this.vehicleBrandRegisterUIDTO.delete_summary_message_service_Generic = translations['delete_summary_message_service_Generic'];
      this.vehicleBrandRegisterUIDTO.delete_success_detail_message_service_VehicleBrandRegister = translations['delete_success_detail_message_service_VehicleBrandRegister'];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.vehicleBrandRegisterUIDTO.error_summary_message_service_Generic,
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
      'save_success_detail_message_service_VehicleBrandRegister',
      'update_success_detail_message_service_VehicleBrandRegister',
      'update_summary_message_service_Generic',
      'delete_summary_message_service_Generic',
      'delete_success_detail_message_service_VehicleBrandRegister'
    ];
  }

  onRowSelectEdit(data: any): void {
    // Preenche o DTO com os dados selecionados na interface de busca para edição.

    this.vehicleBrandRegisterUIDTO.vehicleBrandDTO = new VehicleBrandDTO();

    if (data != null) {
      this.vehicleBrandRegisterUIDTO.vehicleBrandDTO = VehicleBrand.toDTO(data);

      // Converte as datas para objetos Date, se estiverem presentes.
      this.vehicleBrandRegisterUIDTO.vehicleBrandDTO.createdDate = new Date(this.vehicleBrandRegisterUIDTO.vehicleBrandDTO.createdDate);

      if (this.vehicleBrandRegisterUIDTO.vehicleBrandDTO.modifiedDate != null) {
        this.vehicleBrandRegisterUIDTO.vehicleBrandDTO.modifiedDate = new Date(this.vehicleBrandRegisterUIDTO.vehicleBrandDTO.modifiedDate);
      }

      if (data.file != null) {
        this.vehicleBrandRegisterUIDTO.vehicleBrandDTO.file.dataURI = `data:${data.file.contentType};base64,${data.file.dataAsByteArray}`
      }
    }
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const vehicleBrand = VehicleBrandDTO.toEntity(this.vehicleBrandRegisterUIDTO.vehicleBrandDTO);

    if (this.vehicleBrandRegisterUIDTO.files != null && this.vehicleBrandRegisterUIDTO.files.length > 0) {
      vehicleBrand.file = this.vehicleBrandRegisterUIDTO.files[0];
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
      const data = await firstValueFrom(this.vehicleBrandService.save(vehicleBrand).pipe(first()));

      if (data.status === 201) {
        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.vehicleBrandRegisterUIDTO.save_summary_message_service_Generic, 
          detail: this.vehicleBrandRegisterUIDTO.save_success_detail_message_service_VehicleBrandRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.vehicleBrandRegisterUIDTO.error_summary_message_service_Generic,
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

    const vehicleBrand = VehicleBrandDTO.toEntity(this.vehicleBrandRegisterUIDTO.vehicleBrandDTO);

    if (this.vehicleBrandRegisterUIDTO.files != null && this.vehicleBrandRegisterUIDTO.files.length > 0) {
      vehicleBrand.file = this.vehicleBrandRegisterUIDTO.files[0];
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de atualização.
      const data = await firstValueFrom(this.vehicleBrandService.update(vehicleBrand).pipe(first()));
  
      if (data.status === 200) {
        // Exibe mensagem de sucesso se o status da resposta for 200 OK.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.vehicleBrandRegisterUIDTO.update_summary_message_service_Generic, 
          detail: this.vehicleBrandRegisterUIDTO.update_success_detail_message_service_VehicleBrandRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.vehicleBrandRegisterUIDTO.error_summary_message_service_Generic,
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

    let vehicleBrand;

    if (data != null) {
      vehicleBrand = VehicleBrandDTO.toEntity(data);
    } else {
      vehicleBrand = VehicleBrandDTO.toEntity(this.vehicleBrandRegisterUIDTO.vehicleBrandDTO);
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de deleção.
      const data = await firstValueFrom(this.vehicleBrandService.delete(vehicleBrand.vehicleBrandId).pipe(first()));
  
      if (data && data.status === 204) {
        // Exibe mensagem de sucesso se o status da resposta for 204 No Content.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.vehicleBrandRegisterUIDTO.delete_summary_message_service_Generic, 
          detail: this.vehicleBrandRegisterUIDTO.delete_success_detail_message_service_VehicleBrandRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.vehicleBrandRegisterUIDTO.error_summary_message_service_Generic,
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

    this.vehicleBrandRegisterUIDTO.uploadedFiles = [];
    this.vehicleBrandRegisterUIDTO.files = [];

    for (let file of event.files) {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.vehicleBrandRegisterUIDTO.uploadedFiles.push(file);

        const base64String = (reader.result as string).split(',')[1];

        const customerVehicleFilePhoto = {
          contentType: file.type,
          originalFileName: file.name,
          dataAsByteArray: base64String,
          dataURI: `data:${file.type};base64,${base64String}`
        };

        this.vehicleBrandRegisterUIDTO.files.push(customerVehicleFilePhoto);
      };
    }
  }
}