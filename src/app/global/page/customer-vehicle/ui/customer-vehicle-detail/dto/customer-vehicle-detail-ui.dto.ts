import { CustomerVehicleAddress } from "src/app/global/page/customer-vehicle-address/entity/customer-vehicle-address.entity";

export class CustomerVehicleDetailUIDTO {

  customerVehicleId: any;
  customerVehicle: any;

  listCustomerVehicleAddressVehicle: Array<CustomerVehicleAddress>;
  listCustomerVehicleAddressDelivery: Array<CustomerVehicleAddress>;
  listCustomerVehicleAddressPickup: Array<CustomerVehicleAddress>;

  selectedCustomerVehicleAddressVehicle: CustomerVehicleAddress;
  selectedCustomerVehicleAddressDelivery: CustomerVehicleAddress;
  selectedCustomerVehicleAddressPickup: CustomerVehicleAddress;

  dateInit: Date;
  dateEnd: Date;
  dateCancelFree: Date;
  today: Date;

  dateFormat = 'dd/mm/yy';

  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  vehicles?: any[];
  selectedVehicle: any;
  vehiclesBrands?: any[];
  selectedVehicleBrand: any;
  vehiclesModels?: any[];
  selectedVehicleModel: any;
  customerVehicles?: any[];
  vehiclesCategorys: any[];
  selectedVehicleCategory: any;

  customersVehiclesReviews: any[];

  place: any;
}