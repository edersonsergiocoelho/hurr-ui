import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { HomeSearchCarsDetailUIDTO } from './dto/home-search-cars-detail-ui.dto';

import { CustomerVehicleService } from '../../../customer-vehicle/service/customer-vehicle.service';
import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';
import { VehicleBrandService } from 'src/app/page/admin/vehicle-brand/service/vehicle-brand.service';
import { VehicleCategoryService } from 'src/app/page/admin/vehicle-category/service/vehicle-category.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';
import { MessageService } from 'primeng/api';
import { CustomerVehicleReviewService } from '../../../customer-vehicle-review/service/customer-vehicle-review.service';
import { CustomerVehicleSearchDTO } from '../../../customer-vehicle/dto/customer-vehicle-search-dto.dto';
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { TranslateService } from '@ngx-translate/core';
import { VehicleBrand } from 'src/app/page/admin/vehicle-brand/entity/vehicle-brand.entity';
import { Vehicle } from 'src/app/page/admin/vehicle/entity/vehicle.entity';
import { FileService } from 'src/app/page/file/service/file.service';
import * as moment from 'moment';

const directionsService = new google.maps.DirectionsService();

@Component({
  selector: 'app-home-search-cars-detail', // Define o seletor do componente para uso em templates.
  templateUrl: './home-search-cars-detail.component.html', // Define o caminho para o template HTML do componente.
  styleUrls: ['./home-search-cars-detail.component.css'], // Define o caminho para os estilos CSS do componente.
})
export class HomeSearchCarsDetailComponent implements OnInit  {

  homeSearchCarsDetailUIDTO: HomeSearchCarsDetailUIDTO; // Define o DTO para manter o estado dos dados da página.
  @ViewChild('searchInputPlace', { static: true }) searchInputPlace!: ElementRef<HTMLInputElement>; // Referência ao campo de entrada de endereço.

  constructor(
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService, // Serviço para manipulação de fotos dos veículos.
    private customerVehicleReviewService: CustomerVehicleReviewService, // Serviço para manipulação de avaliações de veículos.
    private customerVehicleService: CustomerVehicleService, // Serviço para manipulação dos dados dos veículos.
    private fileService: FileService, // Serviço para manipulação de arquivos genéricos.
    private location: Location, // Serviço para acessar o estado de localização.
    private messageService: MessageService, // Serviço para exibição de mensagens.
    private ngxSpinnerService: NgxSpinnerService, // Serviço para exibição de carregamento (spinner).
    private ngZone: NgZone, // Serviço para execução de código fora da zona Angular.
    private router: Router, // Serviço para navegação entre rotas.
    private translateService: TranslateService, // Serviço para tradução de mensagens.
    private vehicleBrandService: VehicleBrandService, // Serviço para manipulação das marcas de veículos.
    private vehicleCategoryService: VehicleCategoryService, // Serviço para manipulação das categorias de veículos.
    private vehicleModelService: VehicleModelService, // Serviço para manipulação dos modelos de veículos.
    private vehicleService: VehicleService // Serviço para manipulação dos dados dos veículos.
  ) {

    this.homeSearchCarsDetailUIDTO = new HomeSearchCarsDetailUIDTO(); // Inicializa o DTO para a página.

    this.homeSearchCarsDetailUIDTO.today = moment().toDate(); // Define a data atual no DTO.

    const state = location.getState() as any; // Obtém o estado da localização atual da navegação.

    if (state != null) {

      if (state.place == null) {
        this.router.navigate(['']); // Redireciona para a página inicial se o local não estiver definido.
      }

      this.homeSearchCarsDetailUIDTO.place = JSON.parse(state.place); // Define o local no DTO.
      this.homeSearchCarsDetailUIDTO.dateInit = state.dateInit; // Define a data inicial no DTO.
      this.homeSearchCarsDetailUIDTO.selectedHourInit = state.selectedHourInit; // Define a hora inicial no DTO.
      this.homeSearchCarsDetailUIDTO.dateEnd = state.dateEnd; // Define a data final no DTO.
      this.homeSearchCarsDetailUIDTO.selectedHourEnd = state.selectedHourEnd; // Define a hora final no DTO.
    }
  }

  ngOnInit(): void {
    this.resetRegisterForm(); // Chama o método para inicializar o formulário.
  }

  async resetRegisterForm () {

    if (this.homeSearchCarsDetailUIDTO.place && this.homeSearchCarsDetailUIDTO.place.formatted_address) {

      this.searchInputPlace.nativeElement.value = this.homeSearchCarsDetailUIDTO.place.formatted_address; // Define o valor do campo de entrada com o endereço formatado.

      const location = await this.getAsyncGeocoderLatitudeLongitude(this.homeSearchCarsDetailUIDTO.place.formatted_address); // Obtém a latitude e longitude do endereço.
      if (location !== null) {
        this.homeSearchCarsDetailUIDTO.placeLocationLatitude = location.lat; // Define a latitude no DTO.
        this.homeSearchCarsDetailUIDTO.placeLocationLongitude = location.lng; // Define a longitude no DTO.
      }
    }

    this.asyncCallFunctions(); // Chama a função assíncrona para carregar os dados.
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {

      // Carregar as traduções usando firstValueFrom
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));
  
      // Atribuindo valores após as promessas serem resolvidas
      this.homeSearchCarsDetailUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic']; // Define a mensagem de aviso no DTO.
      this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic']; // Define a mensagem de erro no DTO.
      this.homeSearchCarsDetailUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic']; // Define a mensagem de informação no DTO.
      this.homeSearchCarsDetailUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic']; // Define a mensagem de sucesso no DTO.
      this.homeSearchCarsDetailUIDTO.currency_Generic = translations['currency_Generic']; // Define o símbolo da moeda no DTO.
      this.homeSearchCarsDetailUIDTO.daily_rate_HomeSearchCarsDetail = translations['daily_rate_HomeSearchCarsDetail']; // Define a taxa diária no DTO.
      this.homeSearchCarsDetailUIDTO.excluding_taxes_and_fees_HomeSearchCarsDetail = translations['excluding_taxes_and_fees_HomeSearchCarsDetail']; // Define a mensagem de exclusão de impostos e taxas no DTO.
      this.homeSearchCarsDetailUIDTO.span_no_image_Generic = translations['span_no_image_Generic']; // Define a mensagem de sem imagem no DTO.
      
      // Carregar os outros métodos normalmente
      this.loadPlace(); // Carrega o local.
      this.loadDateInit();
      this.loadHoursInit();

      const [vehicleBrandServiceFindAll, vehicleCategoryServiceFindAll] = await Promise.all([
        firstValueFrom(this.vehicleBrandService.findAll().pipe(first())), // Obtém todas as marcas de veículos.
        firstValueFrom(this.vehicleCategoryService.getAllVehicleCategories().pipe(first())) // Obtém todas as categorias de veículos.
      ]);

      if (vehicleBrandServiceFindAll.status == 200 && vehicleBrandServiceFindAll.body != null) {
        this.homeSearchCarsDetailUIDTO.vehicleBrands = vehicleBrandServiceFindAll.body; // Define as marcas de veículos no DTO.

        for (const vehicleBrand of this.homeSearchCarsDetailUIDTO.vehicleBrands) {
          if (vehicleBrand.file != null) {
            vehicleBrand.file.dataURI = `data:${vehicleBrand.file.contentType};base64,${vehicleBrand.file.dataAsByteArray}`; // Define o URI dos dados para a foto
          }
        }
      }
  
      if (vehicleCategoryServiceFindAll.status == 200 && vehicleCategoryServiceFindAll.body != null) {
        this.homeSearchCarsDetailUIDTO.vehicleCategorys = vehicleCategoryServiceFindAll.body; // Define as categorias de veículos no DTO.
      }

      await this.search(null);
  
    } catch (error: any) {
      
      this.messageService.add({
        severity: SeverityConstants.ERROR, // Define o nível de severidade para o erro.
        summary: this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic, // Define o resumo da mensagem de erro.
        detail: error.toString() // Define o detalhe da mensagem de erro.
      });

    } finally {
      this.ngxSpinnerService.hide(); // Oculta o spinner de carregamento.
    }
  }

  private loadKeys(): any {
    // Define as chaves para tradução.
    const keys = [
      'warn_summary_message_service_Generic',
      'error_summary_message_service_Generic',
      'info_summary_message_service_Generic',
      'success_summary_message_service_Generic',
      'currency_Generic',
      'daily_rate_HomeSearchCarsDetail',
      'excluding_taxes_and_fees_HomeSearchCarsDetail',
      'span_no_image_Generic'
    ];
    return keys;
  }

  loadPlace() {
    // Inicializa o autocomplete do Google Maps para o campo de entrada.
    const autocompleteGoogle = new google.maps.places.Autocomplete(this.searchInputPlace.nativeElement);
    autocompleteGoogle.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.homeSearchCarsDetailUIDTO.place = autocompleteGoogle.getPlace(); // Obtém o local selecionado.

        if (!this.homeSearchCarsDetailUIDTO.place || !this.homeSearchCarsDetailUIDTO.place.geometry) {
          console.error("Localização não encontrada para o endereço fornecido"); // Exibe um erro se o local não for encontrado.
          return;
        }

        this.getGeocoderLatitudeLongitude(); // Obtém a latitude e longitude para o local.
      });
    });  
  }

  loadDateInit() {

    const today = moment().toDate();
  
    // Defina `today` como a data mínima
    this.homeSearchCarsDetailUIDTO.today = today;
  
    // Inicialize `dateInit` com a data de hoje se estiver nulo ou for anterior à data mínima
    if (!this.homeSearchCarsDetailUIDTO.dateInit || moment(this.homeSearchCarsDetailUIDTO.dateInit).isBefore(today)) {
      this.homeSearchCarsDetailUIDTO.dateInit = today;
    }
  }

  loadHoursInit() {

    const now = new Date();
    const isToday = this.isSameDay(this.homeSearchCarsDetailUIDTO.dateInit, this.homeSearchCarsDetailUIDTO.today);

    // Verifica se o horário atual é 23:30 ou mais tarde
    if (now.getHours() === 23 && now.getMinutes() >= 30) {
      this.homeSearchCarsDetailUIDTO.dateInit = new Date();
      this.homeSearchCarsDetailUIDTO.dateInit.setDate(this.homeSearchCarsDetailUIDTO.dateInit.getDate() + 1);
    }

    // Calcula hoursInit com base na dataInit atualizada
    this.homeSearchCarsDetailUIDTO.hoursInit = Array.from({ length: 48 }, (_, index) => {
      const hour = Math.floor(index / 2);
      const minute: number = index % 2 === 0 ? 0 : 30;
      const hourStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      // Mostra todas as horas se dateInit for amanhã ou mais tarde
      if (this.homeSearchCarsDetailUIDTO.dateInit > now || !isToday) {
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

    if (this.homeSearchCarsDetailUIDTO.hoursInit != null && this.homeSearchCarsDetailUIDTO.hoursInit.length > 0) {
      this.homeSearchCarsDetailUIDTO.dateInit = this.homeSearchCarsDetailUIDTO.dateInit;
      this.homeSearchCarsDetailUIDTO.selectedHourInit = this.homeSearchCarsDetailUIDTO.hoursInit[0];
    }
  }

  // Método auxiliar para verificar se duas datas são do mesmo dia
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
  }

  initializeMap() {
    // Inicializa o mapa com o zoom e centro definidos no DTO.
    this.homeSearchCarsDetailUIDTO.map = new google.maps.Map(document.getElementById('map') as HTMLElement,  {
      zoom: this.homeSearchCarsDetailUIDTO.zoom,
      center: this.homeSearchCarsDetailUIDTO.center,
      mapId: "MAP_HURR", // Define o ID do mapa.
    });
  }

  // Função assíncrona que é chamada quando a marca do veículo é alterada.
  async onChangeVehicleBrand(vehicleBrand: VehicleBrand) {

    // Exibe o indicador de carregamento.
    this.ngxSpinnerService.show();

    try {
      // Solicita ao serviço os veículos relacionados à marca selecionada.
      const vehicleServiceByBrandId = await firstValueFrom(this.vehicleService.getVehiclesByBrandId(vehicleBrand.vehicleBrandId).pipe(first()));

      if (vehicleServiceByBrandId.status == 200) {
        // Se a resposta for bem-sucedida e contiver veículos, atribui-os ao DTO.
        if (vehicleServiceByBrandId.body != null && vehicleServiceByBrandId.body.length > 0) {
          this.homeSearchCarsDetailUIDTO.vehicles = vehicleServiceByBrandId.body;
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe uma mensagem de erro.
      if (error.status == 500) {
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    } finally {
      this.ngxSpinnerService.hide(); // Oculta o spinner de carregamento.
    }
  }

  // Função assíncrona que busca o arquivo associado a uma marca de veículo.
  async getFile(vehicleBrand: any) {

    try {
      // Verifica se a marca de veículo tem um ID de arquivo associado.
      if (vehicleBrand.fileId != null) {
        // Solicita ao serviço o arquivo com base no ID.
        const fileServiceFindById = await firstValueFrom(this.fileService.findById(vehicleBrand.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {
            // Se a resposta for bem-sucedida, atribui o arquivo e o Data URI ao veículo.
            vehicleBrand.file = fileServiceFindById.body;
            vehicleBrand.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe uma mensagem de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  // Função assíncrona que busca o arquivo associado a uma categoria de veículo em um veículo de cliente.
  async getFileVehicleCategoryFromCustomerVehicle(customerVehicle: any) {

    try {
      // Verifica se o veículo de cliente tem um ID de arquivo para a categoria do veículo.
      if (customerVehicle.vehicleModel.vehicleCategory.fileId != null) {
        // Solicita ao serviço o arquivo com base no ID.
        const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.vehicleModel.vehicleCategory.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {
          // Se a resposta for bem-sucedida, atribui o arquivo e o Data URI à categoria do veículo do cliente.
          customerVehicle.vehicleModel.vehicleCategory.file = fileServiceFindById.body;
          customerVehicle.vehicleModel.vehicleCategory.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe uma mensagem de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  // Função assíncrona que busca o arquivo associado a um tipo de combustível de veículo em um veículo de cliente.
  async getFileVehicleFuelTypeFromCustomerVehicle(customerVehicle: any) {

    try {
      // Verifica se o veículo de cliente tem um ID de arquivo para o tipo de combustível.
      if (customerVehicle.vehicleFuelType.fileId != null) {
        // Solicita ao serviço o arquivo com base no ID.
        const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.vehicleFuelType.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {
          // Se a resposta for bem-sucedida, atribui o arquivo e o Data URI ao tipo de combustível do veículo do cliente.
          customerVehicle.vehicleFuelType.file = fileServiceFindById.body;
          customerVehicle.vehicleFuelType.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe uma mensagem de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  // Função assíncrona que busca o arquivo associado a uma transmissão de veículo em um veículo de cliente.
  async getFileVehicleTransmissionFromCustomerVehicle(customerVehicle: any) {

    try {
      // Verifica se o veículo de cliente tem um ID de arquivo para a transmissão do veículo.
      if (customerVehicle.vehicleTransmission.fileId != null) {
        // Solicita ao serviço o arquivo com base no ID.
        const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.vehicleTransmission.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {
          // Se a resposta for bem-sucedida, atribui o arquivo e o Data URI à transmissão do veículo do cliente.
          customerVehicle.vehicleTransmission.file = fileServiceFindById.body;
          customerVehicle.vehicleTransmission.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe uma mensagem de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  // Função assíncrona que é chamada quando um veículo é alterado.
  async onChangeVehicle(vehicle: Vehicle) {

    // Exibe o indicador de carregamento.
    this.ngxSpinnerService.show();

    try {
      // Solicita ao serviço os modelos de veículos relacionados ao veículo selecionado.
      const vehicleModelServiceByVehicleId = await firstValueFrom(this.vehicleModelService.getVehicleModelsByVehicleId(vehicle.vehicleId).pipe(first()));

      if (vehicleModelServiceByVehicleId.status == 200) {
        // Se a resposta for bem-sucedida e contiver modelos de veículos, atribui-os ao DTO.
        if (vehicleModelServiceByVehicleId.body != null && vehicleModelServiceByVehicleId.body.length > 0) {
          this.homeSearchCarsDetailUIDTO.vehicleModels = vehicleModelServiceByVehicleId.body;
        }
      }

    } catch (error: any) {
      // Se ocorrer um erro, exibe uma mensagem de erro.
      if (error.status == 500) {
        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic,
          detail: error.toString()
        });
      }
    } finally {
      this.ngxSpinnerService.hide(); // Oculta o spinner de carregamento.
    }
  }

  // Função assíncrona que realiza a busca de veículos com base no evento de carregamento.
  async search(event: DataViewLazyLoadEvent | null) {

    // Exibe o indicador de carregamento.
    this.ngxSpinnerService.show();

    // Inicializa o mapa.
    this.initializeMap();

    // Pagina os resultados com base no evento.
    this.paginate(event);

    // Cria um DTO de busca de veículos de cliente.
    let searchCustomerVehicle: CustomerVehicleSearchDTO = new CustomerVehicleSearchDTO();

    // Define os parâmetros de busca com base na seleção atual.
    if (this.homeSearchCarsDetailUIDTO.selectedVehicle != null) {
      searchCustomerVehicle.vehicleId = this.homeSearchCarsDetailUIDTO.selectedVehicle.vehicleId;
    }

    if (this.homeSearchCarsDetailUIDTO.selectedVehicleModel != null) {
      searchCustomerVehicle.vehicleModelId = this.homeSearchCarsDetailUIDTO.selectedVehicleModel.vehicleModelId;
    }

    if (this.homeSearchCarsDetailUIDTO.selectedVehicleCategory != null) {
      searchCustomerVehicle.vehicleCategoryId = this.homeSearchCarsDetailUIDTO.selectedVehicleCategory.vehicleCategoryId;
    }

    // Obtém e define as informações de localização.
    const country = this.homeSearchCarsDetailUIDTO.place.address_components.find(component => component.types.includes('country'));
    const countryName = country ? country.long_name : '';
    searchCustomerVehicle.countryName = countryName;

    const state = this.homeSearchCarsDetailUIDTO.place.address_components.find(component => component.types.includes('administrative_area_level_1'));
    const stateName = state ? state.long_name : '';
    searchCustomerVehicle.stateName = stateName;

    const city = this.homeSearchCarsDetailUIDTO.place.address_components.find(component => component.types.includes('administrative_area_level_2'));
    const cityName = city ? city.long_name : '';
    searchCustomerVehicle.cityName = cityName;

    // Configura a ordenação dos resultados.
    if (event && event.sortField) {
      this.homeSearchCarsDetailUIDTO.sortBy = event.sortField;
    }
    if (event && event.sortOrder) {
      if(event.sortOrder == 1) {
        this.homeSearchCarsDetailUIDTO.sortDir = "DESC";
      } else if(event.sortOrder == -1) {
        this.homeSearchCarsDetailUIDTO.sortDir = "ASC";
      }
    }
  
    try {
      // Solicita a busca de veículos de cliente com base nos parâmetros definidos.
      const customerVehicleServiceSearchPage: any = await firstValueFrom(
        this.customerVehicleService.searchPage(
          searchCustomerVehicle,
          this.homeSearchCarsDetailUIDTO.page,
          this.homeSearchCarsDetailUIDTO.size,
          this.homeSearchCarsDetailUIDTO.sortDir,
          this.homeSearchCarsDetailUIDTO.sortBy
        ).pipe(first())
      );

      // Atualiza os dados de veículos de cliente no DTO com base na resposta do serviço.
      this.homeSearchCarsDetailUIDTO.customerVehicles = customerVehicleServiceSearchPage.body.content;
      this.homeSearchCarsDetailUIDTO.totalRecords = customerVehicleServiceSearchPage.body.totalElements;
 
      // Busca e processa as fotos de capa dos veículos.
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getCoverPhoto(customerVehicle)));
  
      // Busca e processa as avaliações dos veículos.
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getReview(customerVehicle)));

      // Busca e processa os arquivos associados à marca dos veículos.
      for (const customerVehicle of this.homeSearchCarsDetailUIDTO.customerVehicles) {
        if (customerVehicle.vehicle.vehicleBrand.file != null) {
          customerVehicle.vehicle.vehicleBrand.file.dataURI = `data:${customerVehicle.vehicle.vehicleBrand.file.contentType};base64,${customerVehicle.vehicle.vehicleBrand.file.dataAsByteArray}`; // Define o URI dos dados para a foto
        }
      }

      // Busca e processa os arquivos associados à categoria dos veículos.
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getFileVehicleCategoryFromCustomerVehicle(customerVehicle)));

      // Busca e processa os arquivos associados ao tipo de combustível dos veículos.
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getFileVehicleFuelTypeFromCustomerVehicle(customerVehicle)));

      // Busca e processa os arquivos associados à transmissão dos veículos.
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getFileVehicleTransmissionFromCustomerVehicle(customerVehicle)));
  
      // Realiza a geocodificação dos endereços dos veículos.
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(vehicle => {
        const address = `${vehicle?.addresses[0]?.address?.streetAddress}, ${vehicle?.addresses[0]?.address?.number}, ${vehicle?.addresses[0]?.address?.city?.cityName}, ${vehicle?.addresses[0]?.address?.state?.stateName}`;
        return this.geocodeAddress(address, vehicle);
      }));

    } catch (error: any) {

      // Trata erros específicos e exibe mensagens de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic, 
          detail: error.error.message 
        });
      }

    } finally {
      // Garante que o indicador de carregamento seja ocultado, independentemente do resultado.
      this.ngxSpinnerService.hide();
    }
  }

  // Função assíncrona que busca a foto de capa de um veículo de cliente.
  async getCoverPhoto (customerVehicle: any) {

    try {
      // Solicita a foto de capa associada ao veículo de cliente.
      const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(customerVehicle.customerVehicleId).pipe(first()));
        
      if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200 &&
        customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
          
        // Se a resposta for bem-sucedida, atribui o arquivo e o Data URI ao veículo.
        customerVehicle.file = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
        customerVehicle.dataURI = `data:${customerVehicle.file.contentType};base64,${customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body.dataAsByteArray}`;
      }

    } catch (error: any) {

      // Trata erros específicos e exibe mensagens de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  // Função assíncrona que busca as avaliações de um veículo de cliente.
  async getReview(customerVehicle: any) {

    try {
      // Solicita todas as avaliações associadas ao veículo de cliente.
      const resultCVRFindAllByCustomerVehicleId = await firstValueFrom(this.customerVehicleReviewService.findAllByCustomerVehicleId(customerVehicle.customerVehicleId).pipe(first()));

      if (resultCVRFindAllByCustomerVehicleId.status === 200 && 
          resultCVRFindAllByCustomerVehicleId.body != null) {

        // Se a resposta for bem-sucedida, atribui as avaliações e calcula a média de avaliações.
        customerVehicle.customersVehiclesReviews = resultCVRFindAllByCustomerVehicleId.body;

        if (customerVehicle.customersVehiclesReviews.length > 0) {
          const totalRating = customerVehicle.customersVehiclesReviews.reduce((sum, review) => sum + review.rating, 0);
          customerVehicle.averageRating = totalRating / customerVehicle.customersVehiclesReviews.length;
        } else {
          customerVehicle.averageRating = null;
        }
      }

    } catch (error: any) {

      // Trata erros específicos e exibe mensagens de erro.
      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_summary_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  geocodeAddress(address: string, customerVehicle: any): Promise<void> {
    // Função para geocodificar um endereço e adicionar um marcador no mapa.
    return new Promise((resolve, reject) => {
      // Instancia o geocodificador do Google Maps.
      const geocoder = new google.maps.Geocoder();
  
      // Realiza a geocodificação do endereço.
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results && results[0] && results[0].geometry) {

          const latLng = results[0].geometry.location;
          const position: google.maps.LatLngLiteral = { lat: latLng.lat(), lng: latLng.lng() };
  
          // Extrai informações adicionais do endereço.
          const city = results[0].address_components.find(component => component.types.includes('administrative_area_level_2'));
          const cityName = city ? city.long_name : '';
  
          const neighborhood = results[0].address_components.find(component => component.types.includes('sublocality_level_1'));
          const neighborhoodName = neighborhood ? neighborhood.long_name : '';
  
          // Atualiza a distância com o nome da cidade e do bairro.
          customerVehicle.distance = cityName + ", " + neighborhoodName;
  
          // Se as coordenadas da localização do lugar e do endereço são válidas,
          // calcula a rota e adiciona a distância ao veículo.
          if (this.homeSearchCarsDetailUIDTO.place.geometry.location.lat != null &&
              this.homeSearchCarsDetailUIDTO.place.geometry.location.lng != null &&
              latLng.lat() != null &&
              latLng.lng() != null) {
  
            directionsService.route(
              {
                origin: { lat: this.homeSearchCarsDetailUIDTO.placeLocationLatitude, lng: this.homeSearchCarsDetailUIDTO.placeLocationLongitude },
                destination: { lat: latLng.lat(), lng: latLng.lng() },
                travelMode: google.maps.TravelMode.DRIVING,
                optimizeWaypoints: true
              },
              (response, status) => {
                if (status === 'OK' && response) {
                  const route = response.routes[0];
                  if (route && route.legs && route.legs.length > 0 && route.legs[0].distance) {
                    customerVehicle.distance = customerVehicle.distance + " º " + route.legs[0].distance.text;
                  }
                } else {
                  console.error('Não foi possível encontrar uma rota adequada:', status);
                }
              }
            );
          }
  
          // Formata o valor diário do veículo.
          const price = `${this.homeSearchCarsDetailUIDTO.currency_Generic} ${customerVehicle.dailyRate}`;
          const formattedDailyRate = customerVehicle.dailyRate.toFixed(2);
  
          // Cria e configura o marcador no mapa.
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: position,
            map: this.homeSearchCarsDetailUIDTO.map,
            title: price,  // Título do marcador, que pode ser usado como dica de ferramenta.
            content: this.homeSearchCarsDetailUIDTO.getDefaultIcon(price),  // Ícone padrão do marcador.
          });
  
          // Adiciona um dataset para identificar o veículo associado ao marcador.
          (marker.element as HTMLElement).dataset['customerVehicleId'] = customerVehicle.customerVehicleId;
  
          // Adiciona listeners para eventos de mouseover e mouseout.
          marker.addListener('mouseover', () => {
            marker.content = this.homeSearchCarsDetailUIDTO.getHighlightedIcon(price),
            marker.map = this.homeSearchCarsDetailUIDTO.map
          });
  
          marker.addListener('mouseout', () => {
            marker.content = this.homeSearchCarsDetailUIDTO.getDefaultIcon(price),
            marker.map = this.homeSearchCarsDetailUIDTO.map
          });
  
          // Cria o conteúdo da janela de informações do marcador.
          const content = `
          ${customerVehicle.dataURI ? 
            `<img src="${customerVehicle.dataURI}" alt="Customer Vehicle Image" class="border-round w-full h-full md:w-16rem md:h-10rem">` 
            : 
            `<div class="border-round w-full h-full md:w-16rem md:h-10rem" style="background-color: #f3f4f6;">
              <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: black; font-weight: bold; font-size: 12px; text-align: center;">
                ${this.homeSearchCarsDetailUIDTO.span_no_image_Generic}
              </span>
            </div>`
          }
          <div class="flex flex-wrap justify-content-between xl:h-2rem mt-auto">
            <p class="text-base flex align-items-center text-900 mt-0 mb-1">
              <i class="pi pi-map mr-2" style="color: red;"></i>
              <span class="font-medium" style="font-size: 0.80em;">${customerVehicle.distance}</span>
            </p>
          </div>
          <strong style="font-size: 1.00em;">${this.homeSearchCarsDetailUIDTO.daily_rate_HomeSearchCarsDetail}</strong> 
          <strong style="font-size: 1.00em; text-align: right;">${this.homeSearchCarsDetailUIDTO.currency_Generic} ${formattedDailyRate}</strong><br>
          <strong style="font-size: 0.80em; text-decoration: underline;">${this.homeSearchCarsDetailUIDTO.currency_Generic} ${formattedDailyRate} / ${this.homeSearchCarsDetailUIDTO.excluding_taxes_and_fees_HomeSearchCarsDetail}</strong>`;
  
          // Cria e adiciona uma janela de informações ao marcador.
          const infoWindow = new google.maps.InfoWindow({
            content: content,
          });
  
          marker.addListener('click', () => {
            infoWindow.open(this.homeSearchCarsDetailUIDTO.map, marker);
          });
  
          // Adiciona o marcador e a posição à lista de marcadores.
          this.homeSearchCarsDetailUIDTO.markers.push(marker);
          this.homeSearchCarsDetailUIDTO.markerPositions.push(position);
  
          resolve();
        } else {
          console.error('Geocodificação falhou:', status);
          reject(new Error('Geocodificação falhou'));
        }
      });
    })
  }
  
  async paginate(event: any) {
    // Atualiza a paginação com base no evento de carregamento de dados.
    if (event != null) {
      this.homeSearchCarsDetailUIDTO.size = event.rows;
      this.homeSearchCarsDetailUIDTO.page = event.first / event.rows;
    }
  }

  getFilledStarsArray(rating: number): number[] {
    // Retorna um array com a quantidade de estrelas preenchidas com base na classificação.
    return Array(rating).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    // Retorna um array com a quantidade de estrelas vazias com base na classificação.
    const emptyStars = 5 - rating;
    return Array(emptyStars).fill(0);
  }
  
  exibirMapa(customerVehicle) {
    // Atualiza o ícone do marcador do veículo selecionado para o ícone destacado.
    const customerVehicleId = customerVehicle.customerVehicleId;
    const price = `${this.homeSearchCarsDetailUIDTO.currency_Generic} ${customerVehicle.dailyRate}`;

    this.homeSearchCarsDetailUIDTO.markers.forEach((marker: google.maps.marker.AdvancedMarkerElement) => {
      const markerCustomerId = (marker.element as HTMLElement).dataset['customerVehicleId'];
      if (markerCustomerId === customerVehicleId) {
        marker.content = this.homeSearchCarsDetailUIDTO.getHighlightedIcon(price);
      }
    });
  }
  
  desibirMapa(customerVehicle) {
    // Restaura o ícone do marcador do veículo selecionado para o ícone padrão.
    const customerVehicleId = customerVehicle.customerVehicleId;
    const price = `${this.homeSearchCarsDetailUIDTO.currency_Generic} ${customerVehicle.dailyRate}`;

    this.homeSearchCarsDetailUIDTO.markers.forEach((marker: google.maps.marker.AdvancedMarkerElement) => {
      const markerCustomerId = (marker.element as HTMLElement).dataset['customerVehicleId'];
      if (markerCustomerId === customerVehicleId) {
        marker.content = this.homeSearchCarsDetailUIDTO.getDefaultIcon(price);
      }
    });
  }
  
  clickCustomerVehicle(customerVehicle) {
    // Navega para a página de detalhes do veículo com informações adicionais.
    const navigationExtras: NavigationExtras = {
      state: {
        customerVehicleId: customerVehicle.customerVehicleId,
        place: JSON.stringify(this.homeSearchCarsDetailUIDTO.place),
        dateInit: this.homeSearchCarsDetailUIDTO.dateInit,
        selectedHourInit: this.homeSearchCarsDetailUIDTO.selectedHourInit,
        dateEnd: this.homeSearchCarsDetailUIDTO.dateEnd,
        selectedHourEnd: this.homeSearchCarsDetailUIDTO.selectedHourEnd,
      }
    };

    this.router.navigate(['customer-vehicle/detail'], navigationExtras);
  }
  
  getGeocoderLatitudeLongitude() {
    // Obtém a latitude e longitude da localização do lugar.
    const address = this.homeSearchCarsDetailUIDTO.place.formatted_address;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results[0] && results[0].geometry) {
        const location = results[0].geometry.location;
        this.homeSearchCarsDetailUIDTO.placeLocationLatitude = location.lat()
        this.homeSearchCarsDetailUIDTO.placeLocationLongitude = location.lng()
      } else {
        console.error('Geocodificação falhou:', status);
      }
    });
  }
  
  async getAsyncGeocoderLatitudeLongitude(address: string): Promise<{ lat: number; lng: number } | null> {
    // Obtém a latitude e longitude de um endereço de forma assíncrona.
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results && results[0] && results[0].geometry) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error('Geocodificação falhou:', status);
          reject(new Error('Geocodificação falhou: ' + status));  // Usa reject em caso de falha
        }
      });
    });
  }
}  