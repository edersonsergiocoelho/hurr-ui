import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { CustomerAddress } from "src/app/global/page/customer-address/entity/customer-address.entity";
import { CustomerVehicleAddress } from "src/app/global/page/customer-vehicle-address/entity/customer-vehicle-address.entity";
import { CustomerVehicleFilePhoto } from "src/app/page/customer-vehicle-file-photo/entity/customer-vehicle-file-photo.entity";

export class CustomerVehicleDetailUIDTO extends TranslateSeverityDTO {

  // Informações do Cliente
  customer: any;
  customerVehicleId: any;
  customerVehicle: any;
  customerVehicles?: any[];

  // Informações do Veículo
  vehicles?: any[];
  selectedVehicle: any;
  vehiclesBrands?: any[];
  selectedVehicleBrand: any;
  vehiclesModels?: any[];
  selectedVehicleModel: any;
  vehiclesCategorys: any[];
  selectedVehicleCategory: any;
  customerVehicleFilePhotos: Array<CustomerVehicleFilePhoto>;

  // Informações de Endereço
  listCustomerVehicleAddressVehicle: Array<CustomerVehicleAddress>;
  listCustomerAddressDelivery: Array<CustomerAddress>;
  listCustomerAddressPickUp: Array<CustomerAddress>;
  selectedCustomerVehicleAddressVehicle: CustomerVehicleAddress;
  selectedCustomerAddressDelivery: CustomerAddress;
  selectedCustomerAddressPickUp: CustomerAddress;

  // Informações de Data e Hora
  dateInit: Date;
  dateEnd: Date;
  dateCancelFree: Date;
  today: Date;
  dateFormat = 'dd/mm/yy';
  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';
  hoursInit: string[];
  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  // Informações de Avaliação e Classificação
  customersVehiclesReviews: any[];
  valueRating: number = 5;
  percentages: any;

  // Informações de Localização
  place: any;

  // Mensagens
  header_Address_CustomerVehicleDetail: string;
  warn_not_null_customer_vehicle_address_vehicle_CustomerVehicleDetail: string;
  warn_customer_not_validated_CustomerVehicleDetail: string;
  info_user_not_logged_in_CustomerVehicleDetail: string;
}