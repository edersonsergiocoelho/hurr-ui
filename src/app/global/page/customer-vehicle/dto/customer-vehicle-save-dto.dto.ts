import { CustomerVehicleFilePhoto } from "src/app/page/customer-vehicle-file-photo/entity/customer-vehicle-file-photo.entity";
import { CustomerVehicle } from "../entity/customer-vehicle.entity";
import { CustomerVehicleFileInsurance } from "src/app/page/customer-vehicle-file-insurance/entity/customer-vehicle-file-insurance.entity";
import { Address } from "../../address/entity/address.entity";

export class CustomerVehicleSaveDTO {

  customerVehicle: CustomerVehicle;
  address: Address;
  customerVehicleFilePhotos: Array<CustomerVehicleFilePhoto>;
  customerVehicleFileInsurances: Array<CustomerVehicleFileInsurance>;
}