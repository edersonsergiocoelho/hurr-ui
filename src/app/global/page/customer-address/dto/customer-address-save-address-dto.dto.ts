import { AddressType } from "../../address-type/entity/address-type.entity";
import { Address } from "../../address/entity/address.entity";
import { Customer } from "../../customer/entity/customer.entity";

export class CustomerAddressSaveAddressDTO {
  
  customer: Customer;
  address: Address;
  addressTypes: Array<AddressType>;
}
