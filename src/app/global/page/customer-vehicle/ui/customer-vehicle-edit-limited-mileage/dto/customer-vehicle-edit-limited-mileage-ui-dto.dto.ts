import { CustomerVehicle } from "../../../entity/customer-vehicle.entity";

export class CustomerVehicleEditLimitedMileageUIDTO {
  
  customerVehicle: CustomerVehicle;

  limitedMileage: string;
  limitedMileageIncluded: number;
  limitedMileageValue: number;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;

  success_message_service_Generic: string;
  save_success_message_service_CustomerVehicleEditLimitedMileage: string;
}