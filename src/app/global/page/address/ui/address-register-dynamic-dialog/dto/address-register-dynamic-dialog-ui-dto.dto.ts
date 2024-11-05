import { Country } from "src/app/page/admin/country/entity/country.entity";
import { AddressDTO } from "../../../dto/address-dto.dto";
import { State } from "src/app/page/admin/state/entity/state.entity";
import { City } from "src/app/page/admin/city/entity/city.entity";
import { Address } from "../../../entity/address.entity";
import { CustomerAddress } from "src/app/global/page/customer-address/entity/customer-address.entity";
import { Customer } from "src/app/global/page/customer/entity/customer.entity";
import { CustomerAddressDTO } from "src/app/global/page/customer-address/dto/customer-address-dto.dto";
import { AddressType } from "src/app/global/page/address-type/entity/address-type.entity";

export class AddressRegisterDynamicDialogUIDTO {

  newRegister: boolean;

  customer: Customer;

  address: Address;
  addressDTO: AddressDTO;

  customerAddress: CustomerAddress;
  customerAddressDTO: CustomerAddressDTO;

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
  save_success_message_service_AddressRegisterDynamicDialog: string;
  update_success_message_service_AddressRegisterDynamicDialog: string;
  header_AddressRegisterDynamicDialog: string;
}