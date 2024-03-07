import { CustomerVehicle } from "../../customer-vehicle/entity/customer-vehicle.entity";
import { Customer } from "../../customer/entity/customer.entity";

export class CustomerVehicleBooking {

  customerVehicleBookingId: string;
  customerVehicle: CustomerVehicle;
  customer: Customer;
  booking: string;
  bookingStartDate: Date;
  bookingEndDate: Date;
  bookingStartTime: string;
  bookingEndTime: string;
  totalBookingValue: number;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;
}