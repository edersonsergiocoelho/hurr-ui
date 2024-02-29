import { Address } from "../../address/entity/address.entity";
import { Customer } from "../../customer/entity/customer.entity";
import { CustomerAddress } from "../entity/customer-address.entity";

export class CustomerAddressDTO {

  customerAddressId: string;
  customer: Customer;
  address: Address;
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;

  public static toEntity(customerAddressDTO: CustomerAddressDTO): CustomerAddress {
    return {
      customerAddressId: customerAddressDTO.customerAddressId,
      customer: customerAddressDTO.customer,
      address: customerAddressDTO.address,
      createdDate: customerAddressDTO.createdDate,
      modifiedDate: customerAddressDTO.modifiedDate,
      enabled: customerAddressDTO.enabled
    };
  }
}