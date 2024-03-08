import { Address } from "../../address/entity/address.entity";
import { Customer } from "../../customer/entity/customer.entity";
import { CustomerAddressDTO } from "../dto/customer-address-dto.dto";

export class CustomerAddress {

  customerAddressId: string;
  customer: Customer;
  address: Address;
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;

  public static toDTO(customerAddress: CustomerAddress): CustomerAddressDTO {
    return {
      customerAddressId: customerAddress.customerAddressId,
      customer: customerAddress.customer,
      address: customerAddress.address,
      createdDate: customerAddress.createdDate,
      modifiedDate: customerAddress.modifiedDate,
      enabled: customerAddress.enabled
    };
  }
}