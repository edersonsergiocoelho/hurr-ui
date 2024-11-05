import { State } from "../../state/entity/state.entity";

export class City {

  cityId: string;
  cityName: string;
  serviceAvailable: boolean;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  state: State;
}