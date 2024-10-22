import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PaymentMethodSearchUIDTO } from './dto/payment-method-search-ui-dto.dto';
import { PaymentMethodService } from '../../service/payment-method.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { first, firstValueFrom } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentMethodSearchDTO } from '../../dto/payment-method-search-dto.dto';
import { SeverityConstants } from 'src/app/commom/severity.constants';

@Component({
  selector: 'app-payment-method-search',
  templateUrl: './payment-method-search.component.html',
  styleUrls: ['./payment-method-search.component.css']
})
export class PaymentMethodSearchComponent implements OnInit {

  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();

  paymentMethodSearchUIDTO: PaymentMethodSearchUIDTO; // Objeto que contém os dados e estados da tela de busca de status de pagamento.
  paymentMethodSearchForm: NgForm; // Formulário para realizar a busca de status de pagamento.
  labelSize: string = 'text-base'; // Define o tamanho do texto dos rótulos no formulário.
  inputSize: string = 'p-inputtext-md'; // Define o tamanho dos campos de entrada no formulário.
  buttonSize: string = 'p-button-md'; // Define o tamanho dos botões no formulário.

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService, // Serviço para exibir mensagens de alerta, erro, etc.
    private ngxSpinnerService: NgxSpinnerService, // Serviço para exibir e ocultar um spinner de carregamento.
    private paymentMethodService: PaymentMethodService, // Serviço para lidar com a lógica de status de pagamento (API).
    private translateService: TranslateService // Serviço para gerenciamento de traduções no aplicativo.
  ) { }

  ngOnInit(): void {
    this.resetSearchForm(); // Reseta o formulário de busca ao inicializar o componente.
  }

  resetSearchForm() {
    // Inicializa o objeto DTO de busca e reseta o formulário.
    this.paymentMethodSearchUIDTO = new PaymentMethodSearchUIDTO();
    this.paymentMethodSearchUIDTO.paymentMethodSearchDTO = new PaymentMethodSearchDTO();

    this.asyncCallFunctions(); // Chama as funções assíncronas necessárias.
  }

  async asyncCallFunctions() {
    // Carrega as traduções e configura as opções da interface de busca.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
      // Carrega as traduções necessárias para os textos da interface.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções obtidas aos campos do UIDTO.
      this.paymentMethodSearchUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.paymentMethodSearchUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.paymentMethodSearchUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.paymentMethodSearchUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.paymentMethodSearchUIDTO.span_button_label_active_Generic = translations['span_button_label_active_Generic'];
      this.paymentMethodSearchUIDTO.span_button_label_inactive_Generic = translations['span_button_label_inactive_Generic'];
      this.paymentMethodSearchUIDTO.span_button_label_all_Generic = translations['span_button_label_all_Generic'];

      this.paymentMethodSearchUIDTO.message_message_service_Generic = translations['message_message_service_Generic'];
      this.paymentMethodSearchUIDTO.message_all_message_service_Generic = translations['message_all_message_service_Generic'];
      this.paymentMethodSearchUIDTO.header_message_service_Generic = translations['header_message_service_Generic'];
      this.paymentMethodSearchUIDTO.accept_label_message_service_Generic = translations['accept_label_message_service_Generic'];
      this.paymentMethodSearchUIDTO.reject_label_message_service_Generic = translations['reject_label_message_service_Generic'];

      this.paymentMethodSearchUIDTO.delete_all_success_summary_message_service_Generic = translations['delete_all_success_summary_message_service_Generic'];
      this.paymentMethodSearchUIDTO.delete_all_success_detail_message_service_Generic = translations['delete_all_success_detail_message_service_Generic'];

      // Traduções para os cabeçalhos das colunas da tabela de busca.
      this.paymentMethodSearchUIDTO.table_header_payment_status_id_PaymentMethodSearch = translations['table_header_payment_status_id_PaymentMethodSearch'];
      this.paymentMethodSearchUIDTO.table_header_payment_status_name_PaymentMethodSearch = translations['table_header_payment_status_name_PaymentMethodSearch'];
      this.paymentMethodSearchUIDTO.table_header_enabled_PaymentMethodSearch = translations['table_header_enabled_PaymentMethodSearch'];

      // Configura as colunas da tabela de resultados da busca.
      this.paymentMethodSearchUIDTO.columns = [
        { field: 'paymentMethodId', header: this.paymentMethodSearchUIDTO.table_header_payment_status_id_PaymentMethodSearch },
        { field: 'paymentMethodName', sortField: 'paymentMethodName', header: this.paymentMethodSearchUIDTO.table_header_payment_status_name_PaymentMethodSearch },
        { field: 'enabled', sortField: 'enabled', header: this.paymentMethodSearchUIDTO.table_header_enabled_PaymentMethodSearch },
        { header: '' },
      ];

      // Configura as opções de filtro para o campo "enabled" (ativado/desativado/todos).
      this.paymentMethodSearchUIDTO.enabledOptions = [
        {label: this.paymentMethodSearchUIDTO.span_button_label_all_Generic, value: 'ALL'}, 
        {label: this.paymentMethodSearchUIDTO.span_button_label_active_Generic, value: 'ACTIVE'}, 
        {label: this.paymentMethodSearchUIDTO.span_button_label_inactive_Generic, value: 'INACTIVE'}
      ];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentMethodSearchUIDTO.error_summary_message_service_Generic,
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
      'table_header_payment_status_id_PaymentMethodSearch',
      'table_header_payment_status_name_PaymentMethodSearch',
      'table_header_enabled_PaymentMethodSearch'
    ];
    return keys;
  }

  clear(table: Table) {
    table.clear();
    this.paymentMethodSearchUIDTO.globalFilter = ''
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
      message: this.paymentMethodSearchUIDTO.message_message_service_Generic, // Mensagem de confirmação
      header: this.paymentMethodSearchUIDTO.header_message_service_Generic,   // Cabeçalho da caixa de diálogo
      icon: 'pi pi-exclamation-triangle', // Ícone de aviso
      acceptLabel: this.paymentMethodSearchUIDTO.accept_label_message_service_Generic, // Rótulo do botão de aceitação
      rejectLabel: this.paymentMethodSearchUIDTO.reject_label_message_service_Generic, // Rótulo do botão de rejeição
      accept: () => {
        // Emissão de evento quando a confirmação é aceita
        this.deleteRow.emit(rowData);
      }
    });
  }

  async deleteSelectedRows() : Promise<void> {
    // Abre a caixa de diálogo de confirmação para múltiplos registros
    this.confirmationService.confirm({
      message: this.paymentMethodSearchUIDTO.message_all_message_service_Generic, // Mensagem de confirmação
      header: this.paymentMethodSearchUIDTO.header_message_service_Generic,   // Cabeçalho da caixa de diálogo
      icon: 'pi pi-exclamation-triangle', // Ícone de aviso
      acceptLabel: this.paymentMethodSearchUIDTO.accept_label_message_service_Generic, // Rótulo do botão de aceitação
      rejectLabel: this.paymentMethodSearchUIDTO.reject_label_message_service_Generic, // Rótulo do botão de rejeição
      accept: async () => { // Função async para lidar com a confirmação

        try {
          // Faz a chamada ao serviço para excluir todos os registros selecionados
          const data = await firstValueFrom(
            this.paymentMethodService.deleteAll(
              this.paymentMethodSearchUIDTO.selectedPaymentMethod.map(ps => ps.paymentMethodId) // Mapeia IDs dos registros selecionados
            ).pipe(first()) // Pega o primeiro valor emitido
          );

          // Verifica se a resposta foi bem-sucedida (status 204 No Content)
          if (data && data.status === 204) {
            // Exibe uma mensagem de sucesso
            this.messageService.add({ 
              severity: SeverityConstants.SUCCESS, 
              summary: this.paymentMethodSearchUIDTO.delete_all_success_summary_message_service_Generic, // Mensagem de resumo
              detail: this.paymentMethodSearchUIDTO.delete_all_success_detail_message_service_Generic // Detalhes da mensagem
            });
          }

        } catch (error: any) {
          // Captura e exibe mensagens de erro, se houver
          this.messageService.add({
            severity: SeverityConstants.ERROR,
            summary: this.paymentMethodSearchUIDTO.error_summary_message_service_Generic, // Mensagem de erro
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
        this.paymentMethodSearchUIDTO.sortBy = event.sortField;
      }
      if (event && event.sortOrder) {
        this.paymentMethodSearchUIDTO.sortDir = event.sortOrder === 1 ? "DESC" : "ASC";
      }

      // Ajusta o campo "enabled" baseado no valor selecionado.
      if (this.paymentMethodSearchUIDTO.enabledValue != null) {
        if (this.paymentMethodSearchUIDTO.enabledValue == 'ACTIVE') {
          this.paymentMethodSearchUIDTO.paymentMethodSearchDTO.enabled = true;
        } else if (this.paymentMethodSearchUIDTO.enabledValue == 'INACTIVE') {
          this.paymentMethodSearchUIDTO.paymentMethodSearchDTO.enabled = false;
        } else if (this.paymentMethodSearchUIDTO.enabledValue == 'ALL') {
          this.paymentMethodSearchUIDTO.paymentMethodSearchDTO.enabled = null;
        }
      }

      if (event?.globalFilter != null) {
        this.paymentMethodSearchUIDTO.paymentMethodSearchDTO.globalFilter = event.globalFilter.toString();
      }

      // Realiza a busca no serviço de status de pagamento, retornando os resultados paginados.
      const data = await firstValueFrom(
        this.paymentMethodService.searchPage(
          this.paymentMethodSearchUIDTO.paymentMethodSearchDTO,
          this.paymentMethodSearchUIDTO.page,
          this.paymentMethodSearchUIDTO.size,
          this.paymentMethodSearchUIDTO.sortDir,
          this.paymentMethodSearchUIDTO.sortBy
        ).pipe(first())
      );

      // Atribui os dados retornados à lista de status de pagamento e ao total de registros.
      this.paymentMethodSearchUIDTO.paymentMethodes = data.body.content;
      this.paymentMethodSearchUIDTO.totalRecords = data.body.totalElements;

    } catch (error: any) {
      // Exibe mensagem de erro caso ocorra uma falha durante a busca.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.paymentMethodSearchUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      this.ngxSpinnerService.hide(); // Garante que o spinner será escondido, independentemente do sucesso ou erro.
    }
  }

  paginate(event: any) {
    // Atualiza os parâmetros de paginação com base nos eventos da tabela.
    this.paymentMethodSearchUIDTO.size = event.rows;
    this.paymentMethodSearchUIDTO.page = event.first / event.rows;
  }

  onChangeEnabled(event: any){
    // Atualiza o valor do campo "enabled" com base na seleção do usuário.
    this.paymentMethodSearchUIDTO.enabledValue = event.value;
  }
}