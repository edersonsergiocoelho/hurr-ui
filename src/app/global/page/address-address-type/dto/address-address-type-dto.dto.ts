import { AddressDTO } from "../../address/dto/address-dto.dto";
import { AddressTypeDTO } from "../../address-type/dto/address-type-dto.dto";
import { AddressAddressTypeIdDTO } from "./address-address-type-id-dto.dto";

export class AddressAddressTypeDTO {
  
  id: AddressAddressTypeIdDTO;
  address: AddressDTO;
  addressType: AddressTypeDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}