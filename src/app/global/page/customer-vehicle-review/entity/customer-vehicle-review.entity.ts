import { CustomerVehicleBooking } from "../../customer-vehicle-booking/entity/customer-vehicle-booking.entity";
import { CustomerVehicle } from "../../customer-vehicle/entity/customer-vehicle.entity";
import { Customer } from "../../customer/entity/customer.entity";

export class CustomerVehicleReview {

  customerVehicleReviewId: string;
  customerVehicleBooking: CustomerVehicleBooking;
  customer: Customer;
  review: string;
  rating: number;
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;
}