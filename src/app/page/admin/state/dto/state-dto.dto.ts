import { CountryDTO } from "../../country/dto/country-dto.dto";

export class StateDTO {

  stateId: string;
  stateName: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  country: CountryDTO;
}