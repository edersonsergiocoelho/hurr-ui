import { CustomerAddress } from "src/app/global/page/customer-address/entity/customer-address.entity";
import { CustomerVehicleAddress } from "src/app/global/page/customer-vehicle-address/entity/customer-vehicle-address.entity";
import { CustomerVehicleFilePhoto } from "src/app/page/customer-vehicle-file-photo/entity/customer-vehicle-file-photo.entity";

export class CustomerVehicleDetailUIDTO {

  customer: any;

  customerVehicleId: any;
  customerVehicle: any;

  listCustomerVehicleAddressVehicle: Array<CustomerVehicleAddress>;
  listCustomerAddressDelivery: Array<CustomerAddress>;
  listCustomerAddressPickUp: Array<CustomerAddress>;

  selectCustomerVehicleAddressVehicle: CustomerVehicleAddress;
  selectCustomerAddressDelivery: CustomerAddress;
  selectCustomerAddressPickUp: CustomerAddress;

  customerVehicleFilePhotos: Array<CustomerVehicleFilePhoto>;

  dateInit: Date;
  dateEnd: Date;
  dateCancelFree: Date;
  today: Date;

  dateFormat = 'dd/mm/yy';

  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  // Array de horas a partir da hora atual
  hoursInit: string[] = Array.from({ length: 48 }, (_, index) => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const hour = Math.floor(index / 2);
    const minute: number = index % 2 === 0 ? 0 : 30; // Converter minute para número
    if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
      return ''; // Para as horas passadas, retornar uma string vazia
    } else {
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
  }).filter(hour => hour !== ''); // Filtrar as horas vazias

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

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
  header_Address_CustomerVehicleDetail: string;
}