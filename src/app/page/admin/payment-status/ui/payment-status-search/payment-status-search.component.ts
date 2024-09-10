import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentStatusSearchUIDTO } from './dto/payment-status-search-ui-dto.dto';
import { PaymentStatusService } from '../../service/payment-status.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TableLazyLoadEvent } from 'primeng/table';
import { first, firstValueFrom } from 'rxjs';
import { PaymentStatusRegisterComponent } from '../payment-status-register/payment-status-register.component';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentStatusSearchDTO } from '../../dto/payment-status-search-dto.dto';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { PaymentStatus } from '../../entity/payment-status.entity';

@Component({
  selector: 'app-payment-status-search',
  templateUrl: './payment-status-search.component.html',
  styleUrls: ['./payment-status-search.component.css']
})
export class PaymentStatusSearchComponent implements OnInit {

  paymentStatusSearchUIDTO: PaymentStatusSearchUIDTO; // Objeto que contém os dados e estados da tela de busca de status de pagamento.
  paymentStatusSearchForm: NgForm; // Formulário para realizar a busca de status de pagamento.
  labelSize: string = 'text-base'; // Define o tamanho do texto dos rótulos no formulário.
  inputSize: string = 'p-inputtext-md'; // Define o tamanho dos campos de entrada no formulário.
  buttonSize: string = 'p-button-md'; // Define o tamanho dos botões no formulário.

  @ViewChild(PaymentStatusRegisterComponent, {static: true}) 
  paymentStatusRegisterComponent: PaymentStatusRegisterComponent; 
  // Referência ao componente filho responsável pelo registro de status de pagamento.

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService, // Serviço para exibir mensagens de alerta, erro, etc.
    private ngxSpinnerService: NgxSpinnerService, // Serviço para exibir e ocultar um spinner de carregamento.
    private paymentStatusService: PaymentStatusService, // Serviço para lidar com a lógica de status de pagamento (API).
    private translateService: TranslateService // Serviço para gerenciamento de traduções no aplicativo.
  ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt_BR'); // Define o idioma padrão para o serviço de tradução.
    this.resetSearchForm(); // Reseta o formulário de busca ao inicializar o componente.
  }

  resetSearchForm() {
    // Inicializa o objeto DTO de busca e reseta o formulário.
    this.paymentStatusSearchUIDTO = new PaymentStatusSearchUIDTO();
    this.paymentStatusSearchUIDTO.paymentStatusSearchDTO = new PaymentStatusSearchDTO();

    this.asyncCallFunctions(); // Chama as funções assíncronas necessárias.
  }

  async asyncCallFunctions() {
    // Carrega as traduções e configura as opções da interface de busca.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
      // Carrega as traduções necessárias para os textos da interface.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções obtidas aos campos do UIDTO.
      this.paymentStatusSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.paymentStatusSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.paymentStatusSearchUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.paymentStatusSearchUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];

      this.paymentStatusSearchUIDTO.span_button_label_active_Generic = translations['span_button_label_active_Generic'];
      this.paymentStatusSearchUIDTO.span_button_label_inactive_Generic = translations['span_button_label_inactive_Generic'];
      this.paymentStatusSearchUIDTO.span_button_label_all_Generic = translations['span_button_label_all_Generic'];

      // Traduções para os cabeçalhos das colunas da tabela de busca.
      this.paymentStatusSearchUIDTO.table_header_payment_status_id_PaymentStatusSearch = translations['table_header_payment_status_id_PaymentStatusSearch'];
      this.paymentStatusSearchUIDTO.table_header_payment_status_name_PaymentStatusSearch = translations['table_header_payment_status_name_PaymentStatusSearch'];
      this.paymentStatusSearchUIDTO.table_header_enabled_PaymentStatusSearch = translations['table_header_enabled_PaymentStatusSearch'];

      // Configura as colunas da tabela de resultados da busca.
      this.paymentStatusSearchUIDTO.columns = [
        { field: 'paymentStatusId', header: this.paymentStatusSearchUIDTO.table_header_payment_status_id_PaymentStatusSearch },
        { field: 'paymentStatusName', sortField: 'paymentStatusName', header: this.paymentStatusSearchUIDTO.table_header_payment_status_name_PaymentStatusSearch },
        { field: 'enabled', sortField: 'enabled', header: this.paymentStatusSearchUIDTO.table_header_enabled_PaymentStatusSearch },
        { header: '' },
      ];

      // Configura as opções de filtro para o campo "enabled" (ativado/desativado/todos).
      this.paymentStatusSearchUIDTO.enabledOptions = [
        {label: this.paymentStatusSearchUIDTO.span_button_label_all_Generic, value: 'ALL'}, 
        {label: this.paymentStatusSearchUIDTO.span_button_label_active_Generic, value: 'ACTIVE'}, 
        {label: this.paymentStatusSearchUIDTO.span_button_label_inactive_Generic, value: 'INACTIVE'}
      ];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha.
      this.messageService.add({
        severity: 'error',
        summary: '' + this.paymentStatusSearchUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    } finally {
      // Esconde o spinner após carregar os dados.
      this.ngxSpinnerService.hide();
    }
  }

  private loadKeys(): any {
    // Define as chaves para tradução que serão carregadas.
    const keys = [
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic',
      'span_button_label_active_Generic',
      'span_button_label_inactive_Generic',
      'span_button_label_all_Generic',
      'table_header_payment_status_id_PaymentStatusSearch',
      'table_header_payment_status_name_PaymentStatusSearch',
      'table_header_enabled_PaymentStatusSearch'
    ];
    return keys;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.paymentStatusSearchUIDTO.paymentStatuses = this.paymentStatusSearchUIDTO.paymentStatuses.filter((val) => !this.paymentStatusSearchUIDTO.selectedPaymentStatus.includes(val));
        this.paymentStatusSearchUIDTO.selectedPaymentStatus = new Array<PaymentStatus>;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  async search(event: TableLazyLoadEvent) {
    // Função para realizar a busca com base em eventos de paginação ou ordenação.

    this.ngxSpinnerService.show(); // Exibe o spinner durante a busca.

    try {
      // Verifica se há campos de ordenação definidos no evento.
      if (event && event.sortField) {
        this.paymentStatusSearchUIDTO.sortBy = event.sortField;
      }
      if (event && event.sortOrder) {
        this.paymentStatusSearchUIDTO.sortDir = event.sortOrder === 1 ? "DESC" : "ASC";
      }

      // Ajusta o campo "enabled" baseado no valor selecionado.
      if (this.paymentStatusSearchUIDTO.enabledValue != null) {
        this.paymentStatusSearchUIDTO.paymentStatusSearchDTO.enabled = this.paymentStatusSearchUIDTO.enabledValue === 'ACTIVE';
      }

      // Realiza a busca no serviço de status de pagamento, retornando os resultados paginados.
      const data = await firstValueFrom(
        this.paymentStatusService.searchPage(
          this.paymentStatusSearchUIDTO.paymentStatusSearchDTO,
          this.paymentStatusSearchUIDTO.page,
          this.paymentStatusSearchUIDTO.size,
          this.paymentStatusSearchUIDTO.sortDir,
          this.paymentStatusSearchUIDTO.sortBy
        ).pipe(first())
      );

      // Atribui os dados retornados à lista de status de pagamento e ao total de registros.
      this.paymentStatusSearchUIDTO.paymentStatuses = data.body.content;
      this.paymentStatusSearchUIDTO.totalRecords = data.body.totalElements;

    } catch (error: any) {
      // Exibe mensagem de erro caso ocorra uma falha durante a busca.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentStatusSearchUIDTO.error_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      this.ngxSpinnerService.hide(); // Garante que o spinner será escondido, independentemente do sucesso ou erro.
    }
  }

  paginate(event: any) {
    // Atualiza os parâmetros de paginação com base nos eventos da tabela.
    this.paymentStatusSearchUIDTO.size = event.rows;
    this.paymentStatusSearchUIDTO.page = event.first / event.rows;
  }

  onChangeEnabled(event: any){
    // Atualiza o valor do campo "enabled" com base na seleção do usuário.
    this.paymentStatusSearchUIDTO.enabledValue = event.value;
  }
}