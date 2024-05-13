import { AddressAddressType } from "../../address-address-type/entity/address-address-type.entity";

export class AddressType {

  addressTypeId: string;
  addressTypeName: string;
  addressAddressTypes: Array<AddressAddressType>;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}