import { Customer } from "src/app/global/page/customer/entity/customer.entity";
import { User } from "src/app/page/user/entity/user.entity";

export class FileApproved {

  fileApprovedId: string;
  fileId: string;
  approvedBy: string;
  reprovedBy: string;
  message: string;
  fileTable: string;
  customerId: string;
  userId: string;
  fileType: string;
  createdBy: string;
  modifiedBy: string;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;

  customer: Customer;
  user: User;
}