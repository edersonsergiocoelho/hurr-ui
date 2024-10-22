import { AddressType } from "src/app/global/page/address-type/entity/address-type.entity";
import { City } from "src/app/page/admin/city/entity/city.entity";
import { Country } from "src/app/page/admin/country/entity/country.entity";
import { CustomerVehicleAddress } from "src/app/global/page/customer-vehicle-address/entity/customer-vehicle-address.entity";
import { State } from "src/app/page/admin/state/entity/state.entity";

import { CustomerVehicleAddressDTO } from "src/app/global/page/customer-vehicle-address/dto/customer-vehicle-address-dto.dto";
import { Address } from "src/app/global/page/address/entity/address.entity";
import { CustomerVehicle } from "../../../entity/customer-vehicle.entity";

export class CustomerVehicleEditAddressesRegisterUIDTO {

  customerVehicleAddressDTO: CustomerVehicleAddressDTO;

  address: Address;
  customerVehicle: CustomerVehicle;

  addressTypes: Array<AddressType>;
  selectedAddressTypes: Array<AddressType>;

  countries: Array<Country>;
  selectedCountry: Country;

  states: Array<State>;
  selectedState: State;

  cities: Array<City>;
  selectedCity: City;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;

  success_summary_message_service_Generic: string;
  save_success_message_service_CustomerVehicleEditAddressesRegister: string;
  update_success_message_service_CustomerVehicleEditAddressesRegister: string;
  delete_success_message_service_CustomerVehicleEditAddressesRegister: string;
}