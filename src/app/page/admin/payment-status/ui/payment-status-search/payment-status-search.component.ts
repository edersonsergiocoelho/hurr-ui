import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PaymentStatusSearchUIDTO } from './dto/payment-status-search-ui-dto.dto';
import { PaymentStatusService } from '../../service/payment-status.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { first, firstValueFrom } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentStatusSearchDTO } from '../../dto/payment-status-search-dto.dto';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-payment-status-search',
  templateUrl: './payment-status-search.component.html',
  styleUrls: ['./payment-status-search.component.css']
})
export class PaymentStatusSearchComponent implements OnInit {

  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();

  paymentStatusSearchUIDTO: PaymentStatusSearchUIDTO; // Objeto que contém os dados e estados da tela de busca de status de pagamento.
  paymentStatusSearchForm: NgForm; // Formulário para realizar a busca de status de pagamento.
  labelSize: string = 'text-base'; // Define o tamanho do texto dos rótulos no formulário.
  inputSize: string = 'p-inputtext-md'; // Define o tamanho dos campos de entrada no formulário.
  buttonSize: string = 'p-button-md'; // Define o tamanho dos botões no formulário.

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService, // Serviço para exibir mensagens de alerta, erro, etc.
    private ngxSpinnerService: NgxSpinnerService, // Serviço para exibir e ocultar um spinner de carregamento.
    private paymentStatusService: PaymentStatusService, // Serviço para lidar com a lógica de status de pagamento (API).
    private translateService: TranslateService // Serviço para gerenciamento de traduções no aplicativo.
  ) { }

  ngOnInit(): void {
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
      this.paymentStatusSearchUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.paymentStatusSearchUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.paymentStatusSearchUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.paymentStatusSearchUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.paymentStatusSearchUIDTO.span_button_label_active_Generic = translations['span_button_label_active_Generic'];
      this.paymentStatusSearchUIDTO.span_button_label_inactive_Generic = translations['span_button_label_inactive_Generic'];
      this.paymentStatusSearchUIDTO.span_button_label_all_Generic = translations['span_button_label_all_Generic'];

      this.paymentStatusSearchUIDTO.message_message_service_Generic = translations['message_message_service_Generic'];
      this.paymentStatusSearchUIDTO.message_all_message_service_Generic = translations['message_all_message_service_Generic'];
      this.paymentStatusSearchUIDTO.header_message_service_Generic = translations['header_message_service_Generic'];
      this.paymentStatusSearchUIDTO.accept_label_message_service_Generic = translations['accept_label_message_service_Generic'];
      this.paymentStatusSearchUIDTO.reject_label_message_service_Generic = translations['reject_label_message_service_Generic'];

      this.paymentStatusSearchUIDTO.delete_all_success_summary_message_service_Generic = translations['delete_all_success_summary_message_service_Generic'];
      this.paymentStatusSearchUIDTO.delete_all_success_detail_message_service_Generic = translations['delete_all_success_detail_message_service_Generic'];

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
        severity: SeverityConstants.ERROR,
        summary: this.paymentStatusSearchUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });
    } finally {
      // Esconde o spinner após carregar os dados.
      this.ngxSpinnerService.hide();
    }
  }

  private loadKeys(): any {
    // Define as chaves para tradução que serão carregadas.
    const keys = [
      'warn_summary_message_service_Generic',
      'error_summary_message_service_Generic',
      'info_summary_message_service_Generic',
      'success_summary_message_service_Generic',
      'span_button_label_active_Generic',
      'span_button_label_inactive_Generic',
      'span_button_label_all_Generic',
      'message_message_service_Generic',
      'message_all_message_service_Generic',
      'header_message_service_Generic',
      'accept_label_message_service_Generic',
      'reject_label_message_service_Generic',
      'delete_all_success_summary_message_service_Generic',
      'delete_all_success_detail_message_service_Generic',
      'table_header_payment_status_id_PaymentStatusSearch',
      'table_header_payment_status_name_PaymentStatusSearch',
      'table_header_enabled_PaymentStatusSearch'
    ];
    return keys;
  }

  clear(table: Table) {
    table.clear();
    this.paymentStatusSearchUIDTO.globalFilter = ''
  }

  getInputValueWithWildcards(event: Event): string {
    const target = event.target as HTMLInputElement;
    const value = target?.value || '';
    return `%${value}%`;
  }

  // Método chamado quando o usuário seleciona uma linha
  onRowSelectEdit(rowData: any) {
    this.editRow.emit(rowData);
  }

  delete(rowData: any) {
    // Abre a caixa de diálogo de confirmação
    this.confirmationService.confirm({
      message: this.paymentStatusSearchUIDTO.message_message_service_Generic, // Mensagem de confirmação
      header: this.paymentStatusSearchUIDTO.header_message_service_Generic,   // Cabeçalho da caixa de diálogo
      icon: 'pi pi-exclamation-triangle', // Ícone de aviso
      acceptLabel: this.paymentStatusSearchUIDTO.accept_label_message_service_Generic, // Rótulo do botão de aceitação
      rejectLabel: this.paymentStatusSearchUIDTO.reject_label_message_service_Generic, // Rótulo do botão de rejeição
      accept: () => {
        // Emissão de evento quando a confirmação é aceita
        this.deleteRow.emit(rowData);
      }
    });
  }

  async deleteSelectedRows() : Promise<void> {
    // Abre a caixa de diálogo de confirmação para múltiplos registros
    this.confirmationService.confirm({
      message: this.paymentStatusSearchUIDTO.message_all_message_service_Generic, // Mensagem de confirmação
      header: this.paymentStatusSearchUIDTO.header_message_service_Generic,   // Cabeçalho da caixa de diálogo
      icon: 'pi pi-exclamation-triangle', // Ícone de aviso
      acceptLabel: this.paymentStatusSearchUIDTO.accept_label_message_service_Generic, // Rótulo do botão de aceitação
      rejectLabel: this.paymentStatusSearchUIDTO.reject_label_message_service_Generic, // Rótulo do botão de rejeição
      accept: async () => { // Função async para lidar com a confirmação

        try {
          // Faz a chamada ao serviço para excluir todos os registros selecionados
          const data = await firstValueFrom(
            this.paymentStatusService.deleteAll(
              this.paymentStatusSearchUIDTO.selectedPaymentStatus.map(ps => ps.paymentStatusId) // Mapeia IDs dos registros selecionados
            ).pipe(first()) // Pega o primeiro valor emitido
          );

          // Verifica se a resposta foi bem-sucedida (status 204 No Content)
          if (data && data.status === 204) {
            // Exibe uma mensagem de sucesso
            this.messageService.add({ 
              severity: SeverityConstants.SUCCESS, 
              summary: this.paymentStatusSearchUIDTO.delete_all_success_summary_message_service_Generic, // Mensagem de resumo
              detail: this.paymentStatusSearchUIDTO.delete_all_success_detail_message_service_Generic // Detalhes da mensagem
            });
          }

        } catch (error: any) {
          // Captura e exibe mensagens de erro, se houver
          this.messageService.add({
            severity: SeverityConstants.ERROR,
            summary: this.paymentStatusSearchUIDTO.error_summary_message_service_Generic, // Mensagem de erro
            detail: error.error?.message || error.toString() // Detalhes do erro
          });

        } finally {
          // Garante que o spinner seja escondido após a conclusão da operação
          this.ngxSpinnerService.hide();
          // Atualiza a busca para refletir as mudanças
          this.search(null);
        }
      }
    });
  }

  async search(event: TableLazyLoadEvent | null) {
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
        if (this.paymentStatusSearchUIDTO.enabledValue == 'ACTIVE') {
          this.paymentStatusSearchUIDTO.paymentStatusSearchDTO.enabled = true;
        } else if (this.paymentStatusSearchUIDTO.enabledValue == 'INACTIVE') {
          this.paymentStatusSearchUIDTO.paymentStatusSearchDTO.enabled = false;
        } else if (this.paymentStatusSearchUIDTO.enabledValue == 'ALL') {
          this.paymentStatusSearchUIDTO.paymentStatusSearchDTO.enabled = null;
        }
      }

      if (event?.globalFilter != null) {
        this.paymentStatusSearchUIDTO.paymentStatusSearchDTO.globalFilter = event.globalFilter.toString();
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
        summary: this.paymentStatusSearchUIDTO.error_summary_message_service_Generic,
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