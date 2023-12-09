import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Menu } from 'primeng/menu';
import { VehicleBrandService } from 'src/app/page/admin/vehicle-brand/service/vehicle-brand.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';
import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';

declare const google: any;

@Component({
  selector: 'app-home-search-cars-detail',
  templateUrl: './home-search-cars-detail.component.html',
  styleUrls: ['./home-search-cars-detail.component.css']
})
export class HomeSearchCarsDetailComponent {

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

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private ngZone: NgZone,
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
    debugger;
    this.appendTo = event.currentTarget;
    this.displayMenu = !this.displayMenu;
    if (this.displayMenu) {
      this.menu.toggle(event);
    }
  }
}