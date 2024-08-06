import { AddressDTO } from "../../address/dto/address-dto.dto";
import { CustomerVehicleAddress } from "../entity/customer-vehicle-address.entity";

export class CustomerVehicleAddressDTO {

  customerVehicleAddressId: string;
  address: AddressDTO;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toEntity(customerVehicleAddressDTO: CustomerVehicleAddressDTO): CustomerVehicleAddress {
    return {
      customerVehicleAddressId: customerVehicleAddressDTO.customerVehicleAddressId,
      address: customerVehicleAddressDTO.address,
      createdDate: customerVehicleAddressDTO.createdDate,
      modifiedDate: customerVehicleAddressDTO.modifiedDate,
      enabled: customerVehicleAddressDTO.enabled,
    };
  }
}