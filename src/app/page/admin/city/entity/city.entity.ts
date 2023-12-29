import { Country } from "../../country/entity/country.entity";
import { State } from "../../state/entity/state.entity";

export interface City {

  cityId: string;
  cityName: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  country: Country;
  state: State;
}