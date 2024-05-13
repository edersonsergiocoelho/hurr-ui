import { Country } from "src/app/page/admin/country/entity/country.entity";
import { State } from "src/app/page/admin/state/entity/state.entity";
import { City } from "src/app/page/admin/city/entity/city.entity";
import { AddressDTO } from "../dto/address-dto.dto";

export class Address {

  addressId: string;
  nickname: string;
  streetAddress: string;
  number: number;
  complement: string;
  zipCode: string;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  country: Country;
  state: State;
  city: City;

  public static toDTO(address: Address): AddressDTO {
    return {
      addressId: address.addressId,
      nickname: address.nickname,
      streetAddress: address.streetAddress,
      number: address.number,
      complement: address.complement,
      zipCode: address.zipCode,
      createdDate: address.createdDate,
      modifiedDate: address.modifiedDate,
      enabled: address.enabled,
      country: address.country,
      state: address.state,
      city: address.city,
    };
  }
}