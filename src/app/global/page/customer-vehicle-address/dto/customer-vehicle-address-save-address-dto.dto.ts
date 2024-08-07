import { AddressType } from "../../address-type/entity/address-type.entity";
import { Address } from "../../address/entity/address.entity";
import { CustomerVehicle } from "../../customer-vehicle/entity/customer-vehicle.entity";

export class CustomerVehicleAddressSaveAddressDTO {
  
  customerVehicle: CustomerVehicle;
  address: Address;
  addressTypes: Array<AddressType>;
}