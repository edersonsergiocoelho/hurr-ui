import { Customer } from "src/app/global/page/customer/entity/customer.entity";
import { FileApproved } from "src/app/page/admin/file-approved/entity/file-approved.entity";
import { User } from "src/app/page/user/entity/user.entity";

export class CustomerValidationUIDTO {

  showApprovalMessageIdentityNumber: boolean = false;
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
  user: User;

  identityNumberFileId: string;
  fileApprovedIdentityNumber: FileApproved;
  driverLicenseFileId: string;
  fileApprovedDriverLicense: FileApproved;
  photoFileId: string;
  fileApprovedProfilePicture: FileApproved;

  divButtonIdentityNumber: boolean;
  divButtonDriverLicense: boolean;
}