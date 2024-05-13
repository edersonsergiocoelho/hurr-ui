import { Address } from "../../address/entity/address.entity";
import { AddressType } from "../../address-type/entity/address-type.entity";
import { AddressAddressTypeId } from "./address-address-type-id.entity";

export class AddressAddressType {
  
  id: AddressAddressTypeId;
  address: Address;
  addressType: AddressType;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}