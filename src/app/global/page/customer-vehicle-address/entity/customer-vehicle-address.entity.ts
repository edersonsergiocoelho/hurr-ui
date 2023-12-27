import { Address } from "../../address/entity/address.entity";

export interface CustomerVehicleAddress {

  customerVehicleAddressId: string;
  address: Address;
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;
}