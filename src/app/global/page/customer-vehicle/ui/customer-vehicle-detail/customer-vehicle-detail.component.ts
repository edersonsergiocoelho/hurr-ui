import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { CustomerVehicleDetailUUIDTO } from './dto/customer-vehicle-detail-ui.dto';

import { VehicleService } from 'src/app/page/admin/vehicle/service/vehicle.service';
import { VehicleModelService } from 'src/app/page/admin/vehicle-model/service/vehicle-model.service';

@Component({
  selector: 'app-customer-vehicle-detail',
  templateUrl: './customer-vehicle-detail.component.html',
  styleUrls: ['./customer-vehicle-detail.component.css']
})
export class CustomerVehicleDetailComponent implements OnInit {

  customerVehicleDetailUUIDTO: CustomerVehicleDetailUUIDTO;
  images: any;
  responsiveOptions: any;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private location: Location,
              private vehicleService: VehicleService,
              private vehicleModelService: VehicleModelService) {

    this.images = [
      { itemImageSrc: 'assets/images/vehicle/Corolla.png', thumbnailImageSrc: 'assets/images/vehicle/Corolla.png' },
      // Adicione mais imagens se necessário no mesmo formato
    ];

    // Defina suas opções de resposta (responsive options) conforme necessário
    this.responsiveOptions = [
      // Defina suas opções de resposta aqui
    ];
  }

  ngOnInit(): void {

    this.resetRegisterForm();
  }

  resetRegisterForm () {

    this.customerVehicleDetailUUIDTO = new CustomerVehicleDetailUUIDTO();

    const state = this.location.getState() as any;
    
    if (state != null) {

      this.customerVehicleDetailUUIDTO.place = JSON.parse(state.place);
      this.searchInput.nativeElement.value = this.customerVehicleDetailUUIDTO.place.formatted_address;
      this.customerVehicleDetailUUIDTO.dateInit = state.dateInit;
      this.customerVehicleDetailUUIDTO.selectedHourInit = state.selectedHourInit;
      this.customerVehicleDetailUUIDTO.dateEnd = state.dateEnd;
      this.customerVehicleDetailUUIDTO.selectedHourEnd = state.selectedHourEnd;
    }

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

  }

  changeBrand(selectedVehicleBrand) {

    this.customerVehicleDetailUUIDTO.vehicles = [];
    this.customerVehicleDetailUUIDTO.vehiclesModels = [];

    this.vehicleService.getVehiclesByBrandId(selectedVehicleBrand.vehicleBrandId).subscribe(
      (response) => {
        this.customerVehicleDetailUUIDTO.vehicles = response.body || [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeVehicle(selectedVehicle) {

    this.customerVehicleDetailUUIDTO.vehiclesModels = [];

    this.vehicleModelService.getVehicleModelsByVehicleId(selectedVehicle.vehicleId).subscribe(
      (response) => {
        this.customerVehicleDetailUUIDTO.vehiclesModels = response.body || [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search() {
    
  }
}