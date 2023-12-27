import { Country } from "src/app/page/admin/country/entity/country.entity";
import { State } from "src/app/page/admin/state/entity/state.entity";
import { City } from "src/app/page/admin/city/entity/city.entity";

export interface Address {

  addressId: string;
  streetAddress: string;
  number: number;
  complement: string;
  zipCode: string;
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;

  country: Country;
  state: State;
  city: City;
}