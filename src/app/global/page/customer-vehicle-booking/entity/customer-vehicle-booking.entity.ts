import { CustomerAddress } from "../../customer-address/entity/customer-address.entity";
import { CustomerVehicle } from "../../customer-vehicle/entity/customer-vehicle.entity";
import { Customer } from "../../customer/entity/customer.entity";

export class CustomerVehicleBooking {

  customerVehicleBookingId: string;
  customerVehicle: CustomerVehicle;
  customer: Customer;
  customerAddressDelivery: CustomerAddress;
  customerAddressDeliveryValue: number;
  customerAddressPickUp: CustomerAddress;
  customerAddressPickUpValue: number;
  booking: string;
  bookingStartDate: Date;
  bookingEndDate: Date;
  bookingStartTime: string;
  bookingEndTime: string;
  bookingDeliveryDate: Date;
  totalBookingValue: number;
  bookingStartKM: number;
  bookingEndKM: number;
  createdDate: Date;
  modifiedDate: Date;
  enabled: boolean;
}