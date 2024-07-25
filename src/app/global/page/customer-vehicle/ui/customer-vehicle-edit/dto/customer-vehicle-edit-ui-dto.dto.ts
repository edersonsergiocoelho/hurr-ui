import { CustomerVehicle } from "../../../entity/customer-vehicle.entity";

export class CustomerVehicleEditUIDTO {

  customerVehicleFilePhoto: any;
  customerVehicle: CustomerVehicle;

  // Messages
  error_message_service_Generic: string
  warn_message_service_Generic: string;
}