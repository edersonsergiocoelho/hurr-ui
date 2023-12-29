export class HomeSearchCarsDetailUIDTO {

  vehicles?: any[];
  selectedVehicle: any;
  vehiclesBrands?: any[];
  selectedVehicleBrand: any;
  vehiclesModels?: any[];
  selectedVehicleModel: any;
  customerVehicles?: any[];
  vehiclesCategorys: any[];
  selectedVehicleCategory: any;

  placeLocationLatitude: any;
  placeLocationLongitude: any;

  getDefaultIcon(price: string): any {
    return {
      url: `data:image/svg+xml;charset=UTF-8,
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="40">
              <rect width="100%" height="100%" fill="white" rx="10" ry="10"/>
              <text x="10" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="black">${price}</text>
            </svg>`,
    };
  }

  getHighlightedIcon(price: string): any {
    return {
      url: `data:image/svg+xml;charset=UTF-8,
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="40">
              <rect width="100%" height="100%" fill="black" rx="10" ry="10"/>
              <text x="10" y="25" font-family="Arial" font-size="12" font-weight="bold" fill="white">${price}</text>
            </svg>`,
    };
  }
}