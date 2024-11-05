import { CustomerVehicleApproved } from "../../../entity/customer-vehicle-approved.entity";
import { CustomerVehicleFileInsurance } from "src/app/page/customer-vehicle-file-insurance/entity/customer-vehicle-file-insurance.entity";
import { CustomerVehicle } from "src/app/global/page/customer-vehicle/entity/customer-vehicle.entity";

export class CustomerVehicleApprovedDetailUIDTO {

  currentUser: any;

  // Galleria
  displayCustom: boolean;
  activeIndex: number = 0;
  customerVehicleFilePhotos: Array<any>;

  customerVehicle: CustomerVehicle;
  customerVehicleApproved: CustomerVehicleApproved;
  customerVehicleFileInsurances: Array<CustomerVehicleFileInsurance>;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;
  success_summary_message_service_Generic: string;
  failed_to_open_new_tab_detail_message_service_Generic: string;

  message_not_null_message_service_CustomerVehicleApprovedDetail: string;
  success_approve_message_service_CustomerVehicleApprovedDetail: string;
  success_disapprove_message_service_CustomerVehicleApprovedDetail: string;
}