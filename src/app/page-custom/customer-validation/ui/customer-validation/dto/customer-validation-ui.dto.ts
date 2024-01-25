import { Customer } from "src/app/global/page/customer/entity/customer.entity";
import { FileApproved } from "src/app/page/admin/file-approved/entity/file-approved.entity";
import { User } from "src/app/page/user/entity/user.entity";

export class CustomerValidationUUIDTO {

  showApprovalMessageDriverLicense: boolean = false;
  showApprovalMessageProfilePicture: boolean = false;

  email: string;
  emailVerificationCode: string;
  phoneVerificationCode: string;

  ddi: string;
  phone: string;

  sendEmailVerificationCode: boolean;
  sendPhoneVerificationCode: boolean;

  uploadedFiles: any[] = [];

  customer: Customer;
  fileApprovedProfilePicture: FileApproved;
  fileApprovedDriverLicense: FileApproved;
  user: User;
}