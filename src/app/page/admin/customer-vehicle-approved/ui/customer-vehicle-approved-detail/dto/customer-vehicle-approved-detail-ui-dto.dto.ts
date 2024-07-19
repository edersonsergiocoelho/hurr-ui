import { File } from "src/app/page/file/entity/file.entity";
import { CustomerVehicleApproved } from "../../../entity/customer-vehicle-approved.entity";
import { Customer } from "src/app/global/page/customer/entity/customer.entity";
import { User } from "src/app/page/user/entity/user.entity";

export class CustomerVehicleApprovedDetailUIDTO {

  currentUser: User;

  customerVehicleApproved: CustomerVehicleApproved;
  file: File;
  dataURI: any;
  dataURIPDF: any;

  customer: Customer;
  user: User;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
  success_message_service_Generic: string;

  message_not_null_message_service_CustomerVehicleApprovedDetail: string;
  success_approve_message_service_CustomerVehicleApprovedDetail: string;
  success_disapprove_message_service_CustomerVehicleApprovedDetail: string;
}