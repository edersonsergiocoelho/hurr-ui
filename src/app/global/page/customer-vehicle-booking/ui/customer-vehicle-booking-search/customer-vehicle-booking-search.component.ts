import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerVehicleBookingSearchUIDTO } from './dto/customer-vehicle-booking-search-ui-dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, firstValueFrom } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerVehicleBookingService } from '../../service/customer-vehicle-booking.service';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { CustomerVehicleBooking } from '../../entity/customer-vehicle-booking.entity';
import { CustomerVehicleBookingSearchDTO } from '../../dto/customer-vehicle-booking-search-dto.dto';
import { CustomerVehicleReviewService } from '../../../customer-vehicle-review/service/customer-vehicle-review.service';
import { CustomerVehicleReview } from '../../../customer-vehicle-review/entity/customer-vehicle-review.entity';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DecimalPipeService } from 'src/app/utils/service/decimal-utils-service';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-vehicle-booking-search',
  templateUrl: './customer-vehicle-booking-search.component.html',
  styleUrls: ['./customer-vehicle-booking-search.component.css']
})
export class CustomerVehicleBookingSearchComponent implements OnInit {

  // DTO's
  customerVehicleBookingSearchUIDTO: CustomerVehicleBookingSearchUIDTO;

  // Componentes
  @ViewChild('overlayPanelWriteAReview') overlayPanelWriteAReview: OverlayPanel;

  constructor(
    private customerVehicleBookingService: CustomerVehicleBookingService,
    private customerVehicleReviewService: CustomerVehicleReviewService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.resetForm();
  }

  resetForm() {

    this.customerVehicleBookingSearchUIDTO = new CustomerVehicleBookingSearchUIDTO();

    this.customerVehicleBookingSearchUIDTO.customerVehicleBookings = new Array<CustomerVehicleBooking>;
    this.customerVehicleBookingSearchUIDTO.customerVehicleBookingSearchDTO = new CustomerVehicleBookingSearchDTO();

    this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview = new CustomerVehicleReview();

    this.asyncCallFunctions();
  }

  // Carrega as traduções e configura as opções da interface de busca.
  async asyncCallFunctions() {

    
    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
      // Carrega as traduções necessárias para os textos da interface.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções obtidas aos campos do UIDTO.
      this.customerVehicleBookingSearchUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];

      this.customerVehicleBookingSearchUIDTO.span_button_label_active_Generic = translations['span_button_label_active_Generic'];
      this.customerVehicleBookingSearchUIDTO.span_button_label_inactive_Generic = translations['span_button_label_inactive_Generic'];
      this.customerVehicleBookingSearchUIDTO.span_button_label_all_Generic = translations['span_button_label_all_Generic'];

      this.customerVehicleBookingSearchUIDTO.message_message_service_Generic = translations['message_cancel_booking_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.header_message_service_Generic = translations['header_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.accept_label_message_service_Generic = translations['accept_label_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.reject_label_message_service_Generic = translations['reject_label_message_service_Generic'];

      this.customerVehicleBookingSearchUIDTO.label_created_date_option_1_CustomerVehicleBookingSearch = translations['label_created_date_option_1_CustomerVehicleBookingSearch'];
      this.customerVehicleBookingSearchUIDTO.label_created_date_option_2_CustomerVehicleBookingSearch = translations['label_created_date_option_2_CustomerVehicleBookingSearch'];
      this.customerVehicleBookingSearchUIDTO.save_message_service_Generic = translations['save_message_service_Generic'];
      this.customerVehicleBookingSearchUIDTO.save_cancel_booking_message_service_CustomerVehicleBookingSearch = translations['save_cancel_booking_message_service_CustomerVehicleBookingSearch'];
      this.customerVehicleBookingSearchUIDTO.save_success_write_a_review_message_service_CustomerVehicleBookingSearch = translations['save_success_write_a_review_message_service_CustomerVehicleBookingSearch'];

    this.customerVehicleBookingSearchUIDTO.sortOptions = [
      { label: '' + this.customerVehicleBookingSearchUIDTO.label_created_date_option_1_CustomerVehicleBookingSearch, value: '!createdDate' },
      { label: '' + this.customerVehicleBookingSearchUIDTO.label_created_date_option_2_CustomerVehicleBookingSearch, value: 'createdDate' }
    ];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.customerVehicleBookingSearchUIDTO.error_message_service_Generic,
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
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic',
      'span_button_label_active_Generic',
      'span_button_label_inactive_Generic',
      'span_button_label_all_Generic',
      'message_cancel_booking_message_service_Generic',
      'header_message_service_Generic',
      'accept_label_message_service_Generic',
      'reject_label_message_service_Generic',
      'label_created_date_option_1_CustomerVehicleBookingSearch',
      'label_created_date_option_2_CustomerVehicleBookingSearch',
      'save_message_service_Generic',
      'save_cancel_booking_message_service_CustomerVehicleBookingSearch',
      'save_success_write_a_review_message_service_CustomerVehicleBookingSearch'
    ];
    return keys;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.customerVehicleBookingSearchUIDTO.sortOrder = -1;
      this.customerVehicleBookingSearchUIDTO.sortField = value.substring(1, value.length);
    } else {
      this.customerVehicleBookingSearchUIDTO.sortOrder = 1;
      this.customerVehicleBookingSearchUIDTO.sortField = value;
    }
  }

  // Função assíncrona que realiza a busca de reservas de veículos com base no evento de carregamento.
  async search(event: DataViewLazyLoadEvent | null) {

    // Exibe o indicador de carregamento.
    this.ngxSpinnerService.show();

    try {
      // Configura a ordenação dos resultados com base no evento.
      if (event && event.sortField) {
        this.customerVehicleBookingSearchUIDTO.sortBy = event.sortField;
      }
      if (event && event.sortOrder) {
        this.customerVehicleBookingSearchUIDTO.sortDir = event.sortOrder === 1 ? 'DESC' : 'ASC';
      }

      // Pagina os resultados com base no evento.
      this.paginate(event);

      // Realiza a busca de reservas de veículos com base nos parâmetros definidos.
      const customerVehicleBookingServiceSearchPage: any = await firstValueFrom(
        this.customerVehicleBookingService.searchPage(
          this.customerVehicleBookingSearchUIDTO.customerVehicleBookingSearchDTO,
          this.customerVehicleBookingSearchUIDTO.page,
          this.customerVehicleBookingSearchUIDTO.size,
          this.customerVehicleBookingSearchUIDTO.sortDir,
          this.customerVehicleBookingSearchUIDTO.sortBy
        ).pipe(first())
      );

      // Atualiza os dados no DTO com base na resposta do serviço.
      this.customerVehicleBookingSearchUIDTO.customerVehicleBookings = customerVehicleBookingServiceSearchPage.body.content;
      this.customerVehicleBookingSearchUIDTO.totalRecords = customerVehicleBookingServiceSearchPage.body.totalElements;

      // Busca e processa as fotos de capa dos veículos.
      await Promise.all(this.customerVehicleBookingSearchUIDTO.customerVehicleBookings.map(customerVehicleBooking => 
        this.getCoverPhoto(customerVehicleBooking)
      ));

    } catch (error: any) {
      // Trata erros específicos e exibe mensagens de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: 'error', 
          summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    } finally {
      // Garante que o indicador de carregamento seja ocultado, independentemente do resultado.
      this.ngxSpinnerService.hide();
    }
  }

  async paginate(event: any) {
    // Atualiza a paginação com base no evento de carregamento de dados.
    if (event != null) {
      this.customerVehicleBookingSearchUIDTO.size = event.rows;
      this.customerVehicleBookingSearchUIDTO.page = event.first / event.rows;
    }
  }

  // Função assíncrona que busca a foto de capa de um veículo de cliente.
  async getCoverPhoto (customerVehicleBooking: any) {

    try {
      // Solicita a foto de capa associada ao veículo de cliente.
      const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(customerVehicleBooking.customerVehicle.customerVehicleId).pipe(first()));
        
      if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200 &&
        customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
          
        // Se a resposta for bem-sucedida, atribui o arquivo e o Data URI ao veículo.
        customerVehicleBooking.customerVehicle.file = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
        customerVehicleBooking.customerVehicle.dataURI = `data:${customerVehicleBooking.file.contentType};base64,${customerVehicleBooking.file.dataAsByteArray}`;
      }

    } catch (error: any) {

      // Trata erros específicos e exibe mensagens de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  cancelBooking(rowData: any) {
    // Abre a caixa de diálogo de confirmação
    this.confirmationService.confirm({
      message: this.customerVehicleBookingSearchUIDTO.message_message_service_Generic, // Mensagem de confirmação
      header: this.customerVehicleBookingSearchUIDTO.header_message_service_Generic,   // Cabeçalho da caixa de diálogo
      icon: 'pi pi-exclamation-triangle', // Ícone de aviso
      acceptLabel: this.customerVehicleBookingSearchUIDTO.accept_label_message_service_Generic, // Rótulo do botão de aceitação
      rejectLabel: this.customerVehicleBookingSearchUIDTO.reject_label_message_service_Generic, // Rótulo do botão de rejeição
      accept: async () => {
       
        try {

          const customerVehicleBookingServiceCancelBooking: any = await firstValueFrom(
            this.customerVehicleBookingService.cancelBooking(rowData).pipe(first())
          );

          if (customerVehicleBookingServiceCancelBooking.status == 200 && customerVehicleBookingServiceCancelBooking.body != null) {
            
            this.messageService.add({ 
              severity: SeverityConstants.SUCCESS, 
              summary: this.customerVehicleBookingSearchUIDTO.success_message_service_Generic, 
              detail: this.customerVehicleBookingSearchUIDTO.save_cancel_booking_message_service_CustomerVehicleBookingSearch
            });
          }

        } catch (error: any) {

          // Trata erros específicos e exibe mensagens de erro.
          if (error.status === 500) {
            this.messageService.add({ 
              severity: SeverityConstants.ERROR, 
              summary: this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
              detail: error.error.message 
            });
          }
        }
      }
    });
  }

  clickRouterNavigateToViewReservation(customerVehicleBooking: any) {
    this.router.navigate(['/customer-vehicle-booking/view-reservation/' + customerVehicleBooking.customerVehicleBookingId]);
  }

  clickRouterNavigateToViewInvoice(customerVehicleBooking: any) {
    this.router.navigate(['/customer-vehicle-booking/view-invoice/' + customerVehicleBooking.customerVehicleBookingId]);
  }

  clickOverlayPanelWriteAReview(event: any, customerVehicleBooking: any) {

    this.ngxSpinnerService.show();

    this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleBooking = new CustomerVehicleBooking;
    this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview = new CustomerVehicleReview;

    this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleBooking = customerVehicleBooking;

    this.customerVehicleReviewService.findByCustomerVehicleBookingIdAndCustomerId(customerVehicleBooking.customerVehicleBookingId, customerVehicleBooking.customer.customerId).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200 && data.body != null) {
          this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview = data.body;
        }

        if (this.overlayPanelWriteAReview.overlayVisible) {
          this.overlayPanelWriteAReview.hide();
        } else {
          this.overlayPanelWriteAReview.show(event);
        }

      },
      error: (error) => {

        if (error.status == 500) {

          this.messageService.add({ 
            severity: 'error', 
            summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
            detail: error.error.message 
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  onClickWriteAReview(customerVehicleReview: any) {

    this.ngxSpinnerService.show();

    this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview.customerVehicleBooking = this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleBooking;
    this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview.customer = this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleBooking.customer;

    if (this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview.customerVehicleReviewId == null) {

      this.customerVehicleReviewService.save(this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview).pipe(first()).subscribe({
        next: (data: any) => {

          if (data.status == 201) {
  
            this.messageService.add({ 
              severity: 'success', 
              summary: '' + this.customerVehicleBookingSearchUIDTO.save_message_service_Generic, 
              detail: '' +  this.customerVehicleBookingSearchUIDTO.save_success_write_a_review_message_service_CustomerVehicleBookingSearch, 
            });
  
            this.overlayPanelWriteAReview.hide();
          }
  
        },
        error: (error) => {
  
          if (error.status == 500) {
  
            this.messageService.add({ 
              severity: 'error', 
              summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
              detail: error.error.message 
            });
          }
  
          this.ngxSpinnerService.hide();
        },
        complete: () => {
          this.resetForm();
          this.search(null);
          this.ngxSpinnerService.hide();
        }
      });

    } else {

      this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview.customerVehicleReviewId = customerVehicleReview.customerVehicleReviewId;

      this.customerVehicleReviewService.update(this.customerVehicleBookingSearchUIDTO.selectedCustomerVehicleReview).pipe(first()).subscribe({
        next: (data: any) => {

          if (data.status == 200) {

            this.messageService.add({ 
              severity: 'success', 
              summary: '' + this.customerVehicleBookingSearchUIDTO.save_message_service_Generic, 
              detail: '' +  this.customerVehicleBookingSearchUIDTO.save_success_write_a_review_message_service_CustomerVehicleBookingSearch, 
            });

            this.overlayPanelWriteAReview.hide();
          }

        },
        error: (error) => {

          if (error.status == 500) {

            this.messageService.add({ 
              severity: 'error', 
              summary: '' + this.customerVehicleBookingSearchUIDTO.error_message_service_Generic, 
              detail: error.error.message 
            });
          }

          this.ngxSpinnerService.hide();
        },
        complete: () => {
          this.resetForm();
          this.search(null);
          this.ngxSpinnerService.hide();
        }
      });
    }
  }
}