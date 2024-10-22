import { City } from "src/app/page/admin/city/entity/city.entity";
import { Country } from "src/app/page/admin/country/entity/country.entity";
import { State } from "src/app/page/admin/state/entity/state.entity";

export class CustomerVehicleRegisterStep1UIDTO {

  isFormValid: boolean = false;

  countries: Array<Country>;
  selectedCountry: Country;

  states: Array<State>;
  selectedState: State;

  cities: Array<City>;
  selectedCity: City;

  nickname: string;
  streetAddress: string;
  number: number;
  complement: string;
  zipCode: string;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;

  city_service_not_available_message_service_CustomerVehicleRegisterStep1: string;
}