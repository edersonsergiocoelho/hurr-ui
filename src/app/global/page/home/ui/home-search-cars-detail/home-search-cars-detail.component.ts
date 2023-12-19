import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { SearchCustomerVehicle } from '../../../customer-vehicle/dto/search-customer-vehicle.dto';
import { Observable, catchError, first, firstValueFrom, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe, Location } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HomeSearchCarsDetailUIDTO } from './dto/home-search-cars-detail-ui.dto';

// Service
import { CustomerVehicleService } from '../../../customer-vehicle/service/customer-vehicle.service';
import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';
import { VehicleBrandService } from 'src/app/page/admin/vehicle-brand/service/vehicle-brand.service';
import { VehicleCategoryService } from 'src/app/page/admin/vehicle-category/service/vehicle-category.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';
import { HomeUIService } from '../../service/home-ui/home-ui.service';

const directionsService = new google.maps.DirectionsService();

@Component({
  selector: 'app-home-search-cars-detail',
  templateUrl: './home-search-cars-detail.component.html',
  styleUrls: ['./home-search-cars-detail.component.css'],
})
export class HomeSearchCarsDetailComponent implements AfterViewInit, OnInit  {

  homeSearchCarsDetailUIDTO: HomeSearchCarsDetailUIDTO;

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
  markers: google.maps.Marker[] = [];

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private location: Location,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient,
              private ngZone: NgZone,
              private decimalPipe: DecimalPipe,
              private homeUIService: HomeUIService,
              private customerVehicleService: CustomerVehicleService,
              private vehicleBrandService: VehicleBrandService,
              private vehicleCategoryService: VehicleCategoryService,
              private vehicleService: VehicleService,
              private vehicleModelService: VehicleModelService) {

    const state = location.getState() as any;
    
    if (state != null) {

      if (state.place == null) {
        this.homeUIService.updateDivVisibility(false);
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

    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);

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

    //this.ngxSpinnerService.show();

    try {

      const resultGetAllVehicleBrands = await firstValueFrom(this.vehicleBrandService.getAllVehicleBrands().pipe(first()));

      if (resultGetAllVehicleBrands.status == 200) {

        if (resultGetAllVehicleBrands.body != null) {
          this.homeSearchCarsDetailUIDTO.vehiclesBrands = resultGetAllVehicleBrands.body;
        }
      }

    } catch (error) {
      //this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    try {

      const resultGetAllVehicleCategories = await firstValueFrom(this.vehicleCategoryService.getAllVehicleCategories().pipe(first()));

      if (resultGetAllVehicleCategories.status == 200) {

        if (resultGetAllVehicleCategories.body != null) {
          this.homeSearchCarsDetailUIDTO.vehiclesCategorys = resultGetAllVehicleCategories.body;
        }
      }

    } catch (error) {
      //this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.toString() });
    }

    if (this.place && this.place.formatted_address) {

      this.searchInput.nativeElement.value = this.place.formatted_address;

      try {
        const location = await this.getAsyncGeocoderLatitudeLongitude(this.place.formatted_address);
        if (location !== null) {
          this.homeSearchCarsDetailUIDTO.placeLocationLatitude = location.lat;
          this.homeSearchCarsDetailUIDTO.placeLocationLongitude = location.lng;
        }
      } catch (error) {
        console.error('Erro:', error);
      }

      this.search();
    }
  }

  initializeMap() {
    const mapOptions = {
      center: this.center,
      zoom: this.zoom,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  changeBrand(selectedVehicleBrand) {

    this.homeSearchCarsDetailUIDTO.vehicles = [];
    this.homeSearchCarsDetailUIDTO.vehiclesModels = [];

    this.vehicleService.getVehiclesByBrandId(selectedVehicleBrand.vehicleBrandId).subscribe(
      (response) => {
        this.homeSearchCarsDetailUIDTO.vehicles = response.body || [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeVehicle(selectedVehicle) {

    this.homeSearchCarsDetailUIDTO.vehiclesModels = [];

    this.vehicleModelService.getVehicleModelsByVehicleId(selectedVehicle.vehicleId).subscribe(
      (response) => {
        this.homeSearchCarsDetailUIDTO.vehiclesModels = response.body || [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search() {

    this.initializeMap();
    
    let searchCustomerVehicle: SearchCustomerVehicle = new SearchCustomerVehicle();

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

    this.customerVehicleService.searchCustomerVehicles(searchCustomerVehicle).subscribe(
      (response) => {
        this.homeSearchCarsDetailUIDTO.customerVehicles = response.body || [];

        this.homeSearchCarsDetailUIDTO.customerVehicles.forEach((customerVehicle) => {

          const address = `${customerVehicle?.addresses[0]?.address?.streetAddress}, ${customerVehicle?.addresses[0]?.address?.city?.cityName}, ${customerVehicle?.addresses[0]?.address?.state?.stateName}`;
    
          this.geocodeAddress(address, customerVehicle);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  geocodeAddress(address: string, customerVehicle: any) {

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

        const price = `Preço: R$ ${customerVehicle.dailyRate}`;

        const defaultIcon = {
          url: `data:image/svg+xml;charset=UTF-8,
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40">
                  <rect width="100%" height="100%" fill="white" rx="10" ry="10"/>
                  <text x="10" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="black">${price}</text>
                </svg>`,
        };
  
        const highlightedIcon = {
          url: `data:image/svg+xml;charset=UTF-8,
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40">
                  <rect width="100%" height="100%" fill="black" rx="10" ry="10"/>
                  <text x="10" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="white">${price}</text>
                </svg>`,
        };

        const marker: google.maps.Marker = new google.maps.Marker({
          position: position,
          map: this.map,
          icon: defaultIcon,
        });

        // Associando o veículo ao marcador usando a classe Map do JavaScript
        marker.set('customerVehicleId', customerVehicle.customerVehicleId);
 
        marker.addListener('mouseover', () => {
          marker.setIcon(highlightedIcon);
        });
  
        marker.addListener('mouseout', () => {
          marker.setIcon(defaultIcon);
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

        // Adicione o marcador à lista de marcadores
        this.markers.push(marker);

        this.markerPositions.push(position);
      } else {
        console.error('Geocodificação falhou:', status);
      }
    });
  }

  changeMarkerIcon(marker: google.maps.Marker, highlightedIcon: google.maps.Icon) {
    marker.setIcon(highlightedIcon);
  }
  
  // Função para restaurar o ícone padrão do marcador (simulando o mouseout)
  restoreDefaultMarkerIcon(marker: google.maps.Marker, defaultIcon: google.maps.Icon) {
    marker.setIcon(defaultIcon);
  }

  exibirMapa(customerVehicle) {
    const customerVehicleId = customerVehicle.customerVehicleId;

    const price = `Preço: R$ ${customerVehicle.dailyRate}`;
  
    // Percorra todos os marcadores no mapa e encontre o marcador com base no ID do veículo
    this.markers.forEach((marker: google.maps.Marker) => {
      const markerCustomerId = marker.get('customerVehicleId');
      if (markerCustomerId === customerVehicleId) {
  
        const highlightedIcon = {
          url: `data:image/svg+xml;charset=UTF-8,
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40">
                  <rect width="100%" height="100%" fill="black" rx="10" ry="10"/>
                  <text x="10" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="white">${price}</text>
                </svg>`,
        };
  
        // Altere o ícone do marcador para simular o efeito de mouseover
        this.changeMarkerIcon(marker, highlightedIcon);
  
      }
    });
  }

  desibirMapa(customerVehicle) {
    const customerVehicleId = customerVehicle.customerVehicleId;

    const price = `Preço: R$ ${customerVehicle.dailyRate}`;
  
    // Percorra todos os marcadores no mapa e encontre o marcador com base no ID do veículo
    this.markers.forEach((marker: google.maps.Marker) => {
      const markerCustomerId = marker.get('customerVehicleId');
      if (markerCustomerId === customerVehicleId) {

        const defaultIcon = {
          url: `data:image/svg+xml;charset=UTF-8,
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40">
                  <rect width="100%" height="100%" fill="white" rx="10" ry="10"/>
                  <text x="10" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="black">${price}</text>
                </svg>`,
        };
  
        // Altere o ícone do marcador para simular o efeito de mouseover
        this.changeMarkerIcon(marker, defaultIcon);
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
          resolve(null);
        }
      });
    });
  }

  formatDailyRateWithComma(dailyRate: number): string {
    return this.decimalPipe?.transform(dailyRate, '1.2-2')?.replace('.', ',') ?? '';
  }
}