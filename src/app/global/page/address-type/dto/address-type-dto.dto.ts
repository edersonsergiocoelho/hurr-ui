import { AddressAddressTypeDTO } from "../../address-address-type/dto/address-address-type-dto.dto";

export class AddressTypeDTO {

  addressTypeId: string;
  addressTypeName: string;
  addressAddressTypes: Array<AddressAddressTypeDTO>;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;
}