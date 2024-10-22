import { File } from "src/app/page/file/entity/file.entity";
import { FileApproved } from "../../../entity/file-approved.entity";
import { Customer } from "src/app/global/page/customer/entity/customer.entity";
import { User } from "src/app/page/user/entity/user.entity";

export class FileApprovedDetailUIDTO {

  currentUser: User;

  fileApproved: FileApproved;
  file: File;
  dataURI: any;
  dataURIPDF: any;

  customer: Customer;
  user: User;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;
  success_summary_message_service_Generic: string;

  message_not_null_message_service_FileApprovedDetail: string;
  success_approve_message_service_FileApprovedDetail: string;
  success_disapprove_message_service_FileApprovedDetail: string;
}