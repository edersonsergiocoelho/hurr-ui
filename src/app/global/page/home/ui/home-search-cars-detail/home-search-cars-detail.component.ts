import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Menu } from 'primeng/menu';
import { VehicleBrandService } from 'src/app/page/admin/vehicle-brand/service/vehicle-brand.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';
import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';
import { CustomerVehicleService } from '../../../customer-vehicle/service/customer-vehicle.service';
import { SearchCustomerVehicle } from '../../../customer-vehicle/dto/search-customer-vehicle.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-home-search-cars-detail',
  templateUrl: './home-search-cars-detail.component.html',
  styleUrls: ['./home-search-cars-detail.component.css'],
})
export class HomeSearchCarsDetailComponent implements AfterViewInit {

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

  vehiclesBrands?: any[];
  selectedVehicleBrand: any;
  vehicles?: any[];
  selectedVehicle: any;
  vehiclesModels?: any[];
  selectedVehicleModel: any;
  customerVehicles?: any[];

  center: google.maps.LatLngLiteral = {lat: -23.7189106, lng: -46.8551999};
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map: any;
  zoom = 14;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  markers: google.maps.Marker[] = [];

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private httpClient: HttpClient,
              private ngZone: NgZone,
              private decimalPipe: DecimalPipe,
              private customerVehicleService: CustomerVehicleService,
              private vehicleBrandService: VehicleBrandService,
              private vehicleService: VehicleService,
              private vehicleModelService: VehicleModelService) {

    this.today = new Date();
    this.dateInit = this.today;
    this.dateEnd = this.today;
  }

  ngOnInit(): void {
    this.getAllBrands();

    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.place = autocomplete.getPlace();
      });
    });
  }

  ngAfterViewInit(): void {
    this.map = document.getElementById("map");
    this.initializeMap();
  }

  initializeMap() {
    const mapOptions = {
      center: this.center,
      zoom: this.zoom,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getAllBrands(): void {
    this.vehicleBrandService.getAllVehicleBrands().subscribe((response) => {
      this.vehiclesBrands = response.body || [];
    });
  }

  changeBrand(selectedVehicleBrand) {

    this.vehicles = [];
    this.vehiclesModels = [];

    this.vehicleService.getVehiclesByBrandId(selectedVehicleBrand.vehicleBrandId).subscribe(
      (response) => {
        this.vehicles = response.body || [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeVehicle(selectedVehicle) {

    this.vehiclesModels = [];

    this.vehicleModelService.getVehicleModelsByVehicleId(selectedVehicle.vehicleId).subscribe(
      (response) => {
        this.vehiclesModels = response.body || [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search() {
    
    let searchCustomerVehicle: SearchCustomerVehicle = new SearchCustomerVehicle();

    if (this.selectedVehicle != null) {
      searchCustomerVehicle.vehicleId = this.selectedVehicle.vehicleId;
    }

    if (this.selectedVehicleModel != null) {
      searchCustomerVehicle.vehicleModelId = this.selectedVehicleModel.vehicleModelId;
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
        this.customerVehicles = response.body || [];

        this.customerVehicles.forEach((vehicle) => {

          const address = `${vehicle?.addresses[0]?.address?.streetAddress}, ${vehicle?.addresses[0]?.address?.city?.cityName}, ${vehicle?.addresses[0]?.address?.state?.stateName}`;
    
          const price = `Preço: R$ ${vehicle.dailyRate}`;
    
          this.geocodeAddress(address, price, vehicle);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  geocodeAddress(address: string, price: string, vehicleDetails: any) {

    this.initializeMap();

    const geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results[0] && results[0].geometry) {
        const latLng = results[0].geometry.location;
        const position: google.maps.LatLngLiteral = { lat: latLng.lat(), lng: latLng.lng() };

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

        debugger;

        const marker: google.maps.Marker = new google.maps.Marker({
          position: position,
          map: this.map,
          icon: defaultIcon,

        });

        // Associando o veículo ao marcador usando a classe Map do JavaScript
        marker.set('customerVehicleId', vehicleDetails.customerVehicleId);
 
        marker.addListener('mouseover', () => {
          marker.setIcon(highlightedIcon);
        });
  
        marker.addListener('mouseout', () => {
          marker.setIcon(defaultIcon);
        });
  
        const infoWindow = new google.maps.InfoWindow({
          content: price,
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

  formatDailyRateWithComma(dailyRate: number): string {
    return this.decimalPipe?.transform(dailyRate, '1.2-2')?.replace('.', ',') ?? '';
  }
}