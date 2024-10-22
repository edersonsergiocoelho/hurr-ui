import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerVehicleBankAccountService } from '../../service/customer-vehicle-bank-account.service';
import { NgForm } from '@angular/forms';
import { CustomerVehicleBankAccount } from '../../entity/customer-vehicle-bank-account.entity';
import { first, firstValueFrom } from 'rxjs';
import { CustomerVehicleBankAccountRegisterUIDTO } from './dto/customer-vehicle-bank-account-register-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { TranslateService } from '@ngx-translate/core';
import { CustomerVehicleBankAccountDTO } from '../../dto/customer-vehicle-bank-account-dto.dto';
import { BankService } from 'src/app/page/admin/bank/service/bank.service';

@Component({
  selector: 'app-customer-vehicle-bank-account-register',
  templateUrl: './customer-vehicle-bank-account-register.component.html',
  styleUrls: ['./customer-vehicle-bank-account-register.component.css']
})
export class CustomerVehicleBankAccountRegisterComponent implements OnInit {

  @Output() rowModified = new EventEmitter<void>(); // Emissor para notificar alterações

  customerVehicleBankAccountRegisterUIDTO: CustomerVehicleBankAccountRegisterUIDTO;
  customerVehicleBankAccountRegisterForm: NgForm;
  labelSize: string = 'text-base';
  inputSize: string = 'p-inputtext-md';
  buttonSize: string = 'p-button-md';

  constructor(
    private bankService: BankService,
    private messageService: MessageService, // Serviço para exibir mensagens para o usuário
    private ngxSpinnerService: NgxSpinnerService, // Serviço para mostrar e esconder o spinner de carregamento
    private customerVehicleBankAccountService: CustomerVehicleBankAccountService, // Serviço para realizar operações CRUD de status de pagamento
    private translateService: TranslateService // Serviço para tradução de textos
  ) { }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado.
    this.resetRegisterForm(); // Reseta o formulário e configurações
  }

  resetRegisterForm(): void {
    // Inicializa o UIDTO e o DTO para o status de pagamento.
    this.customerVehicleBankAccountRegisterUIDTO = new CustomerVehicleBankAccountRegisterUIDTO();
    this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO = new CustomerVehicleBankAccountDTO();

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
      this.customerVehicleBankAccountRegisterUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.customerVehicleBankAccountRegisterUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.customerVehicleBankAccountRegisterUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.customerVehicleBankAccountRegisterUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.customerVehicleBankAccountRegisterUIDTO.save_summary_message_service_Generic = translations['save_summary_message_service_Generic'];
      this.customerVehicleBankAccountRegisterUIDTO.save_success_message_service_CustomerVehicleBankAccountRegister = translations['save_success_message_service_CustomerVehicleBankAccountRegister'];
      this.customerVehicleBankAccountRegisterUIDTO.update_summary_message_service_Generic = translations['update_summary_message_service_Generic'];
      this.customerVehicleBankAccountRegisterUIDTO.update_success_message_service_CustomerVehicleBankAccountRegister = translations['update_success_message_service_CustomerVehicleBankAccountRegister'];
      this.customerVehicleBankAccountRegisterUIDTO.delete_summary_message_service_Generic = translations['delete_summary_message_service_Generic'];
      this.customerVehicleBankAccountRegisterUIDTO.delete_success_message_service_CustomerVehicleBankAccountRegister = translations['delete_success_message_service_CustomerVehicleBankAccountRegister'];

      this.customerVehicleBankAccountRegisterUIDTO.pixTypes = [
        { name: 'CPF', code: 'CPF' },
        { name: 'CNPJ', code: 'CNPJ' },
        { name: 'EMAIL', code: 'EMAIL' },
        { name: 'CELULAR', code: 'CELULAR' },
        { name: 'CHAVE ALEATORIA', code: 'CHAVE_ALEATORIA' },
      ];

      const bankPromise = firstValueFrom(this.bankService.findAll().pipe(first()));

      const [
        resultBankServiceFindAll
      ] = await Promise.all([
        bankPromise
      ]);

      if (resultBankServiceFindAll.status === 200 && resultBankServiceFindAll.body) {
        this.customerVehicleBankAccountRegisterUIDTO.banks = resultBankServiceFindAll.body;
      }

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBankAccountRegisterUIDTO.error_summary_message_service_Generic,
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
      'save_success_message_service_CustomerVehicleBankAccountRegister',
      'update_success_message_service_CustomerVehicleBankAccountRegister',
      'update_summary_message_service_Generic',
      'delete_summary_message_service_Generic',
      'delete_success_message_service_CustomerVehicleBankAccountRegister'
    ];
  }

  onRowSelectEdit(data: any): void {
    // Preenche o DTO com os dados selecionados na interface de busca para edição.

    this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO = new CustomerVehicleBankAccountDTO();

    if (data != null) {
      this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO = CustomerVehicleBankAccount.toDTO(data);

      // Converte as datas para objetos Date, se estiverem presentes.
      this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO.createdDate = new Date(this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO.createdDate);

      if (this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO.modifiedDate != null) {
        this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO.modifiedDate = new Date(this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO.modifiedDate);
      }

      this.customerVehicleBankAccountRegisterUIDTO.selectedBank = data.bank;

      const pixTypes = data.pixType;
      const currentPIXType = this.customerVehicleBankAccountRegisterUIDTO.pixTypes.find(pixType => pixType.code === pixTypes);
      
      if (currentPIXType) {
        this.customerVehicleBankAccountRegisterUIDTO.selectedPIXType = currentPIXType;
      }
    }
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const customerVehicleBankAccount = CustomerVehicleBankAccountDTO.toEntity(this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO);

    customerVehicleBankAccount.bank = this.customerVehicleBankAccountRegisterUIDTO.selectedBank;
    customerVehicleBankAccount.pixType = this.customerVehicleBankAccountRegisterUIDTO.selectedPIXType.code;

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
      const data = await firstValueFrom(this.customerVehicleBankAccountService.save(customerVehicleBankAccount).pipe(first()));

      if (data.status === 201) {
        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.customerVehicleBankAccountRegisterUIDTO.save_summary_message_service_Generic, 
          detail: this.customerVehicleBankAccountRegisterUIDTO.save_success_message_service_CustomerVehicleBankAccountRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBankAccountRegisterUIDTO.error_summary_message_service_Generic,
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

    const customerVehicleBankAccount = CustomerVehicleBankAccountDTO.toEntity(this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO);

    customerVehicleBankAccount.bank = this.customerVehicleBankAccountRegisterUIDTO.selectedBank;
    customerVehicleBankAccount.pixType = this.customerVehicleBankAccountRegisterUIDTO.selectedPIXType.code;

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de atualização.
      const data = await firstValueFrom(this.customerVehicleBankAccountService.update(customerVehicleBankAccount).pipe(first()));
  
      if (data.status === 200) {
        // Exibe mensagem de sucesso se o status da resposta for 200 OK.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.customerVehicleBankAccountRegisterUIDTO.update_summary_message_service_Generic, 
          detail: this.customerVehicleBankAccountRegisterUIDTO.update_success_message_service_CustomerVehicleBankAccountRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBankAccountRegisterUIDTO.error_summary_message_service_Generic,
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

    let customerVehicleBankAccount;

    if (data != null) {
      customerVehicleBankAccount = CustomerVehicleBankAccountDTO.toEntity(data);
    } else {
      customerVehicleBankAccount = CustomerVehicleBankAccountDTO.toEntity(this.customerVehicleBankAccountRegisterUIDTO.customerVehicleBankAccountDTO);
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de deleção.
      const data = await firstValueFrom(this.customerVehicleBankAccountService.delete(customerVehicleBankAccount.customerVehicleBankAccountId).pipe(first()));
  
      if (data && data.status === 204) {
        // Exibe mensagem de sucesso se o status da resposta for 204 No Content.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.customerVehicleBankAccountRegisterUIDTO.delete_summary_message_service_Generic, 
          detail: this.customerVehicleBankAccountRegisterUIDTO.delete_success_message_service_CustomerVehicleBankAccountRegister 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBankAccountRegisterUIDTO.error_summary_message_service_Generic,
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