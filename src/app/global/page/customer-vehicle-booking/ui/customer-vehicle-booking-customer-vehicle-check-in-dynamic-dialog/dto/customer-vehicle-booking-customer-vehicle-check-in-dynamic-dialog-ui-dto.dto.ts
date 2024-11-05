import { CustomerVehicleBooking } from "../../../entity/customer-vehicle-booking.entity";
import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";

export class CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogUIDTO extends TranslateSeverityDTO {

  customerVehicleBooking: CustomerVehicleBooking;

  // Messages - Translate
  check_in_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog: string;
  check_in_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckInDynamicDialog: string;
}