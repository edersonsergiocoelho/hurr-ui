import { Country } from "../../country/entity/country.entity";

export class State {

  stateId: string;
  stateName: string;
  serviceAvailable: boolean;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  country: Country;
}