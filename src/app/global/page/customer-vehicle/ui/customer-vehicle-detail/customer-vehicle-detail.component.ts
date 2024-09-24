import { Component, OnInit } from '@angular/core';
import { DecimalPipe, Location } from '@angular/common';
import { first, firstValueFrom } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

import { CustomerVehicleDetailUIDTO } from './dto/customer-vehicle-detail-ui.dto';
import { CustomerVehicleReviewService } from '../../../customer-vehicle-review/service/customer-vehicle-review.service';
import { CustomerVehicleService } from '../../service/customer-vehicle.service';
import { CustomerVehicleAddressService } from '../../../customer-vehicle-address/service/customer-vehicle-address.service';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';
import { AddressType } from 'src/app/page/admin/address-type/address-type.enum';
import { MessageService } from 'primeng/api';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { CustomerService } from '../../../customer/service/customer.service';
import { UserService } from 'src/app/page/user/service/user.service';
import { FileService } from 'src/app/page/file/service/file.service';
import { TranslateService } from '@ngx-translate/core';
import { AddressRegisterDynamicDialogComponent } from '../../../address/ui/address-register-dynamic-dialog/address-register-dynamic-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomerAddressService } from '../../../customer-address/service/customer-address.service';
import * as moment from 'moment';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-customer-vehicle-detail',
  templateUrl: './customer-vehicle-detail.component.html',
  styleUrls: ['./customer-vehicle-detail.component.css']
})
export class CustomerVehicleDetailComponent implements OnInit {

  customerVehicleDetailUIDTO: CustomerVehicleDetailUIDTO;
  rateUtilsService: RateUtilsService;

  constructor(
    private customerService: CustomerService,
    private customerAddressService: CustomerAddressService,
    private customerVehicleAddressService: CustomerVehicleAddressService,
    private customerVehicleReviewService: CustomerVehicleReviewService,
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private dialogService: DialogService,
    private decimalPipe: DecimalPipe,
    private fileService: FileService,
    private location: Location,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService,
    private rateUtils: RateUtilsService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService,
    private userService: UserService,
  ) {
    this.rateUtilsService = rateUtils;
  }

  ngOnInit(): void {
    this.resetDetailForm(); // Inicializa o formulário com os dados da página.
  }

  resetDetailForm() {
    // Inicializa o objeto de detalhes do veículo.
    this.customerVehicleDetailUIDTO = new CustomerVehicleDetailUIDTO();

    const state = this.location.getState() as any;
    
    if (state != null) {
      // Preenche o objeto com os dados do estado obtido da navegação.
      this.customerVehicleDetailUIDTO.customerVehicleId = state.customerVehicleId;
      this.customerVehicleDetailUIDTO.today = moment().toDate();
      this.customerVehicleDetailUIDTO.dateInit = moment(state.dateInit).toDate();
      this.customerVehicleDetailUIDTO.selectedHourInit = state.selectedHourInit;
      this.customerVehicleDetailUIDTO.dateEnd = moment(state.dateEnd).toDate();
      this.customerVehicleDetailUIDTO.selectedHourEnd = state.selectedHourEnd;

      const dateInitMoment = moment(this.customerVehicleDetailUIDTO.dateInit);

      // Calcula a data de cancelamento gratuito com base na data de início.
      if (dateInitMoment.isSame(moment(), 'day')) {
        this.customerVehicleDetailUIDTO.dateCancelFree = dateInitMoment.toDate();
      } else {
        this.customerVehicleDetailUIDTO.dateCancelFree = moment(this.customerVehicleDetailUIDTO.dateInit).subtract(1, 'day').toDate();
      }
    }

    this.asyncCallFunctions(); // Executa funções assíncronas para carregar dados.
  }

  async asyncCallFunctions() {
    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento para o usuário.

    try {
      // Carrega as traduções necessárias.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções aos campos correspondentes.
      this.customerVehicleDetailUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.customerVehicleDetailUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.customerVehicleDetailUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.customerVehicleDetailUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.customerVehicleDetailUIDTO.header_Address_CustomerVehicleDetail = translations['header_Address_CustomerVehicleDetail'];
      this.customerVehicleDetailUIDTO.warn_not_null_customer_vehicle_address_vehicle_CustomerVehicleDetail = translations['warn_not_null_customer_vehicle_address_vehicle_CustomerVehicleDetail'];
      this.customerVehicleDetailUIDTO.warn_customer_not_validated_CustomerVehicleDetail = translations['warn_customer_not_validated_CustomerVehicleDetail'];
      this.customerVehicleDetailUIDTO.info_user_not_logged_in_CustomerVehicleDetail = translations['info_user_not_logged_in_CustomerVehicleDetail'];

      // Carrega as horas de início e verifica o usuário logado.
      this.loadDateInit();
      this.loadHoursInit();

      const currentUser = this.sessionStorageService.getUser();

      if (currentUser != null) {
        // Busca as informações do cliente logado.
        const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

        if (resultCustomerFindByEmail.status === 200 && resultCustomerFindByEmail.body != null) {
          this.customerVehicleDetailUIDTO.customer = resultCustomerFindByEmail.body;
        }
      }

      // Carrega dados iniciais que sempre são necessários.
      const reviewsPromise = firstValueFrom(this.customerVehicleReviewService.findAllByCustomerVehicleId(this.customerVehicleDetailUIDTO.customerVehicleId).pipe(first()));
      const vehicleDetailsPromise = firstValueFrom(this.customerVehicleService.findById(this.customerVehicleDetailUIDTO.customerVehicleId).pipe(first()));
      const vehicleAddressesPromise = firstValueFrom(this.customerVehicleAddressService.findAllByCustomerVehicleIdAndAddressType(this.customerVehicleDetailUIDTO.customerVehicleId, AddressType.VEHICLE).pipe(first()));
      const vehiclePhotosPromise = firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicle(this.customerVehicleDetailUIDTO.customerVehicleId).pipe(first()));

      const [
        resultFindAllByCustomerVehicleId,
        resultCustomerVehicleServiceFindById,
        resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle,
        customerVehicleFilePhotos
      ] = await Promise.all([
        reviewsPromise, 
        vehicleDetailsPromise, 
        vehicleAddressesPromise, 
        vehiclePhotosPromise
      ]);

      // Processa os resultados carregados.

      // Processa as revisões dos veículos.
      if (resultFindAllByCustomerVehicleId.status === 200 && resultFindAllByCustomerVehicleId.body) {
        this.customerVehicleDetailUIDTO.customersVehiclesReviews = resultFindAllByCustomerVehicleId.body;
        let counts = [0, 0, 0, 0, 0];

        for (const review of this.customerVehicleDetailUIDTO.customersVehiclesReviews) {
          await this.getUser(review); // Obtém o usuário associado à revisão.
          counts[review.rating - 1]++;
        }

        const totalReviews = this.customerVehicleDetailUIDTO.customersVehiclesReviews.length;
        this.customerVehicleDetailUIDTO.percentages = counts.map(count => (count / totalReviews) * 100); // Calcula a porcentagem de cada avaliação.
      }

      // Processa os detalhes do veículo.
      if (resultCustomerVehicleServiceFindById.status === 200 && resultCustomerVehicleServiceFindById.body) {
        this.customerVehicleDetailUIDTO.customerVehicle = resultCustomerVehicleServiceFindById.body;
        await this.getUserFromCustomerVehicle(this.customerVehicleDetailUIDTO.customerVehicle); // Obtém o usuário associado ao veículo.
      }

      // Processa os endereços do veículo.
      if (resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.status === 200 && resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.body) {
        this.customerVehicleDetailUIDTO.listCustomerVehicleAddressVehicle = resultCVAFindAllByCustomerVehicleIdAndAddressTypeVehicle.body;
      }

      // Processa as fotos do veículo.
      if (this.customerVehicleDetailUIDTO.customerVehicleId != null && customerVehicleFilePhotos.status === 200 && customerVehicleFilePhotos.body) {
        this.customerVehicleDetailUIDTO.customerVehicleFilePhotos = customerVehicleFilePhotos.body.map(customerVehicleFilePhoto => {
          return {
            ...customerVehicleFilePhoto,
            dataURI: `data:${customerVehicleFilePhoto.contentType};base64,${customerVehicleFilePhoto.dataAsByteArray}`
          };
        });
      }

      // Carrega endereços de entrega e retirada se o cliente estiver disponível.
      if (this.customerVehicleDetailUIDTO.customer?.customerId != null) {
        const deliveryAddressPromise = firstValueFrom(this.customerAddressService.findByCustomerIdAndAddressTypeName(this.customerVehicleDetailUIDTO.customer.customerId, AddressType.DELIVERY).pipe(first()));
        const pickupAddressPromise = firstValueFrom(this.customerAddressService.findByCustomerIdAndAddressTypeName(this.customerVehicleDetailUIDTO.customer.customerId, AddressType.PICKUP).pipe(first()));

        const [customerAddressServiceFindByCustomerIdAndAddressTypeNameDelivery, customerAddressServiceFindByCustomerIdAndAddressTypeNamePickup] = await Promise.all([deliveryAddressPromise, pickupAddressPromise]);

        if (customerAddressServiceFindByCustomerIdAndAddressTypeNameDelivery.status === 200 && customerAddressServiceFindByCustomerIdAndAddressTypeNameDelivery.body) {
          this.customerVehicleDetailUIDTO.listCustomerAddressDelivery = customerAddressServiceFindByCustomerIdAndAddressTypeNameDelivery.body;
        }

        if (customerAddressServiceFindByCustomerIdAndAddressTypeNamePickup.status === 200 && customerAddressServiceFindByCustomerIdAndAddressTypeNamePickup.body) {
          this.customerVehicleDetailUIDTO.listCustomerAddressPickUp = customerAddressServiceFindByCustomerIdAndAddressTypeNamePickup.body;
        }
      }

    } catch (error: any) {
      // Trata os erros de carregamento e exibe uma mensagem de erro.
      this.messageService.add({
        severity: 'error',
        summary: '' + this.customerVehicleDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    } finally {
      // Oculta o spinner de carregamento independentemente do resultado.
      this.ngxSpinnerService.hide();
    }
  }

  private loadKeys(): any {
    // Define as chaves para tradução.
    const keys = [
      'warn_message_service_Generic', // Mensagem de aviso genérica
      'error_message_service_Generic', // Mensagem de erro genérica
      'info_message_service_Generic', // Mensagem de informação genérica
      'success_message_service_Generic', // Mensagem de sucesso genérica
      'header_Address_CustomerVehicleDetail', // Cabeçalho para detalhes do endereço do veículo do cliente
      'warn_not_null_customer_vehicle_address_vehicle_CustomerVehicleDetail', // Aviso: endereço do veículo do cliente não pode ser nulo
      'warn_customer_not_validated_CustomerVehicleDetail', // Aviso: cliente não validado
      'info_user_not_logged_in_CustomerVehicleDetail' // Informação: usuário não está logado
    ];
    return keys;
  }

  loadDateInit() {

    const today = moment().toDate();
  
    // Defina `today` como a data mínima
    this.customerVehicleDetailUIDTO.today = today;
  
    // Inicialize `dateInit` com a data de hoje se estiver nulo ou for anterior à data mínima
    if (!this.customerVehicleDetailUIDTO.dateInit || moment(this.customerVehicleDetailUIDTO.dateInit).isBefore(today)) {
      this.customerVehicleDetailUIDTO.dateInit = today;
    }
  }

  loadHoursInit() {
    const now = new Date(); // Obtém a data e hora atuais
    const isToday = this.isSameDay(this.customerVehicleDetailUIDTO.dateInit, this.customerVehicleDetailUIDTO.today);

    // Verifica se o horário atual é 23:30 ou mais tarde
    if (now.getHours() === 23 && now.getMinutes() >= 30) {
      this.customerVehicleDetailUIDTO.dateInit = new Date();
      this.customerVehicleDetailUIDTO.dateInit.setDate(this.customerVehicleDetailUIDTO.dateInit.getDate() + 1); // Define dateInit para o dia seguinte
    }

    // Adiciona uma hora ao horário atual
    now.setHours(now.getHours() + 1);

    // Calcula hoursInit com base na dataInit atualizada
    this.customerVehicleDetailUIDTO.hoursInit = Array.from({ length: 48 }, (_, index) => {
      const hour = Math.floor(index / 2); // Calcula a hora
      const minute: number = index % 2 === 0 ? 0 : 30; // Define os minutos (0 ou 30)
      const hourStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`; // Formata a hora e os minutos

      // Mostra todas as horas se dateInit for amanhã ou mais tarde
      if (this.customerVehicleDetailUIDTO.dateInit > now || !isToday) {
        return hourStr;
      }

      // Caso contrário, mostra apenas as horas futuras de hoje
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
        return ''; // Para horas passadas, retorna uma string vazia
      } else {
        return hourStr;
      }
    }).filter(hour => hour !== ''); // Filtra as horas vazias

    if (this.customerVehicleDetailUIDTO.hoursInit != null && this.customerVehicleDetailUIDTO.hoursInit.length > 0) {
      this.customerVehicleDetailUIDTO.dateInit = this.customerVehicleDetailUIDTO.dateInit;
      this.customerVehicleDetailUIDTO.selectedHourInit = this.customerVehicleDetailUIDTO.hoursInit[0];
    }

    this.ngModelChangeDateInit(); // Atualiza os modelos relacionados
  }

  // Método auxiliar para verificar se duas datas são do mesmo dia
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
  }

  async getUserFromCustomerVehicle(customerVehicle: any) {
    // Obtém o usuário associado ao veículo do cliente com base no e-mail
    const userServiceFindByEmail = await firstValueFrom(this.userService.findByEmail(customerVehicle.customer.email).pipe(first()));

    if (userServiceFindByEmail.status == 200 && userServiceFindByEmail.body != null) {
      customerVehicle.customer.user = userServiceFindByEmail.body; // Atribui o usuário ao veículo do cliente

      if (customerVehicle.customer.user.photoFileId != null) {
        this.getFileFromCustomerVehicle(customerVehicle); // Obtém o arquivo da foto do usuário
      }        
    }
  }

  async getFileFromCustomerVehicle (customerVehicle: any) {
    // Obtém o arquivo com base no ID da foto do usuário
    const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.customer.user.photoFileId).pipe(first()));
        
    if (fileServiceFindById.status == 200 && fileServiceFindById.body != null) {
      customerVehicle.customer.user.file = fileServiceFindById.body; // Atribui o arquivo ao usuário
      customerVehicle.customer.user.dataURI = `data:${customerVehicle.customer.user.file.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`; // Define o URI dos dados para a foto
    }
  }

  async getUser(customerVehicleReview: any) {
    // Obtém o usuário associado à revisão do veículo do cliente com base no e-mail
    const userServiceFindByEmail = await firstValueFrom(this.userService.findByEmail(customerVehicleReview.customer.email).pipe(first()));

    if (userServiceFindByEmail.status == 200 && userServiceFindByEmail.body != null) {
      customerVehicleReview.user = userServiceFindByEmail.body; // Atribui o usuário à revisão do veículo do cliente

      if (customerVehicleReview.user.photoFileId != null) {
        this.getFile(customerVehicleReview); // Obtém o arquivo da foto do usuário
      }        
    }
  }

  async getFile (customerVehicleReview: any) {
    // Obtém o arquivo com base no ID da foto do usuário
    const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicleReview.user.photoFileId).pipe(first()));
      
    if (fileServiceFindById.status == 200 && fileServiceFindById.body != null) {
      customerVehicleReview.file = fileServiceFindById.body; // Atribui o arquivo à revisão do veículo do cliente
      customerVehicleReview.dataURI = `data:${customerVehicleReview.file.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`; // Define o URI dos dados para a foto
    }
  }

  getFilledStarsArray(rating: number): number[] {
    return Array.from({ length: rating }, () => 0); // Cria um array com estrelas preenchidas com base na classificação
  }
  
  getEmptyStarsArray(rating: number): number[] {
    return Array.from({ length: 5 - rating }, () => 0); // Cria um array com estrelas vazias com base na classificação
  }

  getAverageRating(): number {
    let totalRating = 0;

    if (this.customerVehicleDetailUIDTO && this.customerVehicleDetailUIDTO.customersVehiclesReviews) {
      const reviews = this.customerVehicleDetailUIDTO.customersVehiclesReviews;
      const totalReviews = reviews.length;

      if (totalReviews > 0) {
        totalRating = reviews.reduce((acc: number, review: any) => acc + review.rating, 0); // Calcula a soma das classificações
        return totalRating / totalReviews; // Calcula a média das classificações
      }
    }

    return totalRating; // Retorna 0 se não houver avaliações
  }

  handlePercentage(percentage: number): string {
    return !isNaN(percentage) ? percentage.toFixed(2) + '%' : '0'; // Formata a porcentagem com duas casas decimais
  }

  ngModelChangeDateInit() {
    if (this.customerVehicleDetailUIDTO.customerVehicle) {
      const dateInitMoment = moment(this.customerVehicleDetailUIDTO.dateInit);
      this.customerVehicleDetailUIDTO.dateCancelFree = dateInitMoment.isSame(moment(), 'day')
        ? dateInitMoment.toDate()
        : dateInitMoment.subtract(1, 'day').toDate(); // Define a data de cancelamento gratuito

      if (this.customerVehicleDetailUIDTO.dateEnd) {
        this.rateUtils.calculateTotalRate(
          moment(this.customerVehicleDetailUIDTO.dateInit).toDate(),
          moment(this.customerVehicleDetailUIDTO.dateEnd).toDate(),
          this.customerVehicleDetailUIDTO.customerVehicle.dailyRate
        ); // Calcula a taxa total
      }
    }
  }

  ngModelChangeDateEnd() {
    if (this.customerVehicleDetailUIDTO.dateInit && this.customerVehicleDetailUIDTO.dateEnd) {
      this.rateUtils.calculateTotalRate(
        this.customerVehicleDetailUIDTO.dateInit,
        this.customerVehicleDetailUIDTO.dateEnd,
        this.customerVehicleDetailUIDTO.customerVehicle.dailyRate
      ); // Calcula a taxa total
    }
  }

  openAddressDialog(header: string, newRegister: boolean): void {
    const ref = this.dialogService.open(AddressRegisterDynamicDialogComponent, {
      header: header, // Define o cabeçalho do diálogo
      width: '70%',
      contentStyle: { 'max-height': '500px', 'overflow-y': 'auto' },
      baseZIndex: 10000,
      style: { 'max-height': '90%', 'overflow-y': 'auto' },
      closable: true,
      data: { newRegister: newRegister } // Passa dados para o diálogo
    });
  
    ref.onClose.subscribe((result: any) => {
      // Manipula o resultado do diálogo, se necessário
    });
  }
  
  newAddressDeliveryRegisterDynamicDialog(): void {
    const currentUser = this.sessionStorageService.getUser();

    if (currentUser == null) {
      // Se o usuário não estiver logado, exibe uma mensagem de informação
      this.messageService.add({ 
        severity: SeverityConstants.INFO, 
        summary: this.customerVehicleDetailUIDTO.info_message_service_Generic,
        detail: this.customerVehicleDetailUIDTO.info_user_not_logged_in_CustomerVehicleDetail
      });
      return;
    }

    this.openAddressDialog(this.customerVehicleDetailUIDTO.header_Address_CustomerVehicleDetail, true); // Abre o diálogo para um novo registro de endereço
  }
  
  newAddressPickUpRegisterDynamicDialog(): void {
    const currentUser = this.sessionStorageService.getUser();

    if (currentUser == null) {
      // Se o usuário não estiver logado, exibe uma mensagem de informação
      this.messageService.add({ 
        severity: SeverityConstants.INFO, 
        summary: this.customerVehicleDetailUIDTO.info_message_service_Generic,
        detail: this.customerVehicleDetailUIDTO.info_user_not_logged_in_CustomerVehicleDetail
      });
      return;
    }

    this.openAddressDialog(this.customerVehicleDetailUIDTO.header_Address_CustomerVehicleDetail, true); // Abre o diálogo para um novo registro de endereço
  }

  async onClickContinue() {
    // Verifica se nenhum endereço foi selecionado
    if (!this.customerVehicleDetailUIDTO.selectedCustomerVehicleAddressVehicle &&
        !this.customerVehicleDetailUIDTO.selectedCustomerAddressDelivery &&
        !this.customerVehicleDetailUIDTO.selectedCustomerAddressPickUp) {

      // Exibe uma mensagem de aviso se nenhum endereço for selecionado
      this.messageService.add({
        severity: SeverityConstants.WARN,
        summary: this.customerVehicleDetailUIDTO.warn_message_service_Generic,
        detail: this.customerVehicleDetailUIDTO.warn_not_null_customer_vehicle_address_vehicle_CustomerVehicleDetail
      });

      return; // Interrompe a execução se a validação falhar
    }

    // Obtém o usuário atual da sessão
    const currentUser = this.sessionStorageService.getUser();
    // Define os parâmetros de navegação
    const navigationExtras: NavigationExtras = {
      state: {
        customerVehicleId: this.customerVehicleDetailUIDTO.customerVehicleId,
        dateInit: this.customerVehicleDetailUIDTO.dateInit,
        selectedHourInit: this.customerVehicleDetailUIDTO.selectedHourInit,
        dateEnd: this.customerVehicleDetailUIDTO.dateEnd,
        selectedHourEnd: this.customerVehicleDetailUIDTO.selectedHourEnd,
        selectCustomerAddressDelivery: this.customerVehicleDetailUIDTO.selectedCustomerAddressDelivery,
        selectCustomerAddressPickUp: this.customerVehicleDetailUIDTO.selectedCustomerAddressPickUp
      }
    };

    // Se o usuário não estiver logado, exibe uma mensagem e redireciona para a página de login
    if (!currentUser) {
      this.messageService.add({
        severity: SeverityConstants.INFO,
        summary: this.customerVehicleDetailUIDTO.info_message_service_Generic,
        detail: this.customerVehicleDetailUIDTO.info_user_not_logged_in_CustomerVehicleDetail
      });

      this.router.navigate(['user/login'], navigationExtras);
      return; // Interrompe a execução se o usuário não estiver logado
    }

    try {
      this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

      // Busca o cliente pelo e-mail do usuário atual
      const resultCustomerFindByEmail = await firstValueFrom(this.customerService.findByEmail(currentUser.email).pipe(first()));

      if (resultCustomerFindByEmail.status === 200 && resultCustomerFindByEmail.body) {
        const customer = resultCustomerFindByEmail.body;

        // Verifica se todos os campos de validação do cliente estão preenchidos
        if (currentUser.photoValidated &&
            customer.phoneValidated &&
            customer.emailValidated &&
            customer.identityNumberValidated &&
            customer.driverLicenseValidated) {
          this.router.navigate(['checkout'], navigationExtras); // Navega para a página de checkout se todas as validações estiverem completas
        } else {
          // Se alguma validação estiver ausente, exibe uma mensagem de aviso
          this.messageService.add({
            severity: SeverityConstants.WARN,
            summary: this.customerVehicleDetailUIDTO.warn_message_service_Generic,
            detail: this.customerVehicleDetailUIDTO.warn_customer_not_validated_CustomerVehicleDetail
          });
        }
      }
    } catch (error: any) {
      // Lida com erros diferentes baseados no status do erro
      if (error.status === 404) {
        this.router.navigate(['customer/customer-validation'], navigationExtras); // Navega para a página de validação do cliente se o erro for 404
      } 
      
      if (error.status === 500) {
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: this.customerVehicleDetailUIDTO.error_message_service_Generic,
          detail: error.toString() // Exibe a mensagem de erro se o erro for 500
        });
      }
    } finally {
      this.ngxSpinnerService.hide(); // Esconde o spinner de carregamento.
    }
  }
}