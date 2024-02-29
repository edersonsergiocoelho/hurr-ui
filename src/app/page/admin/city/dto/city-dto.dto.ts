import { StateDTO } from "../../state/dto/state-dto.dto";

export class CityDTO {

  cityId: string;
  cityName: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  state: StateDTO;
}