import { Address } from "../../address/entity/address.entity";
import { CustomerVehicleAddressDTO } from "../dto/customer-vehicle-address-dto.dto";

export class CustomerVehicleAddress {

  customerVehicleAddressId: string;
  address: Address;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toDTO(customerVehicleAddress: CustomerVehicleAddress): CustomerVehicleAddressDTO {
    return {
      customerVehicleAddressId: customerVehicleAddress.customerVehicleAddressId,
      address: customerVehicleAddress.address,
      createdDate: customerVehicleAddress.createdDate,
      modifiedDate: customerVehicleAddress.modifiedDate,
      enabled: customerVehicleAddress.enabled,
    };
  }
}