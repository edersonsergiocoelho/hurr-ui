import { Country } from "../../country/entity/country.entity";

export interface State {

  stateId: string;
  stateName: string;
  serviceAvailable: boolean;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  country: Country;
}