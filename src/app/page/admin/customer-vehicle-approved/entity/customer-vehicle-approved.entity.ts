import { CustomerVehicle } from "src/app/global/page/customer-vehicle/entity/customer-vehicle.entity";

export class CustomerVehicleApproved {
 
  customerVehicleApprovedId: string;
  customerVehicle: CustomerVehicle;
  approvedBy?: string;
  reprovedBy?: string;
  message?: string;
  createdBy: string;
  createdDate: Date;
  modifiedDate?: Date;
  modifiedBy?: string;
  enabled: boolean;

  constructor(init?: Partial<CustomerVehicleApproved>) {
    Object.assign(this, init);
  }
}