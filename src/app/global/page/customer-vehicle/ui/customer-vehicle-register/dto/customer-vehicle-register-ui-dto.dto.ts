import { Address } from "src/app/global/page/address/entity/address.entity";
import { Country } from "src/app/page/admin/country/entity/country.entity";

export class CustomerVehicleRegisterUIDTO {

  step: number = 1;
  
  countries: Array<Country>;
  
  address: Address;
}