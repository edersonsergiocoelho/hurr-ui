import { CustomerVehicle } from "../../../entity/customer-vehicle.entity";

export class CustomerVehicleEditAddressesUIDTO {
  
  customerVehicle: CustomerVehicle;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;

  success_summary_message_service_Generic: string;
  save_success_message_service_CustomerVehicleEditAddresses: string;
}