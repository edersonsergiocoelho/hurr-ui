import { Address } from "../entity/address.entity";
import { CityDTO } from "src/app/page/admin/city/dto/city-dto.dto";
import { CountryDTO } from "src/app/page/admin/country/dto/country-dto.dto";
import { StateDTO } from "src/app/page/admin/state/dto/state-dto.dto";

export class AddressDTO {

  addressId: string;
  nickname: string;
  streetAddress: string;
  number: number;
  complement: string;
  zipCode: string;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  country: CountryDTO;
  state: StateDTO;
  city: CityDTO;

  public static toEntity(addressDTO: AddressDTO): Address {
    return {
      addressId: addressDTO.addressId,
      nickname: addressDTO.nickname,
      streetAddress: addressDTO.streetAddress,
      number: addressDTO.number,
      complement: addressDTO.complement,
      zipCode: addressDTO.zipCode,
      createdDate: addressDTO.createdDate,
      modifiedDate: addressDTO.modifiedDate,
      enabled: addressDTO.enabled,
      country: addressDTO.country,
      state: addressDTO.state,
      city: addressDTO.city
    };
  }
}