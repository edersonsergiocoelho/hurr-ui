import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { DecimalPipe, Location } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { HomeSearchCarsDetailUIDTO } from './dto/home-search-cars-detail-ui.dto';

// Service
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

const directionsService = new google.maps.DirectionsService();

@Component({
  selector: 'app-home-search-cars-detail',
  templateUrl: './home-search-cars-detail.component.html',
  styleUrls: ['./home-search-cars-detail.component.css'],
})
export class HomeSearchCarsDetailComponent implements AfterViewInit, OnInit  {

  homeSearchCarsDetailUIDTO: HomeSearchCarsDetailUIDTO;
  @ViewChild('searchInputPlace', { static: true }) searchInputPlace!: ElementRef<HTMLInputElement>;

  dateInit: Date;
  dateEnd: Date;
  today: Date;

  dateFormat = 'dd/mm/yy';

  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  place: any;

  center: google.maps.LatLngLiteral = {lat: -23.7189106, lng: -46.8551999};
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map: any;
  zoom = 14;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  markers: google.maps.marker.AdvancedMarkerElement[] = [];

  constructor(private location: Location,
              private router: Router,
              private ngZone: NgZone,
              private decimalPipe: DecimalPipe,
              private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
              private fileService: FileService,
              private messageService: MessageService,
              private ngxSpinnerService: NgxSpinnerService,
              private customerVehicleService: CustomerVehicleService,
              private customerVehicleReviewService: CustomerVehicleReviewService,
              private translateService: TranslateService,
              private vehicleBrandService: VehicleBrandService,
              private vehicleCategoryService: VehicleCategoryService,
              private vehicleService: VehicleService,
              private vehicleModelService: VehicleModelService) {

    const state = location.getState() as any;
    
    if (state != null) {

      if (state.place == null) {
        this.router.navigate(['']);
      }

      this.place = JSON.parse(state.place);
      this.dateInit = state.dateInit;
      this.selectedHourInit = state.selectedHourInit;
      this.dateEnd = state.dateEnd;
      this.selectedHourEnd = state.selectedHourEnd;
    }
  }

  ngOnInit(): void {

    this.resetRegisterForm();

    const autocomplete = new google.maps.places.Autocomplete(this.searchInputPlace.nativeElement);

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.place = autocomplete.getPlace();
    
        if (!this.place || !this.place.geometry) {
          console.error("Localização não encontrada para o endereço fornecido");
          return;
        }

        this.getGeocoderLatitudeLongitude();
    
      });
    });
  }

  ngAfterViewInit(): void {
    this.map = document.getElementById("map");
    this.initializeMap();
  }

  resetRegisterForm () {

    this.homeSearchCarsDetailUIDTO = new HomeSearchCarsDetailUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      // Carregar as traduções usando firstValueFrom
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));
  
      // Atribuindo valores após as promessas serem resolvidas
      this.homeSearchCarsDetailUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.homeSearchCarsDetailUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.homeSearchCarsDetailUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.homeSearchCarsDetailUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];

      const [vehicleBrandServiceFindAll, vehicleCategoryServiceFindAll] = await Promise.all([
        firstValueFrom(this.vehicleBrandService.getAllVehicleBrands().pipe(first())),
        firstValueFrom(this.vehicleCategoryService.getAllVehicleCategories().pipe(first()))
      ]);

      if (vehicleBrandServiceFindAll.status == 200 && vehicleBrandServiceFindAll.body != null) {
        this.homeSearchCarsDetailUIDTO.vehicleBrands = vehicleBrandServiceFindAll.body;

        // Obtendo a foto para cada marca de veículo
        await Promise.all(this.homeSearchCarsDetailUIDTO.vehicleBrands.map(vehicle => this.getFile(vehicle)));
      }
  
      if (vehicleCategoryServiceFindAll.status == 200 && vehicleCategoryServiceFindAll.body != null) {
        this.homeSearchCarsDetailUIDTO.vehicleCategorys = vehicleCategoryServiceFindAll.body;
      }

      if (this.place && this.place.formatted_address) {

        this.searchInputPlace.nativeElement.value = this.place.formatted_address;

        const location = await this.getAsyncGeocoderLatitudeLongitude(this.place.formatted_address);
        if (location !== null) {
          this.homeSearchCarsDetailUIDTO.placeLocationLatitude = location.lat;
          this.homeSearchCarsDetailUIDTO.placeLocationLongitude = location.lng;
        }
      }
  
    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.homeSearchCarsDetailUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    } finally {
      this.ngxSpinnerService.hide();
    }
  }

  private loadKeys(): any {
    const keys = [
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic'
    ];
    return keys;
  }

  initializeMap() {
    const mapOptions = {
      center: this.center,
      zoom: this.zoom,
      mapId: "DEMO_MAP_ID"
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  async onChangeVehicleBrand(vehicleBrand: VehicleBrand) {

    this.ngxSpinnerService.show();

    try {

      const vehicleServiceByBrandId = await firstValueFrom(this.vehicleService.getVehiclesByBrandId(vehicleBrand.vehicleBrandId).pipe(first()));

      if (vehicleServiceByBrandId.status == 200) {
        if (vehicleServiceByBrandId.body != null && vehicleServiceByBrandId.body.length > 0) {
          this.homeSearchCarsDetailUIDTO.vehicles = vehicleServiceByBrandId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async getFile (vehicleBrand: any) {

    try {

      if (vehicleBrand.fileId != null) {

        const fileServiceFindById = await firstValueFrom(this.fileService.findById(vehicleBrand.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {

            vehicleBrand.file = fileServiceFindById.body;
            vehicleBrand.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {

      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  async getFileVehicleBrandFromCustomerVehicle (customerVehicle: any) {

    try {

      if (customerVehicle.vehicle.vehicleBrand.fileId != null) {

        const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.vehicle.vehicleBrand.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {

          customerVehicle.vehicle.vehicleBrand.file = fileServiceFindById.body;
          customerVehicle.vehicle.vehicleBrand.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {

      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  async getFileVehicleCategoryFromCustomerVehicle (customerVehicle: any) {

    try {

      if (customerVehicle.vehicleModel.vehicleCategory.fileId != null) {

        const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.vehicleModel.vehicleCategory.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {

          customerVehicle.vehicleModel.vehicleCategory.file = fileServiceFindById.body;
          customerVehicle.vehicleModel.vehicleCategory.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {

      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  async getFileVehicleFuelTypeFromCustomerVehicle (customerVehicle: any) {

    try {

      if (customerVehicle.vehicleFuelType.fileId != null) {

        const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.vehicleFuelType.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {

          customerVehicle.vehicleFuelType.file = fileServiceFindById.body;
          customerVehicle.vehicleFuelType.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {

      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  async getFileVehicleTransmissionFromCustomerVehicle (customerVehicle: any) {

    try {

      if (customerVehicle.vehicleTransmission.fileId != null) {

        const fileServiceFindById = await firstValueFrom(this.fileService.findById(customerVehicle.vehicleTransmission.fileId).pipe(first()));
        
        if (fileServiceFindById.status == 200 &&
          fileServiceFindById.body != null) {

          customerVehicle.vehicleTransmission.file = fileServiceFindById.body;
          customerVehicle.vehicleTransmission.dataURI = `data:${fileServiceFindById.body.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
        }
      }

    } catch (error: any) {

      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  async onChangeVehicle(vehicle: Vehicle) {

    this.ngxSpinnerService.show();

    try {

      const vehicleModelServiceByVehicleId = await firstValueFrom(this.vehicleModelService.getVehicleModelsByVehicleId(vehicle.vehicleId).pipe(first()));

      if (vehicleModelServiceByVehicleId.status == 200) {
        if (vehicleModelServiceByVehicleId.body != null && vehicleModelServiceByVehicleId.body.length > 0) {
          this.homeSearchCarsDetailUIDTO.vehicleModels = vehicleModelServiceByVehicleId.body;
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  async search(event: DataViewLazyLoadEvent | null) {

    this.ngxSpinnerService.show();

    this.paginate(event);

    let searchCustomerVehicle: CustomerVehicleSearchDTO = new CustomerVehicleSearchDTO();

    if (this.homeSearchCarsDetailUIDTO.selectedVehicle != null) {
      searchCustomerVehicle.vehicleId = this.homeSearchCarsDetailUIDTO.selectedVehicle.vehicleId;
    }

    if (this.homeSearchCarsDetailUIDTO.selectedVehicleModel != null) {
      searchCustomerVehicle.vehicleModelId = this.homeSearchCarsDetailUIDTO.selectedVehicleModel.vehicleModelId;
    }

    if (this.homeSearchCarsDetailUIDTO.selectedVehicleCategory != null) {
      searchCustomerVehicle.vehicleCategoryId = this.homeSearchCarsDetailUIDTO.selectedVehicleCategory.vehicleCategoryId;
    }

    // Extrair o país
    const country = this.place.address_components.find(component => component.types.includes('country'));
    const countryName = country ? country.long_name : '';
    searchCustomerVehicle.countryName = countryName;

    // Extrair o estado (administrative_area_level_1)
    const state = this.place.address_components.find(component => component.types.includes('administrative_area_level_1'));
    const stateName = state ? state.long_name : '';
    searchCustomerVehicle.stateName = stateName;

    // Extrair a cidade (administrative_area_level_2)
    const city = this.place.address_components.find(component => component.types.includes('administrative_area_level_2'));
    const cityName = city ? city.long_name : '';
    searchCustomerVehicle.cityName = cityName;

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

      const customerVehicleServiceSearchPage: any = await firstValueFrom(
        this.customerVehicleService.searchPage(
          searchCustomerVehicle,
          this.homeSearchCarsDetailUIDTO.page,
          this.homeSearchCarsDetailUIDTO.size,
          this.homeSearchCarsDetailUIDTO.sortDir,
          this.homeSearchCarsDetailUIDTO.sortBy
        ).pipe(first())
      );
  
      this.homeSearchCarsDetailUIDTO.customerVehicles = customerVehicleServiceSearchPage.body.content;
      this.homeSearchCarsDetailUIDTO.totalRecords = customerVehicleServiceSearchPage.body.totalElements;
  
      // Obtendo a foto para cada veículo
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getCoverPhoto(customerVehicle)));
  
      // Calculando a média de avaliações para cada veículo
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getReview(customerVehicle)));

      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getFileVehicleBrandFromCustomerVehicle(customerVehicle)));

      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getFileVehicleCategoryFromCustomerVehicle(customerVehicle)));

      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getFileVehicleFuelTypeFromCustomerVehicle(customerVehicle)));

      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(customerVehicle => this.getFileVehicleTransmissionFromCustomerVehicle(customerVehicle)));

      // Geocodificando os endereços para cada veículo
      await Promise.all(this.homeSearchCarsDetailUIDTO.customerVehicles.map(vehicle => {
        const address = `${vehicle?.addresses[0]?.address?.streetAddress}, ${vehicle?.addresses[0]?.address?.number}, ${vehicle?.addresses[0]?.address?.city?.cityName}, ${vehicle?.addresses[0]?.address?.state?.stateName}`;
        return this.geocodeAddress(address, vehicle);
      }));
  
    } catch (error: any) {

      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }

      this.ngxSpinnerService.hide();

    } finally {
      this.ngxSpinnerService.hide();
    }
  }

  async getCoverPhoto (customerVehicle: any) {

    try {

      const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(customerVehicle.customerVehicleId).pipe(first()));
        
      if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200 &&
        customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
          
        customerVehicle.file = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
        customerVehicle.dataURI = `data:${customerVehicle.file.contentType};base64,${customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body.dataAsByteArray}`;
      }

    } catch (error: any) {

      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  async getReview(customerVehicle: any) {

    try {
      
      const resultCVRFindAllByCustomerVehicleId = await firstValueFrom(this.customerVehicleReviewService.findAllByCustomerVehicleId(customerVehicle.customerVehicleId).pipe(first()));

      if (resultCVRFindAllByCustomerVehicleId.status === 200 && 
          resultCVRFindAllByCustomerVehicleId.body != null) {

        customerVehicle.customersVehiclesReviews = resultCVRFindAllByCustomerVehicleId.body;

        if (customerVehicle.customersVehiclesReviews.length > 0) {
          const totalRating = customerVehicle.customersVehiclesReviews.reduce((sum, review) => sum + review.rating, 0);
          customerVehicle.averageRating = totalRating / customerVehicle.customersVehiclesReviews.length;
        } else {
          customerVehicle.averageRating = null;
        }
      }

    } catch (error: any) {

      if (error.status === 500) {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeSearchCarsDetailUIDTO.error_message_service_Generic, 
          detail: error.error.message 
        });
      }
    }
  }

  geocodeAddress(address: string, customerVehicle: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.initializeMap();
      const geocoder = new google.maps.Geocoder();
  
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results && results[0] && results[0].geometry) {
          const latLng = results[0].geometry.location;
          const position: google.maps.LatLngLiteral = { lat: latLng.lat(), lng: latLng.lng() };
  
          const city = results[0].address_components.find(component => component.types.includes('administrative_area_level_2'));
          const cityName = city ? city.long_name : '';
  
          const neighborhood = results[0].address_components.find(component => component.types.includes('sublocality_level_1'));
          const neighborhoodName = neighborhood ? neighborhood.long_name : '';
  
          customerVehicle.distance = cityName + ", " + neighborhoodName;
  
          if (this.place.geometry.location.lat != null &&
              this.place.geometry.location.lng != null &&
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
  
          const price = `R$ ${customerVehicle.dailyRate}`;

          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: position,
            map: this.map,
            title: price,  // Isso pode ser usado para exibir o preço como uma dica de ferramenta
            content: this.homeSearchCarsDetailUIDTO.getDefaultIcon(price),  // Use o conteúdo gerado pelo ícone diretamente
          });
          
          (marker.element as HTMLElement).dataset['customerVehicleId'] = customerVehicle.customerVehicleId;
          
          // Listener para mouseover
          marker.addListener('mouseover', () => {
            marker.content = this.homeSearchCarsDetailUIDTO.getHighlightedIcon(price),
            marker.map = this.map
          });
          
          // Listener para mouseout
          marker.addListener('mouseout', () => {
            marker.content = this.homeSearchCarsDetailUIDTO.getDefaultIcon(price),
            marker.map = this.map
          });
  
          const content = `<img src="assets/images/vehicle/Corolla.png" alt="Image" class="border-round w-full h-full md:w-16rem md:h-10rem"><br>
          <div class="flex flex-wrap justify-content-between xl:h-2rem mt-auto">
            <p class="text-base flex align-items-center text-900 mt-0 mb-1">
              <i class="pi pi-map mr-2" style="color: red;"></i>
              <span class="font-medium" style="font-size: 0.80em;">${customerVehicle.distance}</span>
            </p>
          </div>
          <strong style="font-size: 1.00em;">Preço:</strong> <strong style="font-size: 1.00em; text-align: right;">R$ ${customerVehicle.dailyRate}</strong><br>
          <strong style="font-size: 0.80em; text-decoration: underline;">R$ ${this.formatDailyRateWithComma(customerVehicle.dailyRate)} / Sem Incluir Impostos E Taxas</strong>`;
  
          const infoWindow = new google.maps.InfoWindow({
            content: content,
          });
  
          marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
          });
  
          this.markers.push(marker);
          this.markerPositions.push(position);
  
          resolve();
        } else {
          console.error('Geocodificação falhou:', status);
          reject(new Error('Geocodificação falhou'));
        }
      });
    });
  }

  async paginate(event: any) {
    this.homeSearchCarsDetailUIDTO.size = event.rows;
    this.homeSearchCarsDetailUIDTO.page = event.first / event.rows;
  }

  getFilledStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStarsArray(rating: number): number[] {
    const emptyStars = 5 - rating;
    return Array(emptyStars).fill(0);
  }

  exibirMapa(customerVehicle) {
    const customerVehicleId = customerVehicle.customerVehicleId;
    const price = `R$ ${customerVehicle.dailyRate}`;

    this.markers.forEach((marker: google.maps.marker.AdvancedMarkerElement) => {
      const markerCustomerId = (marker.element as HTMLElement).dataset['customerVehicleId'];
      if (markerCustomerId === customerVehicleId) {
        marker.content = this.homeSearchCarsDetailUIDTO.getHighlightedIcon(price);
      }
    });
  }

  desibirMapa(customerVehicle) {
    const customerVehicleId = customerVehicle.customerVehicleId;
    const price = `R$ ${customerVehicle.dailyRate}`;

    this.markers.forEach((marker: google.maps.marker.AdvancedMarkerElement) => {
      const markerCustomerId = (marker.element as HTMLElement).dataset['customerVehicleId'];
      if (markerCustomerId === customerVehicleId) {
        marker.content = this.homeSearchCarsDetailUIDTO.getDefaultIcon(price);
      }
    });
  }

  clickCustomerVehicle(customerVehicle) {

    const navigationExtras: NavigationExtras = {
      state: {
        customerVehicleId: customerVehicle.customerVehicleId,
        place: JSON.stringify(this.place),
        dateInit: this.dateInit,
        selectedHourInit: this.selectedHourInit,
        dateEnd: this.dateEnd,
        selectedHourEnd: this.selectedHourEnd,
      }
    };

    this.router.navigate(['customer-vehicle/detail'], navigationExtras);
  }

  getGeocoderLatitudeLongitude() {

    const address = this.place.formatted_address;

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

    const geocoder = new google.maps.Geocoder();
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results && results[0] && results[0].geometry) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error('Geocodificação falhou:', status);
          reject(new Error('Geocodificação falhou: ' + status));  // Usar reject em caso de falha
        }
      });
    });
  }

  formatDailyRateWithComma(dailyRate: number): string {
    return this.decimalPipe?.transform(dailyRate, '1.2-2')?.replace('.', ',') ?? '';
  }
}