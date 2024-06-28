import { CountryDTO } from "../../country/dto/country-dto.dto";

export class StateDTO {

  stateId: string;
  stateName: string;
  serviceAvailable: boolean;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  country: CountryDTO;
}