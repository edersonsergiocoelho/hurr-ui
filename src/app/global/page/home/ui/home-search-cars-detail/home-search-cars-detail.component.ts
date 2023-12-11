import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Menu } from 'primeng/menu';
import { VehicleBrandService } from 'src/app/page/admin/vehicle-brand/service/vehicle-brand.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';
import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';
import { CustomerVehicleService } from '../../../customer-vehicle/service/customer-vehicle.service';
import { SearchCustomerVehicle } from '../../../customer-vehicle/dto/search-customer-vehicle.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  brands?: any[];
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

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private httpClient: HttpClient,
              private ngZone: NgZone,
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
        const place = autocomplete.getPlace();
      });
    });

    const carrosMock = [
      { endereco: 'Rua Utinga, 37, Itapecerica da Serra, São Paulo, Brasil', preco: 'R$ 50.000,00' },
      { endereco: 'Avenida XV De Novembro, 456, Itapecerica da Serra, São Paulo, Brasil', preco: 'R$ 70.000,00' },
      { endereco: 'Itapecerica Shooping, Itapecerica da Serra, São Paulo, Brasil', preco: 'R$ 70.000,00' },
      // Adicione mais endereços e preços, se necessário
    ];
  
    // Simulação da chamada do serviço de geocodificação para os endereços mockados
    carrosMock.forEach((carro) => {
      this.geocodeAddress(carro.endereco, carro.preco); // Passa o endereço e o preço para a função geocodeAddress
    });

    /*
    this.customerVehicleService.obterEnderecos().subscribe((enderecos: string[]) => {
      enderecos.forEach((endereco: string) => {
        // Aqui você faria a geocodificação para obter as coordenadas (latitude e longitude) do endereço
        this.geocodeAddress(endereco);
      });
    });
    */
  }

  ngAfterViewInit(): void {
    this.map = document.getElementById("map");
    debugger;
    this.initializeMap();
  }
  
  initializeMap() {
    const mapOptions = {
      center: this.center,
      zoom: this.zoom,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarkers();
  }

  addMarkers() {
    const carrosMock = [
      { endereco: 'Rua Utinga, 37, Itapecerica da Serra, São Paulo, Brasil', preco: 'R$ 50.000,00' },
      { endereco: 'Avenida XV De Novembro, 456, Itapecerica da Serra, São Paulo, Brasil', preco: 'R$ 70.000,00' },
      { endereco: 'Itapecerica Shooping, Itapecerica da Serra, São Paulo, Brasil', preco: 'R$ 70.000,00' },
      // Adicione mais endereços e preços, se necessário
    ];
  
    // Simulação da chamada do serviço de geocodificação para os endereços mockados
    carrosMock.forEach((carro) => {
      this.geocodeAddress(carro.endereco, carro.preco); // Passa o endereço e o preço para a função geocodeAddress
    });
  }

  getAllBrands(): void {
    this.vehicleBrandService.getAllVehicleBrands().subscribe((response) => {
      this.brands = response.body || [];
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

  @ViewChild('menu') menu!: Menu;
  displayMenu = false;
  appendTo: any;

  toggleMenu(event: Event) {
    this.appendTo = event.currentTarget;
    this.displayMenu = !this.displayMenu;
    if (this.displayMenu) {
      this.menu.toggle(event);
    }
  }

  search() {
    
    let searchCustomerVehicle: SearchCustomerVehicle = new SearchCustomerVehicle();

    if (this.selectedVehicle != null) {
      searchCustomerVehicle.vehicleId = this.selectedVehicle.vehicleId;
    }

    if (this.selectedVehicleModel != null) {
      searchCustomerVehicle.vehicleModelId = this.selectedVehicleModel.vehicleModelId;
    }

    this.customerVehicleService.searchCustomerVehicles(searchCustomerVehicle).subscribe(
      (response) => {
        this.customerVehicles = response.body || [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  geocodeAddress(address: string, price: string) {
    const geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results[0] && results[0].geometry) {
        const latLng = results[0].geometry.location;
        const position: google.maps.LatLngLiteral = { lat: latLng.lat(), lng: latLng.lng() };

        // Criar um novo marcador com as opções personalizadas (incluindo o preço)
        const marker = new google.maps.Marker({
          position: position,
          map: this.map,
          //icon: PrimeIcons.AMAZON, // URL do ícone do marcador
        });

        debugger;
  
        // Infowindow para exibir o preço quando o marcador é clicado
        const infoWindow = new google.maps.InfoWindow({
          content: price, // Conteúdo da infowindow (preço do carro)
        });
  
        marker.addListener('click', () => {
          debugger;
          infoWindow.open(this.map, marker); // Abre a infowindow quando o marcador é clicado
        });

        this.markerPositions.push(position); // Adiciona a posição aos marcadores
      } else {
        console.error('Geocodificação falhou:', status);
      }
    });
  }
}