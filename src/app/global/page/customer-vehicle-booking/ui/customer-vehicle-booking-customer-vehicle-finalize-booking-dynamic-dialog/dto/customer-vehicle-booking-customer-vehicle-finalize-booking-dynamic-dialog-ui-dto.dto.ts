import { CustomerVehicleBooking } from "../../../entity/customer-vehicle-booking.entity";

export class CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogUIDTO {

  customerVehicleBooking: CustomerVehicleBooking;

  limitedMileageTotalKM: number;
  limitedMileageTotalValue: number;

  // Messages
  error_message_service_Generic: string;
}