import { CustomerVehicle } from "../../../entity/customer-vehicle.entity";

export class CustomerVehicleEditAdvertisementStatusUIDTO {

  advertisementStatuses: AdvertisementStatus[];
  selectedAdvertisementStatus: AdvertisementStatus;
  
  customerVehicle: CustomerVehicle;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;

  success_message_service_Generic: string;
  save_success_message_service_CustomerVehicleEditAdvertisementStatus: string;
}

interface AdvertisementStatus {
  name: string;
  code: string;
}