import { SelectItem } from "primeng/api";
import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";

export class HomeSearchCarsDetailUIDTO extends TranslateSeverityDTO {

  //
  today: Date;
  dateInit: Date;
  dateEnd: Date;

  dateFormat = 'dd/mm/yy';

  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  hoursInit: string[];
  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  place: any;
  placeLocationLatitude: any;
  placeLocationLongitude: any;

  // Map
  map: any;
  center: google.maps.LatLngLiteral = {lat: -23.7189106, lng: -46.8551999};
  zoom = 14;
  markerPositions: google.maps.LatLngLiteral[] = [];
  markers: google.maps.marker.AdvancedMarkerElement[] = [];

  // DataView
  customerVehicles: any[];
  totalRecords = 0;

  sortOrder!: number;
  sortField!: string;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  vehicles?: any[];
  selectedVehicle: any;
  vehicleBrands?: any[];
  selectedVehicleBrand: any;
  vehicleModels?: any[];
  selectedVehicleModel: any;
  vehicleCategorys: any[];
  selectedVehicleCategory: any;

  // Messages
  currency_brl_Generic: string;
  daily_rate_HomeSearchCarsDetail: string;
  excluding_taxes_and_fees_HomeSearchCarsDetail: string;
  span_no_image_Generic: string;

  getDefaultIcon(price: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="40">
        <rect width="100%" height="100%" fill="white" rx="10" ry="10"/>
        <text x="10" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="black">${price}</text>
      </svg>`;
    return div;
  }

  getHighlightedIcon(price: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="40">
        <rect width="100%" height="100%" fill="black" rx="10" ry="10"/>
        <text x="10" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="white">${price}</text>
      </svg>`;
    return div;
  }
}