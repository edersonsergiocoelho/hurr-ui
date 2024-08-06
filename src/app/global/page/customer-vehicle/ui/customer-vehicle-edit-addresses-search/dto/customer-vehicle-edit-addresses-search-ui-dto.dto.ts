import { CustomerVehicleAddress } from "src/app/global/page/customer-vehicle-address/entity/customer-vehicle-address.entity";
import { CustomerVehicleAddressSearchDTO } from "src/app/global/page/customer-vehicle-address/dto/customer-vehicle-address-search-dto.dto";

export class CustomerVehicleEditAddressesSearchUIDTO {
  
  columns: any[] = [];
  dt: any;
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  customerVehicleAddressSearchDTO: CustomerVehicleAddressSearchDTO;
  customerVehicleAddresses: Array<CustomerVehicleAddress>;

  enabledOptions: any[] = [{label: 'Todos', value: 'ALL'}, {label: 'Habilitados', value: 'ON'}, {label: 'Desabilitados', value: 'OFF'}];
  enabledValue: string = 'ALL';

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;

  // Table
  table_header_customer_vehicle_address_id_CustomerVehicleEditAddressesSearch: string;
  table_header_street_address_CustomerVehicleEditAddressesSearch: string;
  table_header_nickname_CustomerVehicleEditAddressesSearch: string;
  table_header_enabled_CustomerVehicleEditAddressesSearch: string;
}