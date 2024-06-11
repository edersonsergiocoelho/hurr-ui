import { CustomerAddress } from "../../customer-address/entity/customer-address.entity";
import { CustomerVehicle } from "../../customer-vehicle/entity/customer-vehicle.entity";
import { Customer } from "../../customer/entity/customer.entity";

export class CustomerVehicleBooking {
  
  customerVehicleBookingId: string;
  customerVehicle: CustomerVehicle;
  customer: Customer;
  customerAddressDelivery?: CustomerAddress;
  customerAddressDeliveryValue?: number;
  customerAddressPickUp?: CustomerAddress;
  customerAddressPickUpValue?: number;
  booking: string;
  reservationStartDate: Date;
  reservationStartTime: string;
  reservationEndDate: Date;
  reservationEndTime: string;
  bookingStartKM: number;
  bookingEndKM: number;
  bookingStartDate: Date;
  bookingEndDate: Date;
  bookingCancellationDate: Date;
  withdrawableBookingValue: number;
  totalBookingValue: number;
  mpPaymentId: number;
}