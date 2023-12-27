import { Country } from "../../country/entity/country.entity";

export interface State {

  stateId: string;
  stateName: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  country: Country;
}